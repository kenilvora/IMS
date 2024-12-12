const InternshipDetails = require("../models/InternshipDetails");
const User = require("../models/User");
const Task = require("../models/Task");
const CompanyDetails = require("../models/CompanyDetails");
const cron = require("node-cron");
const { uploadFileToCloudinary } = require("../utils/uploadFileToCloudinary");
require("dotenv").config();

cron.schedule("0 0 * * *", async () => {
  console.log("Updating progress for internships...");
  try {
    const internships = await InternshipDetails.find({ status: "OnGoing" });
    internships.forEach(async (internship) => {
      if (internship.startDate && internship.endDate) {
        const totalDuration = internship.endDate - internship.startDate;
        const elapsedTime = Math.min(
          Date.now() - internship.startDate,
          totalDuration
        );
        internship.progress = Math.max(
          0,
          Math.min((elapsedTime / totalDuration) * 100, 100)
        );
        await internship.save();
      }
    });
    console.log("Progress updated successfully!");
  } catch (err) {
    console.error("Error updating progress:", err);
  }
});

exports.addInternship = async (req, res) => {
  try {
    const {
      title,
      description,
      companyName,
      companyEmail,
      companyContact,
      companyAddress,
      startDate,
      skills,
      status = "OnGoing",
      endDate,
    } = req.body;

    const id = req.user.userId;

    if (
      !title ||
      !description ||
      !companyName ||
      !companyEmail ||
      !companyContact ||
      !companyAddress ||
      !startDate ||
      !skills ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let company = await CompanyDetails.findOne({ email: companyEmail });

    if (!company) {
      company = await CompanyDetails.create({
        name: companyName,
        email: companyEmail,
        contactNumber: companyContact,
        address: companyAddress,
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End Date should be greater than Start Date",
      });
    }

    const internShip = await InternshipDetails.create({
      user: id,
      title,
      description,
      companyDetails: company._id,
      startDate,
      skills,
      endDate,
      status,
    });

    await User.findByIdAndUpdate(
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

exports.addTask = async (req, res) => {
  try {
    const { title, description, deadline, status = "InProgress" } = req.body;
    const internShipId = req.params.id;

    const id = req.user.userId;

    if (!title || !description || !deadline) {
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
      title,
      description,
      deadline,
      status,
      assignedToStudent: id,
      assignedByCompany: internShip.companyDetails,
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

exports.getTask = async (req, res) => {
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

    const task = await Task.findById(taskId)
      .populate({
        path: "assignedToStudent",
        select: "firstName lastName email contactNumber enrollmentNumber",
      })
      .populate({
        path: "assignedByCompany",
        select: "name email contactNumber",
      });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getTasks = async (req, res) => {
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

    const tasks = await Task.find({
      assignedToStudent: id,
      assignedByCompany: internShip.companyDetails,
    })
      .populate({
        path: "assignedToStudent",
        select: "firstName lastName email contactNumber enrollmentNumber",
      })
      .populate({
        path: "assignedByCompany",
        select: "name email contactNumber",
      });

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

exports.getInternship = async (req, res) => {
  try {
    const internShipId = req.params.id;
    const id = req.user.userId;

    const internShip = await InternshipDetails.findById(internShipId)
      .populate({
        path: "companyDetails",
        select: "name email",
      })
      .populate({
        path: "tasks",
        populate: {
          path: "assignedToStudent",
          select: "firstName lastName email enrollmentNumber",
        },
      });

    if (!internShip || internShip.user.toString() !== id) {
      return res.status(404).json({
        success: false,
        message: "No OnGoing Internship found",
      });
    }

    return res.status(200).json({
      success: true,
      internShip,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllInternshipsOfMe = async (req, res) => {
  try {
    const id = req.user.userId;

    const internShips = await InternshipDetails.find({
      user: id,
    })
      .populate({
        path: "companyDetails",
        select: "name email",
      })
      .populate({
        path: "tasks",
        populate: {
          path: "assignedToStudent",
          select: "firstName lastName email enrollmentNumber",
        },
      });

    return res.status(200).json({
      success: true,
      internShips,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllInternships = async (req, res) => {
  try {
    const internShips = await InternshipDetails.find()
      .populate({
        path: "companyDetails",
        select: "name email contactNumber address",
      })
      .populate({
        path: "tasks",
        populate: {
          path: "assignedToStudent",
          select: "firstName lastName email enrollmentNumber",
        },
      });

    return res.status(200).json({
      success: true,
      internShips,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateInternship = async (req, res) => {
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

    const {
      title = internShip.title,
      description = internShip.description,
      endDate = internShip.endDate,
      skills = internShip.skills,
      status = internShip.status,
    } = req.body;

    if (endDate && new Date(endDate) < new Date(internShip.startDate)) {
      return res.status(400).json({
        success: false,
        message: "End Date should be greater than Start Date",
      });
    }

    let certificate = req.files ? req.files.certificate : null;
    let finalReport = req.files ? req.files.finalReport : null;

    if (certificate) {
      certificate = await uploadFileToCloudinary(
        certificate,
        process.env.FOLDER_NAME
      );
    }

    if (finalReport) {
      finalReport = await uploadFileToCloudinary(
        finalReport,
        process.env.FOLDER_NAME
      );
    }

    let progress;

    if (endDate) {
      const totalDuration = new Date(endDate) - internShip.startDate;
      const elapsedTime = Math.min(
        Date.now() - internShip.startDate,
        totalDuration
      );
      progress = Math.max(
        0,
        Math.min((elapsedTime / totalDuration) * 100, 100)
      );
    }

    await InternshipDetails.findByIdAndUpdate(
      {
        _id: internShipId,
      },
      {
        title,
        description,
        endDate,
        skills,
        certificate: certificate
          ? certificate.secure_url
          : internShip.certificate,
        finalReport: finalReport
          ? finalReport.secure_url
          : internShip.finalReport,
        progress: progress || internShip.progress,
        status,
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

exports.updateTask = async (req, res) => {
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

    if (!task) {
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

    if (deadline && new Date(deadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Deadline should be greater than current date",
      });
    }

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

exports.commentOnTask = async (req, res) => {
  try {
    const internShipId = req.params.internShipId;
    const taskId = req.params.taskId;
    const id = req.user.userId;

    const internShip = await InternshipDetails.findById(internShipId);

    if (!internShip) {
      return res.status(404).json({
        success: false,
        message: "No Internship found",
      });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const { description, rating } = req.body;

    if (!description || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await Task.findByIdAndUpdate(
      {
        _id: taskId,
      },
      {
        $push: {
          comments: {
            description,
            commentedBy: id,
            rating,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getInternshipByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    if (status !== "OnGoing" && status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const internShips = await InternshipDetails.find({
      user: id,
      status,
    })
      .populate({
        path: "companyDetails",
        select: "name email contactNumber address",
      })
      .populate({
        path: "tasks",
        populate: {
          path: "assignedToStudent",
          select: "firstName lastName email enrollmentNumber",
        },
      });

    return res.status(200).json({
      success: true,
      internShips,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getInternshipByStatusForFaculty = async (req, res) => {
  try {
    const status = req.query.status;
    const id = req.query.facultyId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Faculty Id is required",
      });
    }

    if (status !== "OnGoing" && status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const faculty = await User.findById(id);

    if (!faculty || faculty.role !== "Supervisor") {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    let internShips = [];

    faculty.internStudents.forEach(async (student) => {
      const internShipsOfStudent = await InternshipDetails.find({
        user: student,
        status,
      })
        .populate({
          path: "companyDetails",
          select: "name email contactNumber address",
        })
        .populate({
          path: "tasks",
          populate: {
            path: "assignedToStudent",
            select: "firstName lastName email enrollmentNumber",
          },
        });

      internShips.push(...internShipsOfStudent);
    });

    return res.status(200).json({
      success: true,
      internShips,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllInternshipsByStatus = async (req, res) => {
  try {
    const status = req.query.status;

    if (status !== "OnGoing" && status !== "Completed") {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const internShips = await InternshipDetails.find({ status })
      .populate({
        path: "companyDetails",
        select: "name email contactNumber address",
      })
      .populate({
        path: "tasks",
        populate: {
          path: "assignedToStudent",
          select: "firstName lastName email enrollmentNumber",
        },
      });

    return res.status(200).json({
      success: true,
      internShips,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
