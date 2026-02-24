import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    noticeType: {
      type: String,
      enum: ["General", "Campus Drive", "Deadline", "Update"],
      default: "General"
    },

    description: {
      type: String,
      required: true
    },

    targetRole: {
      type: String,
      enum: ["student"],
      default: "student"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const Notice = mongoose.model("Notice", noticeSchema);
