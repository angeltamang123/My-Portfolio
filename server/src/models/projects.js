const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDetails: String,
  projectLinks: [
    {
      name: String,
      url: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
