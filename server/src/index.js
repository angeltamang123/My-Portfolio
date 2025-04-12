const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(
  cors({
    origin: "*",
  })
);
const port = 6000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
