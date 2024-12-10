const CollegeDetails = require("../models/CollegeDetails");
const Department = require("../models/Department");

exports.addCollegeDetails = async (req, res) => {
  try {
    const { name, email, contactNumber } = req.body;

    if (!name || !email || !contactNumber) {
      return res.status(400).send({
        success: false,
        error: "Please enter all fields",
      });
    }
    await CollegeDetails.create({
      name,
      email,
      contactNumber,
    });
    res.status(200).send({
      success: true,
      message: "College details added successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "Error adding college details",
    });
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const { name, collegeId } = req.body;

    if (!name || !collegeId) {
      return res.status(400).send({
        success: false,
        error: "Please enter all fields",
      });
    }

    const college = await CollegeDetails.findById(collegeId);

    if (!college) {
      return res.status(400).send({
        success: false,
        error: "College not found",
      });
    }

    const department = await Department.findOne({
      name,
      college: collegeId,
    });

    if (department) {
      return res.status(400).send({
        success: false,
        error: "Department already exists",
      });
    }

    const newDepartment = await Department.create({
      name,
      college: collegeId,
    });

    await CollegeDetails.findByIdAndUpdate(collegeId, {
      $push: { departments: newDepartment._id },
    });

    res.status(200).send({
      success: true,
      message: "Department added successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "Error adding department",
    });
  }
};
