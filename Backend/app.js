import express from "express";
import mongoose from "mongoose";
import userRoutes from "./router/user.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.URL)
    .then(() => console.log("DB connected"))
    .catch(err => console.log("DB connection error:", err));

app.use('/user',userRoutes);
 

app.listen(3000, () => console.log("Server started"));