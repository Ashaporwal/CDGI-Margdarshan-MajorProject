import mongoose from "mongoose";


const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },

  company: { type: String, required: true },

  jobType: {
    type: String,
    enum: ["Full-time", "Internship"],
    required: true
  },

  location: { type: String, required: true },

  salary: { type: String },

  description: { type: String, required: true },
// -------

  requirements: [{ type: String }],

  experienceLevel: {
    type: String,
    enum: ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"]
  },

  minCGPA: { type: Number },

  skills: [{ type: String }],

  deadline: { type: Date, required: true },

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

}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
