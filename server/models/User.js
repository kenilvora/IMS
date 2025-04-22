import mongoose from "mongoose";

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
    enrollmentNumber: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "Student";
      },
      unique: true,
      sparse: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollegeDetails",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    currentYear: {
      type: String,
      required: function () {
        return this.role === "Student";
      },
      trim: true,
    },
    currentSemester: {
      type: String,
      required: function () {
        return this.role === "Student";
      },
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: function () {
        return this.role === "Student";
      },
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    skills: {
      type: String,
      trim: true,
    },
    interests: {
      type: String,
      trim: true,
    },
    internshipDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InternshipDetails",
      },
    ],
    internStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.role === "Student";
      },
    },
    role: {
      type: String,
      enum: ["Student", "Admin", "Supervisor"],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.role !== "Student") {
    delete this.enrollmentNumber;
    delete this.internshipDetails;
    delete this.faculty;
    delete this.currentYear;
    delete this.currentSemester;
    delete this.skills;
    delete this.address;
    delete this.interests;
    delete this.bio;
  }
  if (this.role !== "Supervisor") {
    delete this.internStudents;
  }
  next();
});

export default mongoose.model("User", userSchema);
