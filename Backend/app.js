import express from "express";
import mongoose from "mongoose";


const app = express();
 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/cdgiMargdarshan").then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
 

    
app.listen(3000, () => console.log("Server started"));