import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    internshipDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InternshipDetails",
      required: true,
    },
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
    deadline: {
      type: Date,
      required: true,
    },
    attachments: [
      {
        name: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },
        author: {
          type: String,
          required: true,
        },
        commentedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        role: {
          type: String,
          enum: ["Student", "Supervisor"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
