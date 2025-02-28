import express from "express";
import {
  signup,
  login,
  getMe,
  logout,
  getAllUsers,
  updateProfile,
  sendOtp,
} from "../controllers/Auth.js";
import { auth } from "../middlewares/auth.js";
import {
  resetPasswordToken,
  resetPassword,
} from "../controllers/ResetPassword.js";

const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Send OTP Route
router.post("/sendOTP", sendOtp);

// Login Route
router.post("/login", login);

// Get Me Route
router.get("/me", auth, getMe);

// Logout Route
router.get("/logout", logout);

// Get All Users Route
router.get("/allUsers", getAllUsers);

// Update Profile Route
router.post("/updateProfile", auth, updateProfile);

// ResetPassword Token
router.post("/resetPasswordToken", resetPasswordToken);

// Reset Password Route
router.post("/resetPassword/:token", resetPassword);

export default router;
