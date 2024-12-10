const express = require("express");
const {
  signup,
  login,
  getMe,
  logout,
  getAllUsers,
} = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getMe);
router.get("/logout", logout);
router.get("/allUsers", getAllUsers);

module.exports = router;
