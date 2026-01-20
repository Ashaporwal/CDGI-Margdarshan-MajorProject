import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, password, role, department, graduationYear } = req.body;

        if (!name || !email || !password || !role || !department || !graduationYear) {
            return res.status(400).json({ message: "all things are required" });
        }

        if (role !== "admin" && !graduationYear) {
            return res.status(400).json({ message: "Graduation year is required for student /alumni" })
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role, department, graduationYear });
        const token = jwt.sign({ id: user._id }, process.env.JWT || "secretkey", { expiresIn: '7d' });

        res.status(201).json({ message: "User regustered successfully",token});
    } catch (err) {
        console.log("register error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT || "secretkey",
            { expiresIn: "7d" }
        );
        res.status(200).json({ message: "Login successfull", token });
    }


    catch (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const get = async (req, res) => {
    try {
        return res.status(200).json({ user: req.user });
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({ message: "internal server error" });
    }
};


export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Old password and new passwod are required" });
        }

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "old password is incorrect " });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.status(200).json({ message: "password change successfully " });
    } catch (err) {
        console.group(err);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.status(200).json({message: "Logged out successfully"});
    } catch (err) {
        console.log("Logout error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
