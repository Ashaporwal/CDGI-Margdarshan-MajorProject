import AlumniProfile from "../model/alumni.model.js";

/* CREATE PROFILE */
export const createAlumniProfile = async (req, res) => {
  try {

    if (req.user.role !== "alumni") {
      return res.status(403).json({ message: "Only alumni allowed" });
    }

    const existing = await AlumniProfile.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await AlumniProfile.create({
      userId: req.user.id,
      ...req.body
    });

    res.status(201).json(profile);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* GET MY PROFILE */
export const getMyAlumniProfile = async (req, res) => {
  try {

    const profile = await AlumniProfile.findOne({ userId: req.user.id })
      .populate("userId", "name email department graduationYear");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* UPDATE PROFILE */
export const updateAlumniProfile = async (req, res) => {
  try {

    const profile = await AlumniProfile.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


/* ADMIN: GET ALL */
export const getAllAlumniProfiles = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const profiles = await AlumniProfile.find()
      .populate("userId", "name email department graduationYear");

    res.status(200).json(profiles);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};