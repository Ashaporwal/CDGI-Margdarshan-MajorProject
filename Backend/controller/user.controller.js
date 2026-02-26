import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//     try {
//         console.log(req.body);

//         const { name, email, password, role, department, graduationYear } = req.body;

//         if (!name || !email || !password || !role || !department || !graduationYear) {
//             return res.status(400).json({ message: "all things are required" });
//         }

//         if (role !== "admin" && !graduationYear) {
//             return res.status(400).json({ message: "Graduation year is required for student /alumni" })
//         }
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: "Email already registered" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({ name, email, password: hashedPassword, role, department, graduationYear });
//         const token = jwt.sign({ id: user._id }, process.env.JWT || "secretkey", { expiresIn: '7d' });

//         res.status(201).json({ message: "User regustered successfully",token});
//     } catch (err) {
//         console.log("register error:", err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
export const register = async (req, res) => {
  try {
    const {
      name,
      firstName,
      lastName,
      email,
      password,
      role,
      department,
      graduationYear,
    } = req.body;

    // 🔹 Basic validation
    if (!name || !firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    // 🔹 Role based validation
    if (role === "student") {
      if (!department || !graduationYear) {
        return res
          .status(400)
          .json({ message: "Department and graduation year required for student" });
      }
    }

    if (role === "alumni") {
      if (!graduationYear) {
        return res
          .status(400)
          .json({ message: "Graduation year required for alumni" });
      }
    }

    // 🔹 Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const user = await User.create({
      name,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      department,
      graduationYear,
      isVerified: role === "student" ? true : false,
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log("Register error:", err);
    res.status(500).json({ message: "Server error" });
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

         if (user.role === "alumni" && !user.isVerified) {
            return res.status(403).json({
                message: "Wait for admin approval"
            });
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
        const user = await User.findById(req.user._id).select("-password");
        return res.status(200).json({ user });
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

        // const user = await User.findById(req.user._id);
            const user = await User.findById(req.user.id);

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
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.log("Logout error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.department) user.department = req.body.department;
    if (req.body.graduationYear)
      user.graduationYear = req.body.graduationYear;

    if (req.file) {
      user.photo = req.file.filename;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};