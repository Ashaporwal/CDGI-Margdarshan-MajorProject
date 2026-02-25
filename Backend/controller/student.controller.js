import StudentProfile from "../model/student.model.js";

export const createProfile = async (req, res) => {
  try {
    // Logic to create student profile
    const userId = req.user.id;
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

    return res.status(201).json({ message: "Profile created successfully" });
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
    // Logic to update own student profile
    const userId = req.user._id;
    const updates = req.body;
    const profile = await StudentProfile.findOneAndUpdate({ userId }, updates, {
      new: true,
    });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res
      .status(200)
      .json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.log("Update profile error: ", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
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
