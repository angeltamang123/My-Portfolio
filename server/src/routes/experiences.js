const { Router } = require("express");

const {
  enterNewExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
  addExperienceBullet,
  deleteExperienceBullet,
} = require("../controllers/experiences");
const { protect } = require("../middleware/adminAuthMiddleware");

const app = Router();

app.post("/experiences", protect, enterNewExperience);
app.get("/experiences", getAllExperiences);
app.get("/experiences/:id", getExperienceById);
app.patch("/experiences/:id", protect, updateExperience);
app.delete("/experiences/:id", protect, deleteExperience);
app.patch("/experiences/:id/add-bullet", protect, addExperienceBullet);
app.patch("/experiences/:id/delete-bullet", protect, deleteExperienceBullet);

module.exports = app;
