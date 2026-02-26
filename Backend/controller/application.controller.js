import { Application } from "../model/application.model.js";
import { Job } from "../model/job.model.js";


export const applyJob = async (req, res) => {
  try {
    const studentId = req.user.id;
    const jobId = req.params.jobId;
    const { resumeUrl } = req.body;


    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can apply" });
    }

  
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // check duplicate
    const alreadyApplied = await Application.findOne({ jobId, studentId });
    if (alreadyApplied) {
      return res.status(400).json({ message: "You already applied to this job" });
    }

    const application = await Application.create({
      jobId,
      studentId,
      resumeUrl
    });

    res.status(201).json({
      success: true,
      message: "Applied successfully",
      application
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= MY APPLICATIONS ================= */

export const getMyApplications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const applications = await Application.find({ studentId })
      .populate("jobId", "title company location jobType")
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET APPLICANTS FOR JOB ================= */

export const getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // only job owner or admin
    if (req.user.role !== "admin" && job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const applicants = await Application.find({ jobId })
      .populate("studentId", "name email department");

    res.status(200).json({ applicants });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= UPDATE STATUS ================= */

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id).populate("jobId");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const job = application.jobId;

    if (req.user.role !== "admin" && job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Status updated",
      application
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};