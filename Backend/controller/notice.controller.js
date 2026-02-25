import { Notice } from "../model/notice.model.js";

export const createNotice = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can post notice" });
    }

    const notice = await Notice.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Notice created",
      notice
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllNotices = async (req, res) => {
  try {

    const notices = await Notice.find({ status: "active" })
      .sort({ createdAt: -1 });

    res.status(200).json({ notices });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getNoticeById = async (req, res) => {
  try {

    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({ notice });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNotice = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Notice updated",
      notice
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteNotice = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    await Notice.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Notice deleted"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};