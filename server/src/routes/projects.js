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
const { protect } = require("../middleware/adminAuthMiddleware");

const app = Router();

app.post("/projects", protect, enterNewProject);
app.get("/projects", getAllProjects);
app.get("/projects/:id", getProjectById);
app.patch("/projects/:id", protect, updateProject);
app.delete("/projects/:id", protect, deleteProject);
app.patch("/projects/:id/add-bullet", protect, addProjectBullet);
app.patch("/projects/:id/delete-bullet", protect, deleteProjectBullet);

module.exports = app;
