import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Internship","Campus Drive"],
      required: true
    },

    location: {
      type: String,
      required: true
    },

    salary: {
      type: String
    },

    description: {
      type: String,
      required: true
    },

    deadline: {
      type: Date,
      required: true
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active"
    }
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
