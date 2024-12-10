const InternshipDetails = require("../models/InternshipDetails");
const User = require("../models/User");
const Task = require("../models/Task");
const CompanyDetails = require("../models/CompanyDetails");

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
      !skills
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

    const internShip = await InternshipDetails.create({
      user: id,
      title,
      description,
      companyDetails: company._id,
      startDate,
      skills,
    });

    await User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          internshipDetails: internShip._id,
        },
      }
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
    const { title, description, deadline } = req.body;
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
      }
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
