import express from "express";
import mongoose from "mongoose";
import userRoutes from "./router/user.route.js";
import studentRoutes from "./router/student.routes.js";
import jobRoutes from "./router/job.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

mongoose.connect(process.env.URL)
    .then(() => console.log("DB connected"))
    .catch(err => console.log("DB connection error:", err));

app.use('/user',userRoutes);
app.use('/user/student',studentRoutes);
app.use('/user/job',jobRoutes);
// app.use('/student',studentRoutes);

app.listen(5000, () => console.log("Server started"));