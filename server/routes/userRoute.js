import express from "express";
import {
  signup,
  login,
  getMe,
  logout,
  getAllUsers,
  sendOtp,
  updateProfile,
  changePassword,
  getUserById,
  facultyList,
  addUser,
} from "../controllers/Auth.js";
import { auth, isAdmin } from "../middlewares/auth.js";
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

// Change Password Route
router.put("/changePassword", auth, changePassword);

// Update Me Route
router.put("/update", auth, updateProfile);

// Logout Route
router.get("/logout", logout);

// Get All Users Route
router.get("/allUsers", auth, isAdmin, getAllUsers);

// Get User By ID Route
router.get("/user/:id", auth, isAdmin, getUserById);

// ResetPassword Token
router.post("/resetPasswordToken", resetPasswordToken);

// Reset Password Route
router.post("/resetPassword/:token", resetPassword);

// Get All Faculty List based on college and department
router.get(
  "/getFacultyList/:collegeId/:departmentId",
  auth,
  isAdmin,
  facultyList
);

// Add user route for admin
router.post("/addUser", auth, isAdmin, addUser);

export default router;
