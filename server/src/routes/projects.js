const { Router } = require("express");

const {
  enterNewProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectBullet,
  deleteProjectBullet,
} = require("../controllers/projects");

const app = Router();

app.post("/projects", enterNewProject);
app.get("/projects", getAllProjects);
app.get("/projects/:id", getProjectById);
app.patch("/projects/:id", updateProject);
app.delete("/projects/:id", deleteProject);
app.patch("/projects/:id/add-bullet", addProjectBullet);
app.patch("/projects/:id/delete-bullet", deleteProjectBullet);

module.exports = app;
