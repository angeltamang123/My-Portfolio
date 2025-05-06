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

const app = Router();

app.post("/experiences", enterNewExperience);
app.get("/experiences", getAllExperiences);
app.get("/experiences/:id", getExperienceById);
app.patch("/experiences/:id", updateExperience);
app.delete("/experiences/:id", deleteExperience);
app.patch("/experiences/:id/add-bullet", addExperienceBullet);
app.patch("/experiences/:id/delete-bullet", deleteExperienceBullet);

module.exports = app;
