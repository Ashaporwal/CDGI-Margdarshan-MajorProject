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
      enum: ["General", "Campus Drive", "Deadline", "Update", "Event"],
      default: "General"
    },

    description: {
      type: String,
      required: true
    },

    deadline: {
      type: Date
    },

    link: {
      type: String
    },

    eventDate: {
      type: Date,
      default: null
    },

    venue: {
      type: String,
      default: null
    },
    posterImage: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active"
    }
  },
  { timestamps: true }
);

export const Notice = mongoose.model("Notice", noticeSchema);