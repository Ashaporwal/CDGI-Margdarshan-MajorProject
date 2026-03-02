import mongoose from "mongoose";

const campusDriveSchema = new mongoose.Schema({

  companyName: {
    type: String,
    required: true,
    trim: true
  },

  jobRoles: [{
    type: String,
    required: true
  }],

  driveDate: {
    type: Date,
    required: true
  },

  time: {
    type: String   // e.g. "10:00 AM"
  },

  location: {
    type: String,
    required: true
  },

  eligibilityCriteria: {
    type: String
  },

  packageOffered: {
    type: String
  },

  description: {
    type: String
  },

  totalRegistrations: {
    type: Number,
    default: 0
  },

  studentsPlaced: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["upcoming", "completed", "cancelled"],
    default: "upcoming"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

export const CampusDrive = mongoose.model("CampusDrive", campusDriveSchema);