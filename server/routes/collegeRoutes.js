const express = require("express");
const {
  addCollegeDetails,
  addDepartment,
  getCollegeDetails,
  getDepartmentDetails,
} = require("../controllers/College");
const { auth, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/addCollege", auth, isAdmin, addCollegeDetails);
router.post("/addDepartment", auth, isAdmin, addDepartment);
router.get("/getCollegeDetails", getCollegeDetails);
router.get("/getDepartmentDetails", getDepartmentDetails);

module.exports = router;
