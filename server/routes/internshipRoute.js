const express = require("express");
const { auth, isStudent } = require("../middlewares/auth");
const { addInternship, addTask } = require("../controllers/Internship");
const router = express.Router();

router.post("/addInternship", auth, isStudent, addInternship);
router.post("/:id/addTask", auth, isStudent, addTask);

module.exports = router;
