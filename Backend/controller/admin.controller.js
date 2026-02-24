import User from "../model/user.model.js";

export const verifyAlumni = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "alumni") {
      return res.status(400).json({ message: "Not an alumni account" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "Alumni verified successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPendingAlumni = async (req, res) => {
  try {

    const alumni = await User.find({
      role: "alumni",
      isVerified: false
    }).select("name email department graduationYear");

    res.status(200).json(alumni);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
