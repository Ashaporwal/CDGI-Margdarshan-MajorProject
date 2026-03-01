import User from "../model/user.model.js";
import StudentProfile from "../model/student.model.js";

export const createProfile = async (req, res) => {
  try {
    // Logic to create student profile
    // const userId = req.user.id;
    const userId = req.user._id;

    const {
      
      enrollmentNumber,
      course,
      yearOfStudy,
      skills,
      resumeUrl,
      placementStatus,
    } = req.body;
    const profileExists = await StudentProfile.findOne({ userId });
    if (profileExists) {
      return res.status(400).json({ message: "Profile already exists" });
    }
    const profile = await StudentProfile.create({
      userId,
      enrollmentNumber,
      course,
      yearOfStudy,
      skills,
      resumeUrl,
      placementStatus,
    });

    return res.status(201).json({ message: "Profile created successfully" ,profile});
  } catch (error) {
    console.log("Create profile error: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const getProfile = async (req, res) => {
  try {
    // Logic to get own student profile
    const userId = req.user._id;
    const profile = await StudentProfile.findOne({ userId }).populate(
      "userId",
      "name email department graduationYear",
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.log("Get profile error: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updateData = {
      enrollmentNumber: req.body.enrollmentNumber,
      course: req.body.course,
      yearOfStudy: req.body.yearOfStudy,
      cgpa: req.body.cgpa,
      address: req.body.address,
      skills: req.body.skills,
      linkedin: req.body.linkedin,
      github: req.body.github,
      portfolio: req.body.portfolio,
    };

    // if (req.file) {
    //   updateData.resume = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    // }
if (req.file) {
  updateData.profilePic = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
}

    const profile = await StudentProfile.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, profile });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// export const updateProfile = async (req, res) => {
//   try {
//     // Logic to update own student profile
//     console.log(req.user._id);
//     const userId = req.user._id;
//     const updates = req.body;
//     const profile = await StudentProfile.findOneAndUpdate({ userId }, updates, {
//       new: true,
//     });
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: "Profile updated successfully", profile });
//   } catch (error) {
//     console.log("Update profile error: ", error);
//     return res.status(500).json({ message: "internal server error" });
//   }
// };



export const deleteProfile = async (req, res) => {
  try {
    // Logic to delete own student profile
    const userId = req.user._id;
    const profile = await StudentProfile.findOneAndDelete({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.log("Delete profile error: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
};



// import User from "../model/user.model.js";
// import StudentProfile from "../model/student.model.js";

import Student from "../model/student.model.js";

export const getFullProfile = async (req, res) => {
  console.log("getFullProfile called for user:", req.user.id);

  try {
    let profile = await StudentProfile.findOne({ userId: req.user.id });

    // Agar profile nahi hai, to create default empty profile
    if (!profile) {
      console.log("Profile not found, creating default profile...");
      profile = await StudentProfile.create({
        userId: req.user.id,
        enrollmentNumber: "",
        course: "",
        yearOfStudy: null,
        cgpa: null,
        address: "",
        skills: "",
        linkedin: "",
        github: "",
        portfolio: "",
        resume: "",
      });
    }

    res.json({ user: req.user, studentProfile: profile });
  } catch (err) {
    console.error("Error in getFullProfile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// export const getFullProfile = async (req, res) => {
//   try {
//     // fetch student profile and populate user details
//     const student = await StudentProfile.findOne({ userId: req.user.id }).populate("userId");

//     if (!student) {
//       return res.status(404).json({ message: "Student profile not found" });
//     }

//     console.log("Student full profile:", student); // should show all fields now

//     res.status(200).json({
//       user: {
//         userId: student.userId, // populated user data
//       },
//       studentProfile: student,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };