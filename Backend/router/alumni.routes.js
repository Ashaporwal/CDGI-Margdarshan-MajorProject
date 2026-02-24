import express from "express";
import { body } from "express-validator";
import {
  createAlumniProfile,
  getMyAlumniProfile,
  updateAlumniProfile,
  getAllAlumniProfiles
} from "../controller/alumni.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/alumni",
  protect,

  body("company", "Company is required").notEmpty(),
  body("designation", "Designation is required").notEmpty(),
  body("experienceYears", "Experience must be number").isNumeric(),

  validate,
  createAlumniProfile
);


router.get(
  "/alumni/me",
  protect,
  getMyAlumniProfile
);

router.put(
  "/alumni",
  protect,
  updateAlumniProfile
);


router.get(
  "/alumni/all",
  protect,
  getAllAlumniProfiles
);

export default router;