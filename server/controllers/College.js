import mongoose from "mongoose";
import CollegeDetails from "../models/CollegeDetails.js";
import Department from "../models/Department.js";

export const addCollegeDetails = async (req, res) => {
  try {
    const { name, code, dean, email, phone, address, website } = req.body;

    if (!name || !email || !phone || !code || !address) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const college = await CollegeDetails.findOne({
      email: email,
      code: code,
    });

    if (college) {
      return res.status(400).send({
        success: false,
        message: "College already exists with this email or code",
      });
    }

    await CollegeDetails.create({
      name,
      code,
      dean: dean ? dean : "",
      email,
      contactNumber: phone,
      address,
      website: website ? website : "",
      departments: [],
    });

    res.status(200).send({
      success: true,
      message: "College details added successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error adding college details",
    });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const collegeId = req.params.collegeId;
    const { name, code, head, email, phone } = req.body;

    if (!name || !collegeId || !code || !email || !phone) {
      return res.status(400).send({
        success: false,
        message: "Please enter all fields",
      });
    }

    const college = await CollegeDetails.findById(collegeId);

    if (!college) {
      return res.status(400).send({
        success: false,
        message: "College not found",
      });
    }

    const department = await Department.findOne({
      code: code,
      email: email,
      college: new mongoose.Types.ObjectId(collegeId),
    });

    if (department) {
      return res.status(400).send({
        success: false,
        message: "Department already exists",
      });
    }

    const newDepartment = await Department.create({
      name,
      code,
      college: new mongoose.Types.ObjectId(collegeId),
      deptHead: head ? head : "",
      email,
      contactNumber: phone,
      students: [],
      faculties: [],
      internships: [],
    });

    await CollegeDetails.findByIdAndUpdate(
      collegeId,
      {
        $push: { departments: newDepartment._id },
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Department added successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error adding department",
    });
  }
};

export const getFullCollegeDetails = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Unathorized access",
      });
    }

    let collegeDetails = await CollegeDetails.find({}).populate({
      path: "departments",
    });

    const data = collegeDetails.map((clg) => {
      return {
        id: clg._id,
        name: clg.name,
        departments: clg.departments.length,
        students: clg.departments.reduce(
          (acc, department) => acc + department.students.length,
          0
        ),
        supervisors: clg.departments.reduce(
          (acc, department) => acc + department.faculties.length,
          0
        ),
        internships: clg.departments.reduce(
          (acc, department) => acc + department.internships.length,
          0
        ),
      };
    });

    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error getting college details",
    });
  }
};


export const getFullDepartmentDetails = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Unathorized access",
      });
    }

    let departmentDetails = await Department.find({}).populate({
      path: "college",
    });

    const data = departmentDetails.map((dept) => {
      return {
        id: dept._id,
        name: dept.name,
        college: dept.college.name,
        students: dept.students.length,
        supervisors: dept.faculties.length,
        internships: dept.internships.length,
      };
    });

    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error getting college details",
    });
  }
};

export const getCollegesList = async (req, res) => {
  try {
    const colleges = await CollegeDetails.find({}).select("name");

    const data = colleges.map((college) => {
      return {
        id: college._id,
        name: college.name,
      };
    });

    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error getting college details",
    });
  }
};

export const getDepartmentsList = async (req, res) => {
  try {
    const collegeId = req.params.collegeId;

    const departments = await Department.find({
      college: new mongoose.Types.ObjectId(collegeId),
    }).select("name");

    const data = departments.map((department) => {
      return {
        id: department._id,
        name: department.name,
      };
    });

    res.status(200).send({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error getting college details",
    });
  }
};
