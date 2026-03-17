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

export const getPendingAlumni = async (req, res) => {
  try {

    const alumni = await AlumniProfile.find()
      .populate({
        path: "userId",
        match: { role: "alumni" },
        select: "name email department graduationYear isVerified"
      });

    const result = alumni
      .filter(a => a.userId !== null)
      .map(a => ({
        id: a._id,

        userId: a.userId._id,

        name: a.userId.name,
        email: a.userId.email,
        department: a.userId.department,
        batch: a.userId.graduationYear,

        company: a.company,
        designation: a.designation,
        experienceYears: a.experienceYears,

        status: a.userId.isVerified ? "Verified" : "Pending"
      }));

    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
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
      {status},
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

// export const getPendingAlumni = async (req, res) => {
//   try {

//     const alumni = await User.find({
//       role: "alumni",
//       isVerified: false
//     }).select("name email department graduationYear");

//     res.status(200).json(alumni);

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


