const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  about: {
    type: String,
    trim: true,
  },
  skills: {
    type: [String],
  },
  experience: {
    type: String,
    trim: true,
  },
  education: {
    type: String,
    trim: true,
  },
  projects: {
    type: String,
    trim: true,
  },
  social: {
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
  },
  resume: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
