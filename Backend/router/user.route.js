import express from "express";
import { changePassword, get, login, logout, register } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/get",protect,get);
router.put("/changePassword",protect,changePassword);
router.post("/logout",protect,logout);

export default router;


