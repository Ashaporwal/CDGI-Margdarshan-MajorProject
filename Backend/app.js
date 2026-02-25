import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./router/user.routes.js";
import jobRouter from "./router/job.routes.js";
import adminRouter from "./router/admin.routes.js";
import alumniRouter from "./router/alumni.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static("uploads"));


app.use("/api/user", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/admin", adminRouter);
app.use("/api/alumni", alumniRouter);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("Server started on port:", process.env.PORT);
    });
  })
  .catch(error => {
    console.log("Database connection failed:", error);
  });