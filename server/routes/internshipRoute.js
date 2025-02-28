import express from "express";
import { auth, isStudent, isAdmin, isSupervisor } from "../middlewares/auth.js";
import {
  addInternship,
  addTask,
  getTasks,
  getInternship,
  getAllInternshipsOfMe,
  getTask,
  getAllInternships,
  updateInternship,
  updateTask,
  commentOnTask,
  getInternshipByStatus,
  getInternshipByStatusForFaculty,
  getAllInternshipsByStatus,
} from "../controllers/Internship.js";

const router = express.Router();

// Add Internship Route
router.post("/addInternship", auth, isStudent, addInternship);

// Add Task Route
router.post("/:id/addTask", auth, isStudent, addTask);

// Get Task Route by Internship Id and Task Id
router.get("/:internShipId/getTask/:taskId", auth, isStudent, getTask);

// Get All Tasks Route by Internship Id
router.get("/:id/getTasks", auth, isStudent, getTasks);

// Get Internship Route by Internship Id
router.get("/:id/getInternship", auth, isStudent, getInternship);

// Get All Internships Route of Student
router.get("/getAllInternships", auth, isStudent, getAllInternshipsOfMe);

// Get All Internships Route in Database
router.get("/getAll", auth, isAdmin, getAllInternships);

// Update Internship Route by Internship Id
router.put("/:id/updateInternship", auth, isStudent, updateInternship);

// Update Task Route by Internship Id and Task Id
router.put("/:internShipId/updateTask/:taskId", auth, isStudent, updateTask);

// Comment Route on Task by Internship Id and Task Id
router.post(
  "/:internShipId/commentOnTask/:taskId",
  auth,
  isSupervisor,
  commentOnTask
);

// Get Internship Route by Status for Intern
router.get("/getByStatus/:status", auth, isStudent, getInternshipByStatus);

// Get InternShip by Status for Supervisor
router.get(
  "/getInternshipByStatus/:status",
  auth,
  isSupervisor,
  getInternshipByStatusForFaculty
);

// Get All Internships by Status
router.get(
  "/getAllInternshipByStatus/:status",
  auth,
  isAdmin,
  getAllInternshipsByStatus
);

export default router;
