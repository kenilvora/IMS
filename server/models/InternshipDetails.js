const mongoose = require("mongoose");

const internship = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    companyDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyDetails",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    skills: {
      type: [String],
      trim: true,
    },
    certificate: {
      type: String,
      trim: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    finalReport: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["OnGoing", "Completed"],
      default: "OnGoing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InternshipDetails", internship);
