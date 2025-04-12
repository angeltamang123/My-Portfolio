const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDetails: String,
  status: {
    type: String,
    enum: ["In-Progress", "Completed"],
    default: "In-Progress",
  },
  projectType: {
    type: String,
    enum: ["AI/ML", "Web Development", "Others"],
    default: "Web Development",
  },
  projectLinks: [
    {
      name: String,
      url: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
