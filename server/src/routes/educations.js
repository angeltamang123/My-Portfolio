const { Router } = require("express");
const {
  enterNewEducation,
  getAllEducations,
  getEducationById,
  deleteEducation,
  updateEducation,
  addEducationBullet,
  deleteEducationBullet,
} = require("../controllers/educations");
const { protect } = require("../middleware/adminAuthMiddleware");
const app = Router();

app.post("/educations", protect, enterNewEducation);
app.get("/educations", getAllEducations);
app.get("/educations/:id", getEducationById);
app.patch("/educations/:id", protect, updateEducation);
app.delete("/educations/:id", protect, deleteEducation);
app.patch("/educations/:id/add-bullet", protect, addEducationBullet);
app.patch("/educations/:id/delete-bullet", protect, deleteEducationBullet);

module.exports = app;
