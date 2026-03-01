

import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    enrollmentNumber: String,
    course: String,
    yearOfStudy: Number,
    cgpa: Number,
    address: String,
    skills: String,
    linkedin: String,
    github: String,
    portfolio: String,
    resume: String,
    profilePic: String
});

export default mongoose.model("StudentProfile", studentProfileSchema);


// import mongoose from "mongoose";

// const studentProfileSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//         unique: true
//     },
//     enrollmentNumber: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true
//     },
//     course: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     yearOfStudy: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 6
//     },

//     skills: {
//         type: [String],
//         default: []
//     },
//     resumeUrl: {
//         type: String,
//         trim: true
//     },
//     placementStatus: {
//         type: String,
//         enum: ["Not Placed", "Placed"],
//         default: "Not Placed"
//     }
// }, { timestamps: true });
// const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

// export default StudentProfile;
