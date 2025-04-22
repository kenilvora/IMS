import express from "express";
import {
  auth,
  isStudent,
  isAdmin,
  isSupervisor,
  isAdminOrSupervisor,
} from "../middlewares/auth.js";
import {
  addInternship,
  addTask,
  getTasks,
  getInternship,
  getAllInternshipsOfMe,
  getTask,
  updateInternship,
  updateTask,
  getAllTasks,
  getInternshipById,
  getInternshipForAdminAndSupervisor,
  supervisorActionOnInternship,
  getAllInternshipsForAdmin,
  getAllInternshipsForSupervisor,
  getAllTaskUnderSupervisor,
} from "../controllers/Internship.js";

const router = express.Router();

// Add Internship Route
router.post("/addInternship", auth, isStudent, addInternship);

// Add Task Route
router.post("/addTask/:id", auth, isStudent, addTask);

// Get Task Route by Internship Id and Task Id
router.get("/getTask/:internShipId/:taskId", auth, isStudent, getTask);

// Get All Tasks Route by Internship Id
router.get("/getTasks/:id", auth, isStudent, getTasks);

// Get All Tasks Route for Student
router.get("/getAllTasks", auth, isStudent, getAllTasks);

// Get Internship Route by Internship Id
router.get("/getInternship/:id", auth, isStudent, getInternship);

// Get Internship Route by Internship Id for Admin and Supervisor
router.get(
  "/getInternshipForAdminAndSupervisor/:id",
  auth,
  isAdminOrSupervisor,
  getInternshipForAdminAndSupervisor
);

// Get Internship Route by Internship Id for Updating Internship
router.get("/getInternshipById/:id", auth, isStudent, getInternshipById);

// Get All Internships Route of Student
router.get("/getAllInternships", auth, isStudent, getAllInternshipsOfMe);

// Get All Internships Route for Admin
router.get("/getAll", auth, isAdmin, getAllInternshipsForAdmin);

// Get All Internships Route for Admin
router.get(
  "/getAllInternshipsForSupervisor",
  auth,
  isSupervisor,
  getAllInternshipsForSupervisor
);

// Update Internship Route by Internship Id
router.put("/updateInternship/:id", auth, isStudent, updateInternship);

// Update Task Route by Internship Id and Task Id
router.put("/updateTask/:internShipId/:taskId", auth, isStudent, updateTask);

// Change approval status of internship for Supervisor
router.put(
  "/updateApproval/:internshipId",
  auth,
  isSupervisor,
  supervisorActionOnInternship
);

// fetch all tasks under a supervisor
router.get(
  "/getAllTasksUnderSupervisor",
  auth,
  isSupervisor,
  getAllTaskUnderSupervisor
);

export default router;
