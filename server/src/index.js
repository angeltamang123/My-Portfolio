const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
require("dotenv").config();
app.use(
  cors({
    origin: process.env.CLIENT_ENDPOINT,
  })
);
const port = 5000;

const educationsRoute = require("./routes/educations");
app.use(educationsRoute);

const experiencesRoute = require("./routes/experiences");
app.use(experiencesRoute);

const projectsRoute = require("./routes/projects");
app.use(projectsRoute);

const adminAuthRoute = require("./routes/adminAuth");
app.use(adminAuthRoute);

const connect = require("./db/connection");
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
