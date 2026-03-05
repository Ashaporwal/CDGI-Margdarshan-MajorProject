import User from "../model/user.model.js";
import StudentProfile from "../model/student.model.js";
export const createProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const {
      enrollmentNumber,
      course,
      yearOfStudy,
      skills,
      resumeUrl,
      placementStatus
    } = req.body;

    const profileExists = await StudentProfile.findOne({ userId });

    if (profileExists) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const skillsArray =
      typeof skills === "string"
        ? skills.split(",").map(s => s.trim())
        : skills;

    const profile = await StudentProfile.create({
      userId,
      enrollmentNumber,
      course,
      yearOfStudy,
      skills : skillsArray,
      resumeUrl,
      placementStatus
    });

    return res.status(201).json({
      message: "Profile created successfully",
      profile
    });

  } catch (error) {

    console.log("Create profile error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }
};


export const getProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const profile = await StudentProfile
      .findOne({ userId })
      .populate("userId", "name email department graduationYear photo");

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    return res.status(200).json({ profile });

  } catch (error) {

    console.log("Get profile error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }
};


export const updateProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const updates = req.body;

    const profile = await StudentProfile.findOneAndUpdate(
      { userId },
      updates,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      profile
    });

  } catch (error) {

    console.log("Update profile error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }
};


export const deleteProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    const profile = await StudentProfile.findOneAndDelete({ userId });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    return res.status(200).json({
      message: "Profile deleted successfully"
    });

  } catch (error) {

    console.log("Delete profile error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }
};

export const getFullProfile = async (req, res) => {
  try {

    const userId = req.user.id;

    // get basic user info
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // get student profile
    const studentProfile = await StudentProfile.findOne({ userId });

    if (!studentProfile) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }

    // send combined response
    return res.status(200).json({
      success: true,
      user,
      studentProfile
    });

  } catch (error) {

    console.error("Full profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
};

export const uploadResume = async (req, res) => {
  try {

    const userId = req.user.id;


    const profile = await StudentProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        message: "Student profile not found"
      });
    }


    if (!req.file) {
      return res.status(400).json({
        message: "No resume file uploaded"
      });
    }

    profile.resumeUrl = req.file.path;

    await profile.save();

    return res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl: profile.resumeUrl
    });

  } catch (error) {

    console.log("Resume upload error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }
};