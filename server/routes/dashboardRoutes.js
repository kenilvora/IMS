import express from "express";
import { auth, isAdmin, isStudent, isSupervisor } from "../middlewares/auth.js";
import {
  adminDashboardData,
  adminReportData,
  studentDashboardData,
  supervisorDashboardData,
} from "../controllers/Dashboard.js";

const router = express.Router();

router.get("/student", auth, isStudent, studentDashboardData);

router.get("/admin", auth, isAdmin, adminDashboardData);

router.get("/admin/reports", auth, isAdmin, adminReportData);

router.get("/supervisor", auth, isSupervisor, supervisorDashboardData);

export default router;
