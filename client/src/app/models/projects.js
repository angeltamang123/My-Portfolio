// client/src/models/Project.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDetails: String,
  projectBullets: [String],
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
  projectLinks: {
    type: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
    default: [],
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
