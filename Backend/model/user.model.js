import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
  type: String,
  required: true
},

lastName: {
  type: String,
  required: true
},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "alumni", "admin"],
        default: "student"
    },
    department: {
        type: String,
        required: true
        
    },
    graduationYear: {
        type: Number,
        required: function () {
            return this.role !== "admin";
        }
    },
    photo: {
  type: String,
},
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
