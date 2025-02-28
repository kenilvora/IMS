import express from "express";
import {
  addCollegeDetails,
  addDepartment,
  getCollegeDetails,
  getDepartmentDetails,
} from "../controllers/College.js";
import { auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Add College Route
router.post("/addCollege", auth, isAdmin, addCollegeDetails);

// Add Department Route
router.post("/addDepartment", auth, isAdmin, addDepartment);

// Get College Details Route
router.get("/getCollegeDetails", getCollegeDetails);

// Get Department Details Route
router.get("/getDepartmentDetails", getDepartmentDetails);

export default router;
