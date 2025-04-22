import express from "express";
import {
  addCollegeDetails,
  addDepartment,
  getCollegesList,
  getDepartmentsList,
  getFullCollegeDetails,
  getFullDepartmentDetails,
} from "../controllers/College.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Add College Route
router.post("/addCollege", auth, isAdmin, addCollegeDetails);

// Add Department Route
router.post("/addDepartment/:collegeId", auth, isAdmin, addDepartment);

// Get College Details Route
router.get("/getFullCollegeDetails", auth, isAdmin, getFullCollegeDetails);

// Get Department Details Route
router.get(
  "/getFullDepartmentDetails",
  auth,
  isAdmin,
  getFullDepartmentDetails
);

// Get College List Route
router.get("/getCollegeList", auth, getCollegesList);

// Get Department List Route
router.get("/getDepartmentDetails/:collegeId", auth, getDepartmentsList);

export default router;
