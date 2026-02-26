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
  "/",
  protect,
  body("title").notEmpty(),
  body("description").notEmpty(),
  validate,
  createNotice
);

router.get("/", protect, getAllNotices);


router.get(
  "/:id",
  protect,
  param("id").isMongoId(),
  validate,
  getNoticeById
);

router.put(
  "/:id",
  protect,
  param("id").isMongoId(),
  validate,
  updateNotice
);

router.delete(
  "/:id",
  protect,
  param("id").isMongoId(),
  validate,
  deleteNotice
);

export default router;