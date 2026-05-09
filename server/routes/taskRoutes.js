const adminOnly = require("../middleware/adminMiddleware");
const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController");

router.post("/", protect, adminOnly, createTask);
router.get("/", protect, getTasks);
router.delete("/:id", protect, adminOnly, deleteTask);
router.put("/:id", protect, updateTaskStatus);

module.exports = router;