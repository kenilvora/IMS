const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
      trim: true,
    },
    internshipDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InternshipDetails",
      },
    ],
    facultyDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Admin", "Supervisor"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
