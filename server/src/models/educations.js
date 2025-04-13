const mongoose = require("mongoose");
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

  educationDetails: [String],

  startDate: {
    type: Date,
    default: Date.now,
  },

  endDate: {
    type: Date,
    default: null,
  },
});

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
