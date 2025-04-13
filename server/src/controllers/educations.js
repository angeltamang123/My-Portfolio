const Education = require("../models/educations");

const enterNewEducation = async (req, res) => {
  const isExist = await Education.exists({
    educationName: req.body.educationName,
  });
  if (isExist) return res.status(409).send("This education already exists!");
  Education.create(req.body);
  res.send("Education added successfully");
};

module.exports = enterNewEducation;
