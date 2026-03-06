import express from "express";
import { verifyAlumni, getPendingAlumni,deleteAlumni } from "../controller/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/pending-alumni", protect, getPendingAlumni);
router.put("/verify-alumni/:userId", protect, verifyAlumni);
router.delete(
  "/:id",
  protect,
  deleteAlumni
);

export default router;