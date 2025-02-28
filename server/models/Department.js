import mongoose from "mongoose";

const department = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  college: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeDetails",
      required: true,
    },
  ],
});

export default mongoose.model("Department", department);
