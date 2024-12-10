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
      college: {
        $in: [collegeId],
      },
    });

    if (department) {
      return res.status(400).send({
        success: false,
        error: "Department already exists",
      });
    }

    const dptName = await Department.findOne({
      name,
    });

    if (dptName) {
      const dpt = await Department.findByIdAndUpdate(dptName._id, {
        $push: { college: collegeId },
      });

      await CollegeDetails.findByIdAndUpdate(collegeId, {
        $push: { departments: dpt._id },
      });

      return res.status(200).send({
        success: true,
        message: "Department added successfully",
      });
    }

    const newDepartment = await Department.create({
      name,
      college: [collegeId],
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

exports.getCollegeDetails = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const collegeDetails = await CollegeDetails.find({
      name: {
        $regex: filter,
        $options: "i",
      },
    }).populate("departments");

    res.status(200).send({
      success: true,
      collegeDetails,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "Error getting college details",
    });
  }
};

exports.getDepartmentDetails = async (req, res) => {
  try {
    const college = req.query.college || "";
    const filter = req.query.filter || "";

    const departments = await Department.aggregate([
      {
        $lookup: {
          from: "collegedetails", // The name of the college collection in MongoDB
          localField: "college",
          foreignField: "_id",
          as: "collegeDetails",
        },
      },
      {
        $unwind: "$collegeDetails",
      },
      {
        $match: {
          $and: [
            { "collegeDetails.name": { $regex: college, $options: "i" } }, // Filter by college name
            { name: { $regex: filter, $options: "i" } }, // Filter by department name
          ],
        },
      },
      {
        $project: {
          name: 1, // Department name
          college: "$collegeDetails.name", // Include college name in the result
        },
      },
    ]);

    res.status(200).send({
      success: true,
      departments,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "Error getting department details",
    });
  }
};
