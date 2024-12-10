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
    collegeDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeDetails",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
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

profileSchema.pre("save", function (next, options) {
  const userRole = options?.userRole; // Access the user role from options

  if (userRole && userRole !== "Student") {
    // Exclude these fields for non-student roles
    this.yearOfStudy = undefined;
    this.passingYear = undefined;
    this.resume = undefined;
    this.projects = undefined;
  }
  if (userRole && userRole === "Admin") {
    this.department = undefined;
    this.skills = undefined;
    this.education = undefined;
  }
  next();
});

module.exports = mongoose.model("Profile", profileSchema);
