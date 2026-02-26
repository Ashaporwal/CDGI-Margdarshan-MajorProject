import express from "express";
import { body, param } from "express-validator";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controller/job.controller.js";

import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  body("title", "Title is required").notEmpty(),
  body("company", "Company is required").notEmpty(),
  body("jobType", "Job type must be Full-time or Internship")
    .isIn(["Full-time", "Internship"]),
  body("location", "Location is required").notEmpty(),
  body("description", "Description is required").notEmpty(),
  body("deadline", "Deadline must be a valid date").isISO8601(),
  validate,
  createJob
);


router.get("/", protect, getAllJobs);

router.get(
  "/:id",
  protect,
  param("id", "Invalid Job ID").isMongoId(),
  validate,
  getJobById
);

router.put(
  "/:id",
  protect,
  param("id", "Invalid Job ID").isMongoId(),
  body("jobType")
    .optional()
    .isIn(["Full-time", "Internship"])
    .withMessage("Job type must be Full-time or Internship"),
  body("deadline")
    .optional()
    .isISO8601()
    .withMessage("Deadline must be a valid date"),
  validate,
  updateJob
);


router.delete(
  "/:id",
  protect,
  param("id", "Invalid Job ID").isMongoId(),
  validate,
  deleteJob
);

export default router;