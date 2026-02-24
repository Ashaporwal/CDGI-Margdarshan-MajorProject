import express from "express";
import mongoose from "mongoose";
<<<<<<< HEAD
import userRoutes from "./router/user.route.js";
import dotenv from "dotenv";
import cors from "cors";

=======
import bodyParser from "body-parser";
import jobRouter from "./router/job.routes.js";
import userRouter from "./router/user.routes.js";
import adminRouter from "./router/admin.routes.js"
import alumniRouter from "./router/alumni.routes.js";
import dotenv from "dotenv";
>>>>>>> origin/main
dotenv.config();

const app = express();

<<<<<<< HEAD
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
 
=======
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
>>>>>>> origin/main

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
