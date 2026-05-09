const Project = require("../models/Project");

const createProject = async (req, res) => {

  try {

    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email");

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createProject,
  getProjects,
};