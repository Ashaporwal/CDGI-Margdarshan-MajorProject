import express from "express";
import {
  changePassword,
  get,
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get", protect, get);

router.put(
  "/profile",
  protect,
  upload.single("photo"), // IMPORTANT
  updateProfile
);

router.put("/changePassword", protect, changePassword);
router.post("/logout", protect, logout);

export default router;