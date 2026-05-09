const express = require("express");

const router = express.Router();

const {
  signupUser,
  loginUser,
  getMembers,
} = require("../controllers/authController");



router.post("/signup", signupUser);

router.post("/login", loginUser);
router.get("/members", getMembers);

module.exports = router;