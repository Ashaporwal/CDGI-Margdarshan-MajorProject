import express from "express";
import { body } from "express-validator";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getFullProfile
} from "../controller/student.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/profile",
  protect,

  body("enrollmentNumber", "Enrollment required").notEmpty(),
  body("course", "Course required").notEmpty(),
  body("yearOfStudy", "Year must be number").isNumeric(),

  validate,
  createProfile
);

router.get(
  "/profile",
  protect,
  getProfile
);


router.get("/full-profile", protect, getFullProfile);



// router.put(
//   "/profile",
//   protect,
//   upload.single("resume"),
//   updateProfile
// );

router.put(
  "/profile",
  protect,
  upload.single("photo"),
  updateProfile
);


router.delete(
  "/profile",
  protect,
  deleteProfile
);

export default router;