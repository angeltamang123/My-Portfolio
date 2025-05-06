const mongoose = require("mongoose");
const { Schema } = mongoose;

const experienceSchema = new Schema({
  experienceName: {
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

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
