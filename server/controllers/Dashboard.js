import mongoose from "mongoose";
import User from "../models/User.js";
import InternshipDetails from "../models/InternshipDetails.js";
import CollegeDetails from "../models/CollegeDetails.js";
import Department from "../models/Department.js";

export const studentDashboardData = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    const data = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $project: {
          internshipDetails: 1,
        },
      },
      {
        $lookup: {
          from: "internshipdetails",
          localField: "internshipDetails",
          foreignField: "_id",
          as: "internshipDetails",
        },
      },
      {
        $addFields: {
          allTaskIds: {
            $reduce: {
              input: "$internshipDetails.tasks",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      // Lookup tasks based on flattened task ids
      {
        $lookup: {
          from: "tasks",
          localField: "allTaskIds",
          foreignField: "_id",
          as: "tasks",
        },
      },
      {
        $addFields: {
          cardStats: {
            total: { $size: "$internshipDetails" },
            ongoing: {
              $size: {
                $filter: {
                  input: "$internshipDetails",
                  as: "internship",
                  cond: { $eq: ["$$internship.status", "OnGoing"] },
                },
              },
            },
            completed: {
              $size: {
                $filter: {
                  input: "$internshipDetails",
                  as: "internship",
                  cond: { $eq: ["$$internship.status", "Completed"] },
                },
              },
            },
            tasks: {
              total: { $size: "$tasks" },
              completed: {
                $size: {
                  $filter: {
                    input: "$tasks",
                    as: "task",
                    cond: { $eq: ["$$task.status", "Completed"] },
                  },
                },
              },
              pending: {
                $size: {
                  $filter: {
                    input: "$tasks",
                    as: "task",
                    cond: { $eq: ["$$task.status", "Pending"] },
                  },
                },
              },
            },
          },
          taskDetails: {
            $slice: [
              {
                $map: {
                  input: {
                    $sortArray: {
                      input: "$tasks",
                      sortBy: { createdAt: -1 },
                    },
                  },
                  as: "task",
                  in: {
                    id: "$$task._id",
                    title: "$$task.title",
                    dueDate: "$$task.deadline",
                    status: "$$task.status",
                    internship: {
                      $arrayElemAt: [
                        {
                          $map: {
                            input: {
                              $filter: {
                                input: "$internshipDetails",
                                as: "internship",
                                cond: {
                                  $eq: [
                                    "$$internship._id",
                                    "$$task.internshipDetails",
                                  ],
                                },
                              },
                            },
                            as: "matchedInternship",
                            in: "$$matchedInternship.companyDetails.name",
                          },
                        },
                        0,
                      ],
                    },
                  },
                },
              },
              5, // latest 5
            ],
          },
          internshipDetails: {
            $slice: [
              {
                $map: {
                  input: {
                    $sortArray: {
                      input: "$internshipDetails",
                      sortBy: { createdAt: -1 },
                    },
                  },
                  as: "internship",
                  in: {
                    id: "$$internship._id",
                    company: "$$internship.companyDetails.name",
                    position: "$$internship.position",
                    status: "$$internship.status",
                    startDate: "$$internship.startDate",
                    endDate: "$$internship.endDate",
                    progress: "$$internship.progress",
                    tasks: {
                      total: {
                        $size: "$$internship.tasks",
                      },
                      completed: {
                        $size: {
                          $filter: {
                            input: "$tasks",
                            as: "task",
                            cond: {
                              $and: [
                                { $in: ["$$task._id", "$$internship.tasks"] },
                                { $eq: ["$$task.status", "Completed"] },
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              5,
            ],
          },
        },
      },
      {
        $project: {
          internshipDetails: 1,
          cardStats: 1,
          taskDetails: 1,
        },
      },
    ]);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const adminDashboardData = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    const user = await User.findById(id);

    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const allUsers = await User.find({});

    const users = {
      total: allUsers.length,
      students: await User.countDocuments({ role: "Student" }),
      supervisors: await User.countDocuments({ role: "Supervisor" }),
      admins: await User.countDocuments({ role: "Admin" }),
    };

    const allInternships = await InternshipDetails.find({
      approval: "Approved",
    })
      .populate({
        path: "user",
        select: "firstName lastName",
      })
      .populate({
        path: "tasks",
        select: "status",
      })
      .sort({
        createdAt: -1,
      });

    const internships = {
      total: allInternships.length,
      ongoing: await InternshipDetails.countDocuments({
        status: "OnGoing",
        approval: "Approved",
      }),
      completed: await InternshipDetails.countDocuments({
        status: "Completed",
        approval: "Approved",
      }),
    };

    const allColleges = await CollegeDetails.find({});

    const colleges = allColleges.length;

    const allDepartments = await Department.find({}).populate({
      path: "students",
    });

    const departments = allDepartments.length;

    // first card completed
    const stats = {
      users,
      internships,
      colleges,
      departments,
    };

    // second card completed
    const recentInternships = allInternships.slice(0, 5).map((internship) => {
      return {
        id: internship._id,
        student: `${internship.user.firstName} ${internship.user.lastName}`,
        company: internship.companyDetails.name,
        position: internship.position,
        status: internship.status,
        startDate: internship.startDate,
        endDate: internship.endDate,
      };
    });

    // third card completed
    const departmentStats = allDepartments.map((department) => {
      return {
        name: department.name,
        students: department.students.length,
        internships: department.internships.length,
      };
    });

    // fourth card completed

    let allStudents = await User.find({
      role: "Student",
    }).populate({
      path: "internshipDetails",
    });

    const allStudentsLength = allStudents.length;

    allStudents = allStudents.filter((student) => {
      return student.internshipDetails.some((internship) => {
        return internship.approval === "Approved";
      });
    });

    const studentWithAtLeastOneInternship = allStudents.length;

    let studentParticipationRate =
      ((studentWithAtLeastOneInternship / allStudentsLength) * 100).toFixed(
        2
      ) || 0;

    if (isNaN(studentParticipationRate)) {
      studentParticipationRate = 0;
    }

    let totalInternships = 0;
    let totalInternshipDuration = 0;

    allInternships.forEach((internship) => {
      totalInternships += 1;
      const startDate = new Date(internship.startDate);
      const endDate = internship.endDate
        ? new Date(internship.endDate)
        : new Date();
      const duration =
        Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24 * 30);
      totalInternshipDuration += duration;
    });

    let averageInternshipDuration = totalInternshipDuration / totalInternships;

    if (isNaN(averageInternshipDuration)) {
      averageInternshipDuration = 0;
    }

    let totalTasks = 0;
    let totalCompletedTasks = 0;

    allInternships.forEach((internship) => {
      totalTasks += internship.tasks.length;
      totalCompletedTasks += internship.tasks.filter(
        (task) => task.status === "Completed"
      ).length;
    });
    const taskCompletionRate = (totalCompletedTasks / totalTasks) * 100 || 0;

    const systemMetrics = {
      studentParticipationRate,
      averageInternshipDuration: averageInternshipDuration.toFixed(2),
      taskCompletionRate: taskCompletionRate.toFixed(2),
    };

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      stats,
      recentInternships,
      departmentStats,
      systemMetrics,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const adminReportData = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    const deptStats = await Department.find({});

    let totalInternships = 0;

    deptStats.forEach((dept) => {
      totalInternships += dept.internships.length;
    });

    const internshipsByDept = deptStats.map((dept) => {
      return {
        name: dept.name,
        value: (dept.internships.length / totalInternships) * 100,
      };
    });

    const allInternships = await InternshipDetails.find({
      approval: "Approved",
    }).populate({
      path: "tasks",
      select: "status",
    });

    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const internshipsByMonth = allMonths.map((month) => {
      return {
        name: month,
        count: allInternships.filter((internship) => {
          const startDate = new Date(internship.startDate);
          return (
            startDate.toLocaleString("default", {
              month: "short",
            }) === month
          );
        }).length,
      };
    });

    const allStudents = await User.find({
      role: "Student",
    }).populate({
      path: "internshipDetails",
    });

    const studentWithAtLeastOneInternship = allStudents.filter((student) => {
      return student.internshipDetails.some((internship) => {
        return internship.approval === "Approved";
      });
    }).length;

    let studentParticipationRate =
      ((studentWithAtLeastOneInternship / allStudents.length) * 100).toFixed(
        2
      ) || 0;

    if (isNaN(studentParticipationRate)) {
      studentParticipationRate = 0;
    }

    const studentParticipation = [
      {
        name: "With Internship",
        value: parseFloat(studentParticipationRate),
      },
      {
        name: "Without Internship",
        value: 100 - studentParticipationRate,
      },
    ];

    let totalTasks = 0;
    let totalCompletedTasks = 0;

    allInternships.forEach((internship) => {
      totalTasks += internship.tasks.length;
      totalCompletedTasks += internship.tasks.filter(
        (task) => task.status === "Completed"
      ).length;
    });

    let taskCompletionRate =
      ((totalCompletedTasks / totalTasks) * 100).toFixed(2) || 0;

    if (isNaN(taskCompletionRate)) {
      taskCompletionRate = 0;
    }

    const taskCompletion = [
      {
        name: "Completed",
        value: parseFloat(taskCompletionRate),
      },
      {
        name: "Pending",
        value: 100 - taskCompletionRate,
      },
    ];

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      internshipsByDept,
      internshipsByMonth,
      studentParticipation,
      taskCompletion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const supervisorDashboardData = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    const user = await User.findById(id).populate({
      path: "internStudents",
      populate: {
        path: "internshipDetails",
        populate: [
          {
            path: "tasks",
          },
          {
            path: "user",
          },
        ],
      },
    });

    const filteredStudents = user.internStudents
      .filter((student) => {
        return student.internshipDetails.some((internship) => {
          return internship.approval === "Approved";
        });
      })
      .flat();

    const filteredInternships = filteredStudents
      .map((student) => {
        return student.internshipDetails.filter((internship) => {
          return internship.approval === "Approved";
        });
      })
      .flat();

    const stats = {
      students: user.internStudents.length,
      internships: {
        total: filteredInternships.length,
        completed: filteredInternships.filter(
          (internship) => internship.status === "Completed"
        ).length,
        ongoing: filteredInternships.filter(
          (internship) => internship.status === "OnGoing"
        ).length,
      },
      tasks: {
        total: filteredInternships.reduce((acc, internship) => {
          return acc + internship.tasks.length;
        }, 0),
        completed: filteredInternships.reduce((acc, internship) => {
          return (
            acc +
            internship.tasks.filter((task) => task.status === "Completed")
              .length
          );
        }, 0),
        pending: filteredInternships.reduce((acc, internship) => {
          return (
            acc +
            internship.tasks.filter((task) => task.status === "Pending").length
          );
        }, 0),
      },
    };

    const internships = filteredInternships.map((internship) => {
      return {
        id: internship._id,
        student: `${internship.user.firstName} ${internship.user.lastName}`,
        company: internship.companyDetails.name,
        position: internship.position,
        status: internship.status,
        startDate: internship.startDate,
        endDate: internship.endDate,
        tasks: {
          total: internship.tasks.length,
          completed: internship.tasks.filter(
            (task) => task.status === "Completed"
          ).length,
        },
        progress: internship.progress,
        approval: internship.approval,
      };
    });

    const tasks = filteredInternships
      .map((internship) => {
        return internship.tasks.map((task) => {
          return {
            id: task._id,
            title: task.title,
            student: `${internship.user.firstName} ${internship.user.lastName}`,
            status: task.status,
            internship: `${internship.companyDetails.name}`,
            dueDate: task.deadline,
          };
        });
      })
      .flat();

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      stats,
      internships: internships.slice(0, 5),
      tasks: tasks.slice(0, 5),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
