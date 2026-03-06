import AlumniProfile from "../model/alumni.model.js";

/* CREATE PROFILE */
export const createAlumniProfile = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ USER:", req.user);
console.log("USER ROLE:", req.user.role);
    if (req.user.role !== "alumni") {
      return res.status(403).json({ message: "Only alumni allowed" });
    }

    const existing = await AlumniProfile.findOne({ userId: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await AlumniProfile.create({
      userId: req.user._id,
      ...req.body
    });

    res.status(201).json(profile);

  } catch (error) {
    // console.log(error);
    console.log("CREATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* GET MY PROFILE */
export const getMyAlumniProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOne({ userId: req.user._id })
      .populate("userId", "name email department graduationYear");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

       let profileObj = profile.toObject(); // mongoose document -> JS object
    if (profileObj.photo) {
      profileObj.photo = `http://localhost:5000/uploads/${profileObj.photo}`;
    }

    // res.status(200).json(profile);
    res.status(200).json(profileObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* UPDATE PROFILE */
export const updateAlumniProfile = async (req, res) => {
  try {
    const profile = await AlumniProfile.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updatedAlumniStatus = async(req,res)=>{
  try{

    if(req.user.role !== "admin"){
      return res.status(403).json({message:"only admin allowed"});
    } 
    const {status} = req.body;

    const alumni = await AlumniProfile.findByIdAndUpdate(
      req.params.id,
      {status},
      {new:true}

    );
    if(!alumni){
      return res.status(404).json({message:"alumni not found"});
    }
    res.status(200).json(alumni);
   }catch(error){
    console.log(error);
    return res.status(500).json({message:"internal server error",error});
  }
}

export const getAlumniById = async (req, res) => {
  try {

    const profile = await AlumniProfile.findById(req.params.id)
      .populate("userId", "name email department graduationYear");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ADMIN: GET ALL */
// export const getAllAlumniProfiles = async (req, res) => {
//   try {

//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin allowed" });
//     }

//     const profiles = await AlumniProfile.find()
//       .populate("userId", "name email department graduationYear");

//     res.status(200).json(profiles);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getAllAlumniProfiles = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    const page = Number(req.query.page) || 1;
    const limit = 10;

    const skip = (page - 1) * limit;

    const profiles = await AlumniProfile.find()
      .populate("userId", "name email department graduationYear")
      .skip(skip)
      .limit(limit);

    const total = await AlumniProfile.countDocuments();

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      profiles
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


// export const getAllAlumniProfiles = async (req, res) => {
//   try {

//     console.log("USER:", req.user);
//     console.log("ROLE:", req.user.role);

//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin allowed" });
//     }

//     const profiles = await AlumniProfile.find()
//       .populate("userId", "name email department graduationYear");

//     console.log("PROFILES:", profiles);  // 👈 add this

//     res.status(200).json(profiles);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };