import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  get,
  changePassword,
  logout
} from "../controller/user.controller.js";
import { validate } from "../middleware/validate.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/register",

  body("name", "Name is required").notEmpty(),
  body("email", "Valid email is required").isEmail(),
  body("password", "Password must be at least 6 characters")
    .isLength({ min: 6 }),
  body("role", "Role must be student, alumni or admin")
    .isIn(["student", "alumni", "admin"]),
  body("graduationYear", "Graduation year must be a number")
    .optional()
    .isNumeric(),

  validate,
  register
);


router.post(
  "/login",

  body("email", "Valid email is required").isEmail(),
  body("password", "Password is required").notEmpty(),

  validate,
  login
);


router.get(
  "/get",
  protect,
  get
);

router.put(
  "/profile",
  protect,
  upload.single("photo"),
  updateProfile
);

router.put(
  "/changePassword",
  protect,

  body("oldPassword", "Old password is required").notEmpty(),
  body("newPassword", "New password must be at least 6 characters")
    .isLength({ min: 6 }),

  validate,
  changePassword
);

router.post(
  "/logout",
  protect,
  logout
);

export default router;