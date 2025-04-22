import InternshipDetails from "../models/InternshipDetails.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import cron from "node-cron";
import { uploadFileToCloudinary } from "../utils/uploadFileToCloudinary.js";
import dotenv, { populate } from "dotenv";
import mongoose from "mongoose";
import Department from "../models/Department.js";
import { mailSender } from "../utils/mailSender.js";
import { getInternshipStatusEmail } from "../mail/internshipStatus.js";

dotenv.config();

cron.schedule("0 0 * * *", async () => {
  console.log("Updating progress for internships...");
  try {
    const internships = await InternshipDetails.find({ status: "OnGoing" });
    internships.forEach(async (internship) => {
      if (internship.startDate && internship.endDate) {
        let today = new Date();
        let progress = 0;
        const totalDays =
          Math.floor(
            (new Date(internship.endDate) - new Date(internship.startDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1;

        const elapsedDays = Math.min(
          Math.floor(
            (today - new Date(internship.startDate)) / (1000 * 60 * 60 * 24)
          ) + 1,
          totalDays
        );
        progress = Math.max(
          0,
          Math.min((elapsedDays / totalDays) * 100, 100)
        ).toFixed(0);
        internship.progress = progress;
        internship.status = progress === 100 ? "Completed" : "OnGoing";
        await internship.save();
      }
    });
    console.log("Progress updated successfully!");
  } catch (err) {
    console.error("Error updating progress:", err);
  }
});

export const addInternship = async (req, res) => {
  try {
    const {
      companyName,
      companyEmail,
      position,
      description,
      supervisorName,
      supervisorEmail,
      startDate,
      endDate,
      department,
      skills,
      status = "OnGoing",
    } = req.body;

    const id = req.user.userId;

    if (
      !companyName ||
      !position ||
      !description ||
      !supervisorName ||
      !supervisorEmail ||
      !startDate ||
      !department ||
      !skills ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End Date should be greater than Start Date",
      });
    }

    const today = new Date();

    let progress = 0;
    if (status === "OnGoing" && endDate) {
      const totalDays =
        Math.floor(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        ) + 1;

      // Elapsed days so far (clamped so it doesn’t exceed totalDays)
      const elapsedDays = Math.min(
        Math.floor((today - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1,
        totalDays
      );
      progress = Math.max(
        0,
        Math.min((elapsedDays / totalDays) * 100, 100)
      ).toFixed(0);
    } else if (status === "Completed") {
      progress = 100;
    }

    const internShip = await InternshipDetails.create({
      user: id,
      companyDetails: {
        name: companyName,
        email: companyEmail,
      },
      position,
      description,
      supervisor: {
        name: supervisorName,
        email: supervisorEmail,
      },
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      department,
      skills,
      status: progress === 100 ? "Completed" : status,
      progress: progress,
    });

    const user = await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          internshipDetails: internShip._id,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Internship Added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description, deadline, status = "Pending" } = req.body;
    const internShipId = req.params.id;

    const id = req.user.userId;

    if (!title || !description || !deadline || !internShipId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const internShip = await InternshipDetails.findById(internShipId);

    if (
      !internShip ||
      internShip.user.toString() !== id ||
      internShip.status === "Completed"
    ) {
      return res.status(404).json({
        success: false,
        message: "No OnGoing Internship found",
      });
    }

    const task = await Task.create({
      user: id,
      internshipDetails: new mongoose.Types.ObjectId(internShipId),
      title,
      description,
      deadline: new Date(deadline).toISOString(),
      status,
    });

    await InternshipDetails.findByIdAndUpdate(
      {
        _id: internShipId,
      },
      {
        $push: {
          tasks: task._id,
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Task Added successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const internShipId = req.params.internShipId;
    const taskId = req.params.taskId;
    const id = req.user.userId;

    const internShip = await InternshipDetails.findById(internShipId);

    if (!internShip || internShip.user.toString() !== id) {
      return res.status(404).json({
        success: false,
        message: "Invalid Internship ID",
      });
    }

    const task = await Task.findById(taskId);

    if (!task || !internShip.tasks.includes(taskId)) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const data = {
      id: task._id,
      title: task.title,
      description: task.description,
      internship: {
        id: internShip._id,
        company: internShip.companyDetails.name,
        position: internShip.position,
      },
      supervisor: internShip.supervisor.name,
      dueDate: task.deadline,
      status: task.status,
      attachments: task.attachments,
      comments: task.comments.map((comment) => {
        return {
          author: comment.author,
          role: comment.role,
          date: comment.date,
          text: comment.text,
        };
      }),
    };

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const internShipId = req.params.id;
    const id = req.user.userId;

    const internShip = await InternshipDetails.findById(internShipId);

    if (!internShip || internShip.user.toString() !== id) {
      return res.status(404).json({
        success: false,
        message: "No OnGoing Internship found",
      });
    }

    const tasks = await Task.findById(id);

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const id = req.user.userId;

    const internships = await User.findById(id)
      .select("internshipDetails")
      .populate({
        path: "internshipDetails",
        populate: [
          {
            path: "tasks",
            select: "title description deadline status",
          },
        ],
      });

    const data = internships.internshipDetails
      .map((internship) => {
        return internship.tasks.map((task) => {
          return {
            id: task._id,
            title: task.title,
            description: task.description,
            internship: internship.companyDetails.name,
            internshipId: internship._id,
            dueDate: task.deadline,
            status: task.status,
          };
        });
      })
      .flat();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getInternship = async (req, res) => {
  try {
    const internShipId = req.params.id;
    const id = req.user.userId;

    if (!internShipId) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.internshipDetails.includes(internShipId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Internship ID",
      });
    }

    const internShip = await InternshipDetails.findById(internShipId)
      .populate({
        path: "tasks",
      })
      .populate({
        path: "user",
        populate: {
          path: "faculty",
        },
      });

    if (!internShip || internShip.user._id.toString() !== id) {
      return res.status(404).json({
        success: false,
        message: "No OnGoing Internship found",
      });
    }

    const internshipData = {
      id: internShip._id,
      company: internShip.companyDetails.name,
      position: internShip.position,
      department: internShip.department,
      supervisor: internShip.supervisor.name,
      supervisorEmail: internShip.supervisor.email,
      faculty:
        internShip.user.faculty.firstName +
        " " +
        internShip.user.faculty.lastName,
      status: internShip.status,
      startDate: internShip.startDate,
      endDate: internShip.endDate,
      progress: internShip.progress,
      description: internShip.description,
      skills: internShip.skills,
      tasks: {
        total: internShip.tasks.length,
        completed: internShip.tasks.filter(
          (task) => task.status === "Completed"
        ).length,
      },
      approval: internShip.approval,
    };

    const tasksData = internShip.tasks.map((task) => {
      return {
        id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.deadline,
        status: task.status,
      };
    });

    return res.status(200).json({
      success: true,
      internship: internshipData,
      tasks: tasksData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getInternshipForAdminAndSupervisor = async (req, res) => {
  try {
    const internShipId = req.params.id;
    const id = req.user.userId;

    if (!internShipId) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    const internShip = await InternshipDetails.findById(internShipId)
      .populate({
        path: "tasks",
      })
      .populate({
        path: "user",
        populate: {
          path: "department",
        },
      });

    if (!internShip) {
      return res.status(404).json({
        success: false,
        message: "No Internship found",
      });
    }

    const internshipData = {
      id: internShip._id,
      student: {
        id: internShip.user._id,
        name: internShip.user.firstName + " " + internShip.user.lastName,
        image: internShip.user.image,
        phone: internShip.user.contactNumber,
        email: internShip.user.email,
        department: internShip.user.department.name,
        year: internShip.user.currentYear,
      },
      company: internShip.companyDetails.name,
      position: internShip.position,
      department: internShip.department,
      status: internShip.status,
      startDate: internShip.startDate,
      endDate: internShip.endDate,
      progress: internShip.progress,
      description: internShip.description,
      skills: internShip.skills,
      tasks: {
        total: internShip.tasks.length,
        completed: internShip.tasks.filter(
          (task) => task.status === "Completed"
        ).length,
      },
      approval: internShip.approval,
    };

    const tasksData = internShip.tasks.map((task) => {
      return {
        id: task._id,
        title: task.title,
        description: task.description,
        dueDate: task.deadline,
        status: task.status,
      };
    });

    return res.status(200).json({
      success: true,
      internship: internshipData,
      tasks: tasksData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getInternshipById = async (req, res) => {
  try {
    const internShipId = req.params.id;
    const id = req.user.userId;

    if (!internShipId) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.internshipDetails.includes(internShipId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Internship ID",
      });
    }

    const internShip = await InternshipDetails.findById(internShipId).populate({
      path: "tasks",
    });

    if (!internShip || internShip.user.toString() !== id) {
      return res.status(404).json({
        success: false,
        message: "No OnGoing Internship found",
      });
    }

    const internshipData = {
      id: internShip._id,
      companyName: internShip.companyDetails.name,
      companyEmail: internShip.companyDetails.email,
      position: internShip.position,
      description: internShip.description,
      supervisorName: internShip.supervisor.name,
      supervisorEmail: internShip.supervisor.email,
      startDate: internShip.startDate,
      endDate: internShip.endDate,
      department: internShip.department,
      skills: internShip.skills,
      status: internShip.status,
    };

    return res.status(200).json({
      success: true,
      internship: internshipData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllInternshipsOfMe = async (req, res) => {
  try {
    const id = req.user.userId;

    const internShips = await User.findById(id)
      .select("internshipDetails")
      .populate({
        path: "internshipDetails",
        populate: [
          {
            path: "tasks",
            select: "title description deadline status",
          },
        ],
      });

    const updatedData = internShips.internshipDetails.map((internship) => {
      return {
        id: internship._id,
        company: internship.companyDetails.name,
        position: internship.position,
        supervisor: internship.supervisor.name,
        status: internship.status,
        startDate: internship.startDate,
        endDate: internship.endDate,
        tasks: {
          total: internship.tasks.length,
          completed: internship.tasks.filter(
            (task) => task.status === "Completed"
          ).length,
        },
        approval: internship.approval,
      };
    });

    return res.status(200).json({
      success: true,
      data: updatedData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllInternshipsForAdmin = async (req, res) => {
  try {
    const internShips = await InternshipDetails.find({
      approval: "Approved",
    })
      .populate({
        path: "tasks",
      })
      .populate({
        path: "user",
        populate: [
          {
            path: "college",
          },
          {
            path: "department",
          },
          {
            path: "faculty",
          },
        ],
      })
      .sort({
        createdAt: -1,
      });

    const data = internShips.map((internship, i) => {
      return {
        id: internship._id,
        student: {
          id: internship.user._id,
          name: internship.user.firstName + " " + internship.user.lastName,
          image: internship.user.image,
          email: internship.user.email,
        },
        supervisor: {
          id: i,
          name: internship.supervisor.name,
        },
        company: internship.companyDetails.name,
        position: internship.position,
        status: internship.status,
        startDate: internship.startDate,
        endDate: internship.endDate,
        college: internship.user.college.name,
        department: internship.user.department.name,
        faculty:
          internship.user.faculty.firstName +
          " " +
          internship.user.faculty.lastName,
        tasks: {
          total: internship.tasks.length,
          completed: internship.tasks.filter(
            (task) => task.status === "Completed"
          ).length,
        },
        approval: internship.approval,
      };
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllInternshipsForSupervisor = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    const user = await User.findById(id).populate({
      path: "internStudents",
      populate: [
        {
          path: "internshipDetails",
          populate: {
            path: "user",
          },
        },
        {
          path: "college",
        },
        {
          path: "department",
        },
      ],
    });

    const internShips = user.internStudents
      .map((student) => {
        return student.internshipDetails;
      })
      .flat();

    const data = internShips.map((internship, i) => {
      return {
        id: internship._id,
        student: {
          id: internship.user._id,
          name: internship.user.firstName + " " + internship.user.lastName,
          image: internship.user.image,
          email: internship.user.email,
        },
        supervisor: {
          id: i,
          name: internship.supervisor.name,
        },
        company: internship.companyDetails.name,
        position: internship.position,
        status: internship.status,
        startDate: internship.startDate,
        endDate: internship.endDate,
        college: internship.user.college.name,
        department: internship.user.department.name,
        faculty:
          internship.user.faculty.firstName +
          " " +
          internship.user.faculty.lastName,
        tasks: {
          total: internship.tasks.length,
          completed: internship.tasks.filter(
            (task) => task.status === "Completed"
          ).length,
        },
        approval: internship.approval,
      };
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateInternship = async (req, res) => {
  try {
    const internShipId = req.params.id;
    const id = req.user.userId;

    const internShip = await InternshipDetails.findById(internShipId);

    if (
      !internShip ||
      internShip.user.toString() !== id ||
      internShip.status === "Completed"
    ) {
      return res.status(404).json({
        success: false,
        message: "No OnGoing Internship found",
      });
    }

    const {
      companyName = internShip.companyDetails.name,
      companyEmail = internShip.companyDetails.email,
      position = internShip.position,
      description = internShip.description,
      supervisorName = internShip.supervisor.name,
      supervisorEmail = internShip.supervisor.email,
      startDate = internShip.startDate,
      endDate = internShip.endDate,
      department = internShip.department,
      skills = internShip.skills,
      status = internShip.status,
    } = req.body;

    if (endDate && new Date(endDate) < new Date(internShip.startDate)) {
      return res.status(400).json({
        success: false,
        message: "End Date should be greater than Start Date",
      });
    }

    const today = new Date();

    let progress = 0;
    if (status === "OnGoing" && endDate) {
      const totalDays =
        Math.floor(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        ) + 1;

      // Elapsed days so far (clamped so it doesn’t exceed totalDays)
      const elapsedDays = Math.min(
        Math.floor((today - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1,
        totalDays
      );
      progress = Math.max(
        0,
        Math.min((elapsedDays / totalDays) * 100, 100)
      ).toFixed(0);
    } else if (status === "Completed") {
      progress = 100;
    }

    await InternshipDetails.findByIdAndUpdate(
      {
        _id: internShipId,
      },
      {
        companyDetails: {
          name: companyName,
          email: companyEmail,
        },
        position,
        description,
        supervisor: {
          name: supervisorName,
          email: supervisorEmail,
        },
        startDate: new Date(startDate).toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : null,
        department,
        skills,
        status: progress === 100 ? "Completed" : status,
        progress: progress,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Internship updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const internShipId = req.params.internShipId;
    const taskId = req.params.taskId;
    const id = req.user.userId;

    const internShip = await InternshipDetails.findById(internShipId);

    if (!internShip || internShip.user.toString() !== id) {
      return res.status(404).json({
        success: false,
        message: "No OnGoing Internship found",
      });
    }

    const task = await Task.findById(taskId);

    if (
      !task ||
      !internShip.tasks.includes(taskId) ||
      task.status === "Completed"
    ) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const {
      title = task.title,
      description = task.description,
      deadline = task.deadline,
      status = task.status,
    } = req.body;

    await Task.findByIdAndUpdate(
      {
        _id: taskId,
      },
      {
        title,
        description,
        deadline,
        status,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const supervisorActionOnInternship = async (req, res) => {
  try {
    const id = req.user.userId;
    const internShipId = req.params.internshipId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    if (!internShipId) {
      return res.status(400).json({
        success: false,
        message: "Internship ID is required",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Supervisor not found",
      });
    }

    const { approval } = req.body;

    if (!approval) {
      return res.status(400).json({
        success: false,
        message: "Approval status is required",
      });
    }

    if (approval !== "Approved" && approval !== "Rejected") {
      return res.status(400).json({
        success: false,
        message: "Approval status should be either Approved or Rejected",
      });
    }

    const internShip = await InternshipDetails.findById(internShipId).populate({
      path: "user",
    });

    if (!internShip) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    if (!user.internStudents.includes(internShip.user._id)) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    internShip.approval = approval;

    await internShip.save();

    await Department.findByIdAndUpdate(
      {
        _id: internShip.user.department,
      },
      {
        $push: {
          internships: internShip._id,
        },
      },
      { new: true }
    );

    mailSender(
      internShip.user.email,
      `Internship at ${internShip.companyDetails.name} as ${internShip.position} has been ${approval}`,
      getInternshipStatusEmail(
        `${internShip.user.firstName} ${internShip.user.lastName}`,
        approval,
        internShip.companyDetails.name,
        internShip.position
      )
    );

    return res.status(200).json({
      success: true,
      message: `Internship ${approval} successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllTaskUnderSupervisor = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
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

    const allTasks = user.internStudents
      .map((student) => {
        return student.internshipDetails.map((internship) => {
          return internship.tasks.map((task) => {
            return {
              id: task._id,
              title: task.title,
              description: task.description,
              dueDate: task.deadline,
              status: task.status,
              internship: {
                id: internship._id,
                company: internship.companyDetails.name,
              },
              student: {
                id: internship.user._id,
                name:
                  internship.user.firstName + " " + internship.user.lastName,
                image: internship.user.image,
                email: internship.user.email,
              },
            };
          });
        });
      })
      .flat(2);

    return res.status(200).json({
      success: true,
      data: allTasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
