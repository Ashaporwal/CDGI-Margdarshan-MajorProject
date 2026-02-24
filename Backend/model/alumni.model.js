import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  phone: String,
  location: String,

  company: {
    type: String,
    required: true
  },

  designation: {
    type: String,
    required: true
  },

  experienceYears: {
    type: Number,
    required: true
  },

  bio: String,

  skills: [String],

  linkedin: String,
  github: String,
  portfolio: String,

  mentorshipAvailable: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("AlumniProfile", alumniSchema);