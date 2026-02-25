import { Job } from "../model/job.model.js";

export const createJob = async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.role !== "alumni") {
            return res.status(403).json({ message: "Not authorized to post job" });
        }
        
        const job = await Job.create({
            ...req.body,
            postedBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name email role").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("postedBy", "name email role");
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const updateJob = async (req, res) => {
    try {
    
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (req.user.role !== "admin" && job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed to update this job" });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            updatedJob
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


export const deleteJob = async (req, res) => {
    try {
         const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

       
        if (req.user.role !== "admin" && job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed to delete this job" });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Job deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

