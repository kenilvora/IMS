import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import Otp from "../models/Otp.js";
// import { uploadFileToCloudinary } from "../utils/uploadFileToCloudinary.js";
import { mailSender } from "../utils/mailSender.js";
import { passwordUpdate } from "../mail/passwordUpdate.js";
import CollegeDetails from "../models/CollegeDetails.js";
import Department from "../models/Department.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import { userRegistrationTemplate } from "../mail/userRegistration.js";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      enrollmentNumber,
      facultyId,
      collegeId,
      departmentId,
      role,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !contactNumber ||
      (role === "Student" && !enrollmentNumber) ||
      (role === "Student" && !facultyId) ||
      !collegeId ||
      !departmentId ||
      !role ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (role !== "Student" && role !== "Admin" && role !== "Supervisor") {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const user = await User.findOne({
      $or: [{ email: email }, { enrollmentNumber: enrollmentNumber }],
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const recentOtp = Otp.findOne({
      email: email,
    });

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (recentOtp.expires_at <= Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has been expired, Please request a new OTP",
      });
    }

    if (recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    let facultyDetails = null;

    if (role === "Student") {
      facultyDetails = await User.findById(facultyId);

      if (!facultyDetails || facultyDetails.role !== "Supervisor") {
        return res.status(400).json({
          success: false,
          message: "Invalid faculty details",
        });
      }
    }

    const collegeDetails = await CollegeDetails.findById(collegeId);

    if (!collegeDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid college details",
      });
    }

    if (role !== "Admin") {
      const departmentDetails = await Department.findById(departmentId);

      if (!departmentDetails) {
        return res.status(400).json({
          success: false,
          message: "Invalid department details",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await profile.save({ userRole: role });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      enrollmentNumber,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`,
      faculty: facultyId,
      role,
    });

    if (role === "Student") {
      facultyDetails.internStudents.push(newUser._id);

      await facultyDetails.save();
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        userId: user._id,
        role: user.role,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.cookie("token", token, {
        samesite: "lax",
        secure: true,
        maxAge: 31536000000,
      });

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        role: user.role,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    const user = await User.findById(id)
      .select(
        "-password -internshipDetails -internStudents -faculty -resetPasswordToken -resetPasswordTokenExpires -__v"
      )
      .populate({
        path: "college",
        select: "name",
      })
      .populate({
        path: "department",
        select: "name",
      });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      secure: true,
      samesite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    const user = await User.findById(id);

    if (!user || user.role !== "Admin") {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const allUsers = await User.find({})
      .populate({
        path: "college",
        select: "name",
      })
      .populate({
        path: "department",
        select: "name",
      });

    const data = allUsers.map((user) => {
      return {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        image: user.image,
        college: user.college.name,
        department: user.department.name,
      };
    });

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    let otp = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await Otp.findOne({
      otp: otp,
    });

    while (result) {
      otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await Otp.findOne({
        otp: otp,
      });
    }

    const emailExist = await Otp.findOne({ email: email });

    if (emailExist) {
      await Otp.findOneAndDelete({ email: email });
    }

    await Otp.create({
      otp: otp,
      email: email,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const id = req.user.userId;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    try {
      const name = `${user.firstName} ${user.lastName}`;
      mailSender(
        user.email,
        "Password Updated Successfully",
        passwordUpdate(user.email, name)
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error in sending email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password Updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    const user = await User.findById(id)
      .select(
        "-password -internshipDetails -internStudents -faculty -resetPasswordToken -resetPasswordTokenExpires -__v"
      )
      .populate({
        path: "college",
        select: "name",
      })
      .populate({
        path: "department",
        select: "name",
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const {
      firstName = user.firstName,
      lastName = user.lastName,
      email = user.email,
      contactNumber = user.contactNumber,
      address = user.address,
      bio = user.bio,
      skills = user.skills,
      interests = user.interests,
      year = user.currentYear,
      semester = user.currentSemester,
    } = req.body;

    user.firstName = firstName;
    user.lastName = lastName;
    user.image = `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`;
    user.email = email;
    user.contactNumber = contactNumber;
    user.address = address;
    user.bio = bio;
    user.skills = skills;
    user.interests = interests;
    user.currentYear = year;
    user.currentSemester = semester;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId)
      .select(
        "-password -faculty -resetPasswordToken -resetPasswordTokenExpires -__v"
      )
      .populate({
        path: "college",
        select: "name",
      })
      .populate({
        path: "department",
        select: "name",
      })
      .populate({
        path: "internshipDetails",
      })
      .populate({
        path: "internStudents",
        populate: [
          {
            path: "college",
            select: "name",
          },
          {
            path: "department",
            select: "name",
          },
        ],
      });

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.contactNumber,
      image: user.image,
      role: user.role,
      college: user.college.name,
      department: user.department.name,
      enrollmentNumber: user?.enrollmentNumber || "N/A",
      year: user?.currentYear || "N/A",
      semester: user?.currentSemester || "N/A",
      address: user?.address || "N/A",
    };

    let internshipDetails = null;
    let internStudents = null;

    if (user?.internshipDetails) {
      internshipDetails = user.internshipDetails.map((internship) => {
        return {
          id: internship._id,
          company: internship.companyDetails.name,
          position: internship.position,
          supervisor: internship.supervisor.name,
          status: internship.status,
          startDate: internship.startDate,
          endDate: internship.endDate,
        };
      });
    }

    if (user?.internStudents) {
      internStudents = user.internStudents.map((student) => {
        return {
          id: student._id,
          name: `${student.firstName} ${student.lastName}`,
          email: student.email,
          image: student.image,
          college: student.college.name,
          department: student.department.name,
        };
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user: userData,
      internships: internshipDetails || [],
      internStudents: internStudents || [],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const facultyList = async (req, res) => {
  try {
    const id = req.user.userId;
    const collegeId = req.params.collegeId;
    const departmentId = req.params.departmentId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    const college = await CollegeDetails.findById(collegeId);

    if (!college) {
      return res.status(400).json({
        success: false,
        message: "Invalid college details",
      });
    }

    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Invalid department details",
      });
    }

    if (!college.departments.includes(departmentId)) {
      return res.status(400).json({
        success: false,
        message: "Department does not belong to this college",
      });
    }

    const user = await User.find({
      role: "Supervisor",
      college: collegeId,
      department: departmentId,
    }).select("firstName lastName");

    const data = user.map((faculty) => {
      return {
        id: faculty._id,
        name: `${faculty.firstName} ${faculty.lastName}`,
      };
    });

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    const {
      firstName,
      lastName,
      email,
      password,
      contactNumber,
      enrollmentNumber,
      college,
      department,
      currentYear,
      currentSemester,
      faculty,
      address,
      role,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !contactNumber ||
      !college ||
      !department ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      role === "Student" &&
      (!faculty ||
        !enrollmentNumber ||
        !currentYear ||
        !currentSemester ||
        !address)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (role !== "Student" && role !== "Admin" && role !== "Supervisor") {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const domain = email.split("@")[1];

    dns.resolveMx(domain, async (err, addresses) => {
      if (err || addresses.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid email domain",
        });
      }

      const clg = await CollegeDetails.findById(college);
      const dept = await Department.findById(department);
      let facultyDetails = null;

      if (role === "Student") {
        facultyDetails = await User.findById(faculty);
      }

      if (!clg) {
        return res.status(400).json({
          success: false,
          message: "Invalid college details",
        });
      }

      if (!dept) {
        return res.status(400).json({
          success: false,
          message: "Invalid department details",
        });
      }

      if (role === "Student" && !facultyDetails) {
        return res.status(400).json({
          success: false,
          message: "Invalid faculty details",
        });
      }

      const userDetails = await User.findOne({
        email: email,
      });

      let enrollmentDetails = null;

      if (role === "Student") {
        enrollmentDetails = await User.findOne({
          enrollmentNumber: enrollmentNumber,
        });
      }

      if (userDetails) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      }

      if (role === "Student" && enrollmentDetails) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this enrollment number",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      if (role === "Student") {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          contactNumber,
          enrollmentNumber,
          image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`,
          college: new mongoose.Types.ObjectId(college),
          department: new mongoose.Types.ObjectId(department),
          currentYear,
          currentSemester,
          address,
          bio: "",
          skills: "",
          interests: "",
          internshipDetails: [],
          faculty: new mongoose.Types.ObjectId(faculty),
          role,
        });

        facultyDetails.internStudents.push(user._id);
        dept.students.push(user._id);

        await facultyDetails.save();
        await dept.save();
      } else if (role === "Supervisor") {
        const supervisor = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          contactNumber,
          image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`,
          college: new mongoose.Types.ObjectId(college),
          department: new mongoose.Types.ObjectId(department),
          internStudents: [],
          role,
        });

        dept.faculties.push(supervisor._id);
        await dept.save();
      } else {
        await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          contactNumber,
          image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}%20${lastName}`,
          college: new mongoose.Types.ObjectId(college),
          department: new mongoose.Types.ObjectId(department),
          role,
        });
      }

      mailSender(
        email,
        "Welcome to Intern Hub",
        userRegistrationTemplate(`${firstName} ${lastName}`, email, password)
      );

      return res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
