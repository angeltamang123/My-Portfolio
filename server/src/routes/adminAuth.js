const { Router } = require("express");
const jwt = require("jsonwebtoken");
const app = Router();

app.post("/admin", (req, res) => {
  const { accessKey } = req.body;

  if (!accessKey) {
    return res.status(400).json({ message: "Access key is required" });
  }

  if (accessKey === process.env.ADMIN_ACCESS_KEY) {
    // User authenticated, create token
    const token = jwt.sign(
      { id: "admin_user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour, adjust as needed
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid access key" });
  }
});

module.exports = app;
