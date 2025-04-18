import User from "../models/User.js";
import { mailSender } from "../utils/mailSender.js";
import dns from "dns";
import crypto from "crypto";
import { resetPasswordTemplate } from "../mail/resetPasswordTemplate.js";
import bcrypt from "bcrypt";
import { passwordUpdate } from "../mail/passwordUpdate.js";

export const resetPasswordToken = async (req, res) => {
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

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    await User.findByIdAndUpdate(
      user._id,
      {
        resetPasswordToken: token,
        resetPasswordTokenExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    const resetPasswordUrl = `http://localhost:4000/reset-password/${token}`;

    try {
      const name = `${user.firstName} ${user.lastName}`;
      await mailSender(
        email,
        "Reset Your Password",
        resetPasswordTemplate(resetPasswordUrl, name)
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
      message: "Reset password link sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is Invalid",
      });
    }

    if (user.resetPasswordTokenExpires <= Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token has expired, Please regenerate your token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
        resetPasswordToken: "",
        resetPasswordTokenExpires: null,
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
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
