const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    
const {
  title,
  description,
  dueDate,
  project,
  assignedTo,
} = req.body;

    const task = await Task.create({
  title,
  description,
  status: "pending",
  createdBy: req.user.id,
  dueDate,
  project,
  assignedTo,
});

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
  .populate("assignedTo", "name email")
  .populate("createdBy", "name email")
  .populate("project", "name");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const updateTaskStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
};