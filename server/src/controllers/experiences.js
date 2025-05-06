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

const addExperienceBullet = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).send("Experience not found");

    const isExist = experience.experienceBullets.includes(req.body.bullet);
    if (isExist)
      return res.status(409).send("This bullet point already exists");

    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      { $push: { experienceBullets: req.body.bullet } },
      { new: true }
    );

    res.status(200).json({
      message: "Bullet point added successfully",
      experience: updated,
    });
  } catch (err) {
    res.status(500).json({ error: "Error adding bullet point" });
  }
};

const deleteExperienceBullet = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).send("Experience not found");

    const isExist = experience.experienceBullets.includes(req.body.bullet);
    if (!isExist) return res.status(404).send("Bullet point not found");

    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      { $pull: { experienceBullets: req.body.bullet } },
      { new: true }
    );

    res.status(200).json({
      message: "Bullet point deleted successfully",
      experience: updated,
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting bullet point" });
  }
};

module.exports = {
  enterNewExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
  addExperienceBullet,
  deleteExperienceBullet,
};
