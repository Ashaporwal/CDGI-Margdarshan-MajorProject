import express from "express";
import { body, param } from "express-validator";

import {
    createCampusDrive,
    getAllCampusDrives,
    getCampusDriveById,
    updateCampusDrive,
    deleteCampusDrive
} from "../controller/campusDrive.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post(
    "/",
    protect,

    body("companyName", "Company name is required").notEmpty(),

    body("jobRoles", "Job roles must be an array")
        .isArray({ min: 1 }),

    body("driveDate", "Valid drive date is required")
        .isISO8601(),

    body("location", "Location is required")
        .notEmpty(),

    validate,
    createCampusDrive
);

router.get("/", protect, getAllCampusDrives);


router.get(
    "/:id",
    protect,
    param("id", "Invalid ID").isMongoId(),
    validate,
    getCampusDriveById
);

router.put(
    "/:id",
    protect,
    param("id", "Invalid ID").isMongoId(),
    validate,
    updateCampusDrive
);


router.delete(
    "/:id",
    protect,
    param("id", "Invalid ID").isMongoId(),
    validate,
    deleteCampusDrive
);

export default router;