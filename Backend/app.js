import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jobRouter from "./router/job.routes.js";
import userRouter from "./router/user.routes.js";
import adminRouter from "./router/admin.routes.js"
import alumniRouter from "./router/alumni.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/app" , userRouter);
app.use("/app" , jobRouter);
app.use("/admin" , adminRouter);
app.use("/" , alumniRouter);

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
      console.log("Server started on port : " , process.env.PORT);
    });
  })
  .catch(error => {
    console.log("Database connection failed:", error);
  });
