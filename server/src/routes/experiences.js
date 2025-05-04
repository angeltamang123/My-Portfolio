const { Router } = require("express");

const {
  enterNewExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} = require("../controllers/experiences");

const app = Router();

app.post("/experiences", enterNewExperience);
app.get("/experiences", getAllExperiences);
app.get("/experiences/:id", getExperienceById);
app.patch("/experiences/:id", updateExperience);
app.delete("/experiences/:id", deleteExperience);

module.exports = app;
