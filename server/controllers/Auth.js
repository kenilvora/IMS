const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dns = require("dns");

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !contactNumber
    ) {
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

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
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

      const profile = await Profile.create({
        about: "",
        skills: [],
        experience: "",
        education: "",
        projects: "",
        social: {
          github: "",
          linkedin: "",
        },
        resume: "",
      });

      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        contactNumber,
        additionalInfo: profile._id,
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
