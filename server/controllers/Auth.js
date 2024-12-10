const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dns = require("dns");
require("dotenv").config();

exports.signup = async (req, res) => {
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
      !role
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

    dns.resolveMx(domain, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid email domain",
        });
      }

      const user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const profile = new Profile({
        about: null,
        skills: null,
        experience: null,
        education: null,
        projects: [],
        social: {
          github: null,
          linkedIn: null,
        },
        resume: null,
        collegeDetail: collegeId,
        department: departmentId,
        yearOfStudy: null,
        passingYear: null,
      });

      await profile.save({ userRole: role });

      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        contactNumber,
        enrollmentNumber,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        profile: profile._id,
        faculty: facultyId,
        role,
      });

      return res.status(201).json({
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

exports.login = async (req, res) => {
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

    const domain = email.split("@")[1];

    dns.resolveMx(domain, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid email domain",
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
          secure: true,
          samesite: "lax",
          maxAge: 31536000000,
        });

        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: token,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    console.log("User : ", req.user);
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    const user = await User.findById(id)
      .select("-password")
      .populate([
        {
          path: "profile",
        },
        {
          path: "internshipDetails",
        },
        {
          path: "faculty",
        },
      ]);

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

exports.logout = async (req, res) => {
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
