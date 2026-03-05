import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    enrollmentNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    yearOfStudy: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    cgpa: {
        type: Number,
        min: 0,
        max: 10
    },

    address: {
        type: String,
        trim: true
    },

    skills: {
        type: [String],
        default: []
    },
    linkedin: String,
    github: String,
    portfolio: String,
    resumeUrl: {
        type: String,
        trim: true
    },

    placementStatus: {
        type: String,
        enum: ["Not Placed", "Placed"],
        default: "Not Placed"
    }
}, { timestamps: true });
const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

export default StudentProfile;
