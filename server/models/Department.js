const mongoose = require("mongoose");

const department = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollegeDetails",
    required: true,
  },
});

module.exports = mongoose.model("Department", department);
