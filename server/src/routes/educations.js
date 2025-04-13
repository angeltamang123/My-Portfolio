const { Router } = require("express");
const enterNewEducation = require("../controllers/educations");

const app = Router();

app.post("/educations", enterNewEducation);

module.exports = app;
