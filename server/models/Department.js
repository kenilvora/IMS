import mongoose from "mongoose";

const department = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollegeDetails",
    required: true,
  },
  deptHead: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  faculties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  internships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InternshipDetails",
    },
  ],
});

export default mongoose.model("Department", department);
