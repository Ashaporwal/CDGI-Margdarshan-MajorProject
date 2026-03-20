import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

// ── Cloudinary Config ──────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Event Poster Storage ───────────────────────────────
const posterStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:           "uploads/events",
    allowed_formats:  ["jpg", "jpeg", "png", "webp"],
    transformation:   [{ width: 800, quality: "auto" }],
  },
});

export const uploadPoster = multer({ storage: posterStorage });
export default cloudinary;