const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
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
    projects: [
      {
        title: {
          type: String,
          trim: true,
          required: true,
        },
        description: {
          type: String,
          trim: true,
          required: true,
        },
        link: {
          type: String,
          trim: true,
        },
      },
    ],
    social: {
      github: {
        type: String,
        trim: true,
      },
      linkedIn: {
        type: String,
        trim: true,
      },
    },
    resume: {
      type: String,
    },
    collegeName: {
      type: String,
      trim: true,
    },
    collegeEmail: {
      type: String,
      trim: true,
    },
    collegeContact: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    enrollmentNumber: {
      type: String,
      trim: true,
    },
    yearOfStudy: {
      type: String,
      trim: true,
    },
    passingYear: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
