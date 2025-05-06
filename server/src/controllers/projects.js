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

const addProjectBullet = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("Project not found");

    const isExist = project.projectBullets.includes(req.body.bullet);
    if (isExist)
      return res.status(409).send("This bullet point already exists");

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $push: { projectBullets: req.body.bullet } },
      { new: true }
    );

    res.status(200).json({
      message: "Bullet point added successfully",
      project: updated,
    });
  } catch (err) {
    res.status(500).json({ error: "Error adding bullet point" });
  }
};

const deleteProjectBullet = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("Project not found");

    const isExist = project.projectBullets.includes(req.body.bullet);
    if (!isExist) return res.status(404).send("Bullet point not found");

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $pull: { projectBullets: req.body.bullet } },
      { new: true }
    );

    res.status(200).json({
      message: "Bullet point deleted successfully",
      project: updated,
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting bullet point" });
  }
};

module.exports = {
  enterNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectBullet,
  deleteProjectBullet,
};
