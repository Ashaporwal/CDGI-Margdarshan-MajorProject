import express from "express";
import { verifyAlumni, getPendingAlumni } from "../controller/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {
    getAllStudents,
    updateStudentStatus,
    deleteStudent
} from "../controller/admin.controller.js";

const router = express.Router();

router.get("/pending-alumni", protect, getPendingAlumni);
router.put("/verify-alumni/:userId", protect, verifyAlumni);


router.get("/students", protect, getAllStudents);

router.patch("/student-status/:id", protect, updateStudentStatus);

router.delete("/student/:id", protect, deleteStudent);
export default router;