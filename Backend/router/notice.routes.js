import express from "express";
import { body, param } from "express-validator";
import {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice
} from "../controller/notice.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post(
  "/notice",
  protect,
  body("title").notEmpty(),
  body("description").notEmpty(),
  validate,
  createNotice
);

router.get("/notice", protect, getAllNotices);


router.get(
  "/notice/:id",
  protect,
  param("id").isMongoId(),
  validate,
  getNoticeById
);

router.put(
  "/notice/:id",
  protect,
  param("id").isMongoId(),
  validate,
  updateNotice
);

router.delete(
  "/notice/:id",
  protect,
  param("id").isMongoId(),
  validate,
  deleteNotice
);

export default router;