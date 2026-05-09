const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

router.post("/", protect, adminOnly, createProject);

router.get("/", protect, getProjects);

module.exports = router;