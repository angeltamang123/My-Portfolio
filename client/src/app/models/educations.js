import mongoose from "mongoose";
const { Schema } = mongoose;

const educationSchema = new Schema({
  educationName: {
    type: String,
    required: true,
  },
  educationOrganization: {
    type: String,
    required: true,
  },
  educationOrganizationLocation: String,
  educationDetails: String,
  educationBullets: [String],
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.Education ||
  mongoose.model("Education", educationSchema);
