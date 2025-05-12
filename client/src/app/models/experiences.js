// client/src/models/Experience.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const experienceSchema = new Schema({
  experienceName: {
    // Note: This is an array of strings in your model
    type: [String],
    required: true,
  },
  experienceOrganization: {
    type: String,
    required: true,
  },
  experienceDetails: String,
  experienceBullets: [String],
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.Experience ||
  mongoose.model("Experience", experienceSchema);
