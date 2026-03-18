import User from "../model/user.model.js";
import AlumniProfile from "../model/alumni.model.js";
import StudentProfile from "../model/student.model.js";

export const verifyAlumni = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "alumni") {
      return res.status(400).json({ message: "Not an alumni account" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "Alumni verified successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getPendingAlumni = async (req, res) => {
//   try {

//     const alumni = await AlumniProfile.find()
//       .populate({
//         path: "userId",
//         match: { role: "alumni" },
//         select: "name email department graduationYear isVerified"
//       });

//     const result = alumni
//       .filter(a => a.userId !== null)
//       .map(a => ({
//         id: a._id,

//         userId: a.userId._id,

//         name: a.userId.name,
//         email: a.userId.email,
//         department: a.userId.department,
//         batch: a.userId.graduationYear,

//         company: a.company,
//         designation: a.designation,
//         experienceYears: a.experienceYears,

//         status: a.userId.isVerified ? "Verified" : "Pending"
//       }));

//     res.status(200).json(result);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getPendingAlumni = async (req, res) => {
  try {

    // ✅ Step 1 — Sabhi alumni users fetch karo
    const alumniUsers = await User.find({ role: "alumni" })
      .select("name email department graduationYear isVerified")
      .sort({ createdAt: -1 });

    // ✅ Step 2 — Har user ka AlumniProfile bhi dhundo (agar hai toh)
    const result = await Promise.all(
      alumniUsers.map(async (u) => {
        const profile = await AlumniProfile.findOne({ userId: u._id });
        return {
          userId:          u._id,
          name:            u.name,
          email:           u.email,
          department:      u.department,
          batch:           u.graduationYear,
          company:         profile?.company        || null,
          designation:     profile?.designation    || null,
          experienceYears: profile?.experienceYears || 0,
          status:          u.isVerified ? "Verified" : "Pending"
        };
      })
    );

    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAlumni = async (req, res) => {
  try {
    await AlumniProfile.findOneAndDelete({ userId: req.params.userId });
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "Alumni removed" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};


// GET ALL STUDENTS (NO PAGINATION)
export const getAllStudents = async (req,res)=>{
  try{

    const students = await StudentProfile
      .find()
      .populate("userId","name email graduationYear department")
      .sort({createdAt:-1});

      const validStudents = students.filter((s) => s.userId !== null);

    res.status(200).json({
      profiles: validStudents
    });

  }catch(err){

    res.status(500).json({
      message:"Failed to fetch students"
    });

  }
};



// UPDATE STUDENT STATUS
export const updateStudentStatus = async (req,res)=>{
  try{

    const {status} = req.body;

    const student = await StudentProfile.findByIdAndUpdate(
      req.params.id,
      {placementStatus: status},
      {new:true}
    );

    res.status(200).json({
      message:"Student status updated",
      student
    });

  }catch(err){

    res.status(500).json({
      message:"Status update failed"
    });

  }
};



// DELETE STUDENT
export const deleteStudent = async (req,res)=>{
  try{

    await StudentProfile.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message:"Student deleted"
    });

  }catch(err){

    res.status(500).json({
      message:"Delete failed"
    });

  }
};



