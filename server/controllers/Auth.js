import User from "../models/User.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dns from "dns";
import otpGenerator from "otp-generator";
import Otp from "../models/Otp.js";
import { uploadFileToCloudinary } from "../utils/uploadFileToCloudinary.js";
import { mailSender } from "../utils/mailSender.js";
import { passwordUpdate } from "../mail/passwordUpdate.js";
import CollegeDetails from "../models/CollegeDetails.js";
import Department from "../models/Department.js";
import dotenv from "dotenv";

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

    const domain = email.split("@")[1];

    dns.resolveMx(domain, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid email domain",
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

      const profile = new Profile({
        about: null,
        skills: null,
        experience: [],
        education: [],
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

      const newUser = await User.create({
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

      if (role === "Student") {
        facultyDetails.internStudents.push(newUser._id);

        await facultyDetails.save();
      }

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

export const getMe = async (req, res) => {
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    const user = await User.findById(id).select("-password");

    if (req.user.role === "Student") {
      await user.populate([
        {
          path: "profile",
          populate: [
            {
              path: "collegeDetail",
              select: "name",
            },
            {
              path: "department",
              select: "name",
            },
          ],
        },
        {
          path: "internshipDetails",
          populate: [
            {
              path: "companyDetails",
              select: "name email",
            },
            {
              path: "tasks",
              select: "title description deadline status",
            },
          ],
        },
        {
          path: "faculty",
          select: "firstName lastName email",
        },
      ]);
    } else if (req.user.role === "Supervisor") {
      user.internshipDetails = undefined;
      await user.populate({
        path: "profile",
        populate: [
          {
            path: "collegeDetail",
            select: "name",
          },
          {
            path: "department",
            select: "name",
          },
        ],
      });
    } else {
      user.internshipDetails = undefined;
      await user.populate({
        path: "profile",
        populate: [
          {
            path: "collegeDetail",
            select: "name",
          },
        ],
      });
    }

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
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
        { email: { $regex: filter, $options: "i" } },
        { enrollmentNumber: { $regex: filter, $options: "i" } },
      ],
      role: "Student",
    })
      .select("-password")
      .populate({
        path: "profile",
        populate: [
          {
            path: "collegeDetail",
            select: "name",
          },
          {
            path: "department",
            select: "name",
          },
        ],
      })
      .populate({
        path: "internshipDetails",
        populate: [
          {
            path: "companyDetails",
            select: "name email",
          },
          {
            path: "tasks",
            select: "title description deadline status",
          },
        ],
      })
      .populate({
        path: "faculty",
        select: "firstName lastName email",
      });

    return res.status(200).json({
      success: true,
      users,
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

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    let {
      about = null,
      skills = null,
      experience = [],
      education = [],
      projects = [],
      social = {
        github: null,
        linkedIn: null,
      },
      yearOfStudy = null,
      passingYear = null,
    } = req.body;

    let resume = req.file ? req.file.resume : null;

    // Check if at least one meaningful value is provided
    if (
      !about &&
      (!skills || skills.length === 0) &&
      (!experience || experience.length === 0) &&
      (!education || education.length === 0) &&
      (!projects || projects.length === 0) &&
      !social.github &&
      !social.linkedIn &&
      !yearOfStudy &&
      !passingYear &&
      !resume
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    if (resume) {
      resume = await uploadFileToCloudinary(resume, process.env.FOLDER_NAME);
    }

    const profile = await Profile.findById(user.profile);

    const updatedProfile = {
      about: about ?? profile.about,
      skills: skills?.length > 0 ? skills : profile.skills,
      experience: experience?.length > 0 ? experience : profile.experience,
      education: education?.length > 0 ? education : profile.education,
      projects: projects?.length > 0 ? projects : profile.projects,
      social: {
        github: social.github ?? profile.social.github,
        linkedIn: social.linkedIn ?? profile.social.linkedIn,
      },
      resume: resume ?? profile.resume,
      yearOfStudy: yearOfStudy ?? profile.yearOfStudy,
      passingYear: passingYear ?? profile.passingYear,
    };

    // Update the profile in the database
    await Profile.findByIdAndUpdate(user.profile, updatedProfile, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
      await mailSender(
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
