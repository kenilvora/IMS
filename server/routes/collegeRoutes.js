const express = require("express");
const { addCollegeDetails, addDepartment } = require("../controllers/College");
const { auth, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.post("/addCollege", auth, isAdmin, addCollegeDetails);
router.post("/addDepartment", auth, isAdmin, addDepartment);

module.exports = router;
