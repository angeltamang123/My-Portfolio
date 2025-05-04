const Experience = require("../models/experiences");

const enterNewExperience = async (req, res) => {
  const isExist = await Experience.exists({
    experienceName: req.body.experienceName,
  });
  if (isExist) return res.status(409).send("This experience already exists!");
  Experience.create(req.body);
  res.send("Experience added successfully");
};

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ error: "Error fetching experiences" });
  }
};

const updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) return res.status(404).send("Experience not found");
    res
      .status(200)
      .json({ message: "Experience updated", experience: updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating experience" });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).send("Experience not found");
    res.status(200).json(experience);
  } catch (err) {
    res.status(500).json({ error: "Error fetching experience" });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Experience not found");
    res.status(200).json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting experience" });
  }
};

module.exports = {
  enterNewExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
