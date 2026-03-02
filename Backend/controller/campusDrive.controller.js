import { CampusDrive } from "../model/campusDrive.model.js";


export const createCampusDrive = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can schedule campus drive"
      });
    }

    const drive = await CampusDrive.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Campus Drive created successfully",
      drive
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getAllCampusDrives = async (req, res) => {
  try {

    const drives = await CampusDrive.find()
      .populate("createdBy", "name email")
      .sort({ driveDate: 1 });

    res.status(200).json({
      success: true,
      count: drives.length,
      drives
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getCampusDriveById = async (req, res) => {
  try {

    const drive = await CampusDrive.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Campus Drive not found"
      });
    }

    res.status(200).json({
      success: true,
      drive
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const updateCampusDrive = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update campus drive"
      });
    }

    const updatedDrive = await CampusDrive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDrive) {
      return res.status(404).json({
        success: false,
        message: "Campus Drive not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Campus Drive updated successfully",
      updatedDrive
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


export const deleteCampusDrive = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete campus drive"
      });
    }

    const drive = await CampusDrive.findByIdAndDelete(req.params.id);

    if (!drive) {
      return res.status(404).json({
        success: false,
        message: "Campus Drive not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Campus Drive deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};