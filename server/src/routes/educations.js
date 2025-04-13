const { Router } = require("express");
const {
  enterNewEducation,
  getAllEducations,
  getEducationById,
  deleteEducation,
  updateEducation,
} = require("../controllers/educations");

const app = Router();

app.post("/educations", enterNewEducation);
app.get("/educations", getAllEducations);
app.get("/educations/:id", getEducationById);
app.patch("/educations/:id", updateEducation);
app.delete("/educations/:id", deleteEducation);

module.exports = app;
