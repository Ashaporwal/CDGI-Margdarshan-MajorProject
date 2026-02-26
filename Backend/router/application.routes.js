import express from "express";
import { body, param } from "express-validator";
import {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus
} from "../controller/application.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/apply/:jobId",
  protect,
  param("jobId").isMongoId(),
  validate,
  applyJob
);


router.get("/my-applications", protect, getMyApplications);

router.get(
  "/job/:jobId/applicants",
  protect,
  param("jobId").isMongoId(),
  validate,
  getApplicantsForJob
);


router.put(
  "/application/:id/status",
  protect,
  param("id").isMongoId(),
  body("status").isIn(["Applied","Shortlisted","Interview","Selected","Rejected"]),
  validate,
  updateApplicationStatus
);

export default router;