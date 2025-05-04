const { Router } = require("express");

const {
  enterNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projects");

const app = Router();

app.post("/projects", enterNewProject);
app.get("/projects", getAllProjects);
app.get("/projects/:id", getProjectById);
app.patch("/projects/:id", updateProject);
app.delete("/projects/:id", deleteProject);

module.exports = app;
