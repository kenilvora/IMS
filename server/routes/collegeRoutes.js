const express = require("express");
const {
  addCollegeDetails,
  addDepartment,
  getCollegeDetails,
  getDepartmentDetails,
} = require("../controllers/College");
const { auth, isAdmin } = require("../middlewares/auth");
const router = express.Router();

// Add College Route
router.post("/addCollege", auth, isAdmin, addCollegeDetails);

// Add Department Route
router.post("/addDepartment", auth, isAdmin, addDepartment);

// Get College Details Route
router.get("/getCollegeDetails", getCollegeDetails);

// Get Department Details Route
router.get("/getDepartmentDetails", getDepartmentDetails);

module.exports = router;
