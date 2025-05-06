const Education = require("../models/educations");

const enterNewEducation = async (req, res) => {
  const isExist = await Education.exists({
    educationName: req.body.educationName,
  });
  if (isExist) return res.status(409).send("This education already exists!");
  Education.create(req.body);
  res.send("Education added successfully");
};

const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch (err) {
    res.status(500).json({ error: "Error fetching educations" });
  }
};

const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).send("Education not found");
    res.status(200).json({ message: "Education updated", education: updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating education" });
  }
};

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).send("Education not found");
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ error: "Error fetching education" });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Education not found");
    res.status(200).json({ message: "Education deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting education" });
  }
};

const addEducationBullet = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).send("Education not found");

    const isExist = education.educationBullets.includes(req.body.bullet);
    if (isExist)
      return res.status(409).send("This bullet point already exists");

    const added = await Education.findByIdAndUpdate(
      req.params.id,
      {
        $push: { educationBullets: req.body.bullet },
      },
      {
        new: true,
      }
    );
    if (!added) return res.status(404).send("Education not found");
    res.status(200).json({
      message: "Bullet point added successfully",
      education: added,
    });
  } catch (err) {
    res.status(500).json({ error: "Error adding bullet point" });
  }
};

const deleteEducationBullet = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).send("Education not found");

    const isExist = education.educationBullets.includes(req.body.bullet);
    if (!isExist) return res.status(404).send("Bullet point not found");

    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      { $pull: { educationBullets: req.body.bullet } },
      { new: true }
    );

    res.status(200).json({
      message: "Bullet point deleted successfully",
      education: updated,
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting bullet point" });
  }
};

module.exports = {
  enterNewEducation,
  getAllEducations,
  getEducationById,
  updateEducation,
  deleteEducation,
  addEducationBullet,
  deleteEducationBullet,
};
