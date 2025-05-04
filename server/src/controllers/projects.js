const Project = require("../models/projects");

const enterNewProject = async (req, res) => {
  const isExist = await Project.exists({
    projectName: req.body.projectName,
  });
  if (isExist) return res.status(409).send("This project already exists!");
  Project.create(req.body);
  res.send("Project added successfully");
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).send("Project not found");
    res.status(200).json({ message: "Project updated", project: updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating project" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("Project not found");
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Project not found");
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting project" });
  }
};

module.exports = {
  enterNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
