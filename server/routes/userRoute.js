const express = require("express");
const {
  signup,
  login,
  getMe,
  logout,
  getAllUsers,
  updateProfile,
  sendOtp,
} = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
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

module.exports = router;
