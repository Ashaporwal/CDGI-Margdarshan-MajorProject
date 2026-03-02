import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

import {
  FaTachometerAlt,
  FaBriefcase,
  FaFileAlt,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUsers,
  FaUser,
  FaBell,
  FaSun,
  FaMoon,
  FaUpload,
  FaSignOutAlt,
} from "react-icons/fa";

function ProfilePage() {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(false);
  const [loading, setLoading] = useState(true);

  const [personal, setPersonal] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [academic, setAcademic] = useState({ rollNumber: "", department: "", batch: "", cgpa: "", address: "" });
  const [skills, setSkills] = useState("");
  const [socialLinks, setSocialLinks] = useState({ linkedin: "", github: "", portfolio: "" });
  const [profileFile, setProfileFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  // ================= FETCH PROFILE ON PAGE LOAD =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/student/full-profile");
        const user = data.user;
        const profile = data.studentProfile;

        setPersonal({
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          phone: user?.phone || "",
        });

        setAcademic({
          rollNumber: profile?.enrollmentNumber || "",
          department: profile?.course || "",
          batch: profile?.yearOfStudy || "",
          cgpa: profile?.cgpa || "",
          address: profile?.address || "",
        });

        setSkills(profile?.skills || "");
        setSocialLinks({
          linkedin: profile?.linkedin || "",
          github: profile?.github || "",
          portfolio: profile?.portfolio || "",
        });

        setProfilePreview(profile?.profilePic || null);
        setResumePreview(profile?.resume || null);

        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= SAVE PROFILE =================
  const handleSaveChanges = async () => {
    try {
      // ===== USER UPDATE =====
      const userForm = new FormData();
      userForm.append("firstName", personal.firstName);
      userForm.append("lastName", personal.lastName);
      userForm.append("phone", personal.phone);
      if (profileFile) userForm.append("profilePic", profileFile);

      await API.put("/profile", userForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ===== STUDENT UPDATE =====
      const studentForm = new FormData();
      studentForm.append("enrollmentNumber", academic.rollNumber);
      studentForm.append("course", academic.department);
      studentForm.append("yearOfStudy", academic.batch);
      studentForm.append("cgpa", academic.cgpa);
      studentForm.append("address", academic.address);
      studentForm.append("skills", skills);
      studentForm.append("linkedin", socialLinks.linkedin);
      studentForm.append("github", socialLinks.github);
      studentForm.append("portfolio", socialLinks.portfolio);
      if (resumeFile) studentForm.append("resume", resumeFile);

      await API.put("/student/profile", studentForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (profileFile) setProfilePreview(URL.createObjectURL(profileFile));
      if (resumeFile) setResumePreview(resumeFile.name);

      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  const toggleTheme = () => setDarkTheme(!darkTheme);
  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { name: "Applications", icon: <FaFileAlt />, path: "/applications" },
    { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
    { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/mentorship" },
    { name: "Alumni Directory", icon: <FaUsers />, path: "/alumni-directory" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading Profile...</div>;
  }

  return (
    <div className={`min-h-screen flex ${darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <div className={`w-64 shadow-lg p-6 flex flex-col justify-between fixed h-screen ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-8">Campus Connect</h2>
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.name} onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium hover:bg-violet-100 transition duration-200 ${item.name === "Profile" ? "bg-violet-50 text-violet-600" : ""}`}>
                {item.icon}<span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition duration-300">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-10 space-y-8 overflow-y-auto">

        {/* Navbar */}
        <div className={`flex justify-between items-center mb-6 ${darkTheme ? "bg-gray-800 text-white p-4 rounded-2xl shadow-md" : "bg-white p-4 rounded-2xl shadow-md"}`}>
          <h2 className="text-xl font-semibold text-violet-600">My Profile</h2>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme}>{darkTheme ? <FaSun /> : <FaMoon />}</button>
            <FaBell />
            <span>{personal.firstName}</span>
          </div>
        </div>

        {/* Profile Summary */}
        <div className={`rounded-2xl shadow-xl p-8 flex justify-between items-center ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold">
              {personal.firstName?.charAt(0)}{personal.lastName?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{personal.firstName} {personal.lastName}</h2>
              <p className="text-gray-500">{academic.department} • Batch {academic.batch}</p>
              <p className="text-gray-500">{personal.email}</p>
              <p className="text-gray-500">{personal.phone}</p>
            </div>
          </div>
          <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
            Save
          </button>
        </div>

        {/* Personal Info */}
        <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" value={personal.firstName} onChange={e => setPersonal({...personal, firstName: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="text" placeholder="Last Name" value={personal.lastName} onChange={e => setPersonal({...personal, lastName: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="email" placeholder="Email" value={personal.email} disabled className="p-2 border rounded-md w-full bg-gray-200"/>
            <input type="text" placeholder="Phone" value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} className="p-2 border rounded-md w-full"/>
          </div>
        </div>

        {/* Academic Info */}
        <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Enrollment Number" value={academic.rollNumber} onChange={e => setAcademic({...academic, rollNumber: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="text" placeholder="Department" value={academic.department} onChange={e => setAcademic({...academic, department: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="number" placeholder="Batch" value={academic.batch} onChange={e => setAcademic({...academic, batch: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="number" placeholder="CGPA" value={academic.cgpa} onChange={e => setAcademic({...academic, cgpa: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="text" placeholder="Address" value={academic.address} onChange={e => setAcademic({...academic, address: e.target.value})} className="p-2 border rounded-md w-full md:col-span-2"/>
          </div>
        </div>

        {/* Skills */}
        <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <textarea placeholder="Skills" value={skills} onChange={e => setSkills(e.target.value)} className="p-2 border rounded-md w-full"></textarea>
        </div>

        {/* Profile Photo */}
        <div className={`p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-4 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Profile Photo</h3>
            {profilePreview && <img src={profilePreview} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-2"/>}
            <input type="file" onChange={e => setProfileFile(e.target.files[0])} />
          </div>

          {/* Resume */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Resume</h3>
            {resumePreview && <p>{resumePreview}</p>}
            <input type="file" onChange={e => setResumeFile(e.target.files[0])} />
          </div>
        </div>

        {/* Social Links */}
        <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="LinkedIn" value={socialLinks.linkedin} onChange={e => setSocialLinks({...socialLinks, linkedin: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="text" placeholder="GitHub" value={socialLinks.github} onChange={e => setSocialLinks({...socialLinks, github: e.target.value})} className="p-2 border rounded-md w-full"/>
            <input type="text" placeholder="Portfolio" value={socialLinks.portfolio} onChange={e => setSocialLinks({...socialLinks, portfolio: e.target.value})} className="p-2 border rounded-md w-full"/>
          </div>
        </div>

      </div>

      <ToastContainer />
    </div>
  );
}

export default ProfilePage;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import API from "../../services/api";
// import "react-toastify/dist/ReactToastify.css";

// import {
//   FaTachometerAlt,
//   FaBriefcase,
//   FaFileAlt,
//   FaCalendarAlt,
//   FaChalkboardTeacher,
//   FaUsers,
//   FaUser,
//   FaBell,
//   FaSun,
//   FaMoon,
//   FaUpload,
//   FaSignOutAlt,
// } from "react-icons/fa";

// function ProfilePage() {
//   const navigate = useNavigate();
//   const [darkTheme, setDarkTheme] = useState(false);
//   const [user, setUser] = useState(null);

//   const [personal, setPersonal] = useState({ firstName: "", lastName: "", email: "", phone: "" });
//   const [academic, setAcademic] = useState({ rollNumber: "", department: "", batch: "", cgpa: "", address: "" });
//   const [skills, setSkills] = useState("");
//   const [socialLinks, setSocialLinks] = useState({ linkedin: "", github: "", portfolio: "" });
//   const [resumeFile, setResumeFile] = useState(null);
//   const [profileFile, setProfileFile] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       setPersonal({
//         firstName: storedUser.firstName || "",
//         lastName: storedUser.lastName || "",
//         email: storedUser.email || "",
//         phone: storedUser.phone || "",
//       });
//       setAcademic({
//         rollNumber: storedUser.rollNumber || "",
//         department: storedUser.department || "",
//         batch: storedUser.batch || "",
//         cgpa: storedUser.cgpa || "",
//         address: storedUser.address || "",
//       });
//       setSkills(storedUser.skills || "");
//       setSocialLinks({
//         linkedin: storedUser.linkedin || "",
//         github: storedUser.github || "",
//         portfolio: storedUser.portfolio || "",
//       });
//     }
//   }, []);

//   const toggleTheme = () => setDarkTheme(!darkTheme);
//   const handleLogout = () => { localStorage.clear(); navigate("/login"); };

//   const handleSaveChanges = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("personal", JSON.stringify(personal));
//       formData.append("academic", JSON.stringify(academic));
//       formData.append("skills", skills);
//       formData.append("socialLinks", JSON.stringify(socialLinks));
//       if (resumeFile) formData.append("resume", resumeFile);
//       if (profileFile) formData.append("profilePic", profileFile);

//       const { data } = await API.put("/profile", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Profile Updated Successfully");
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setUser(data.user);
//     } catch (err) {
//       toast.error("Update Failed");
//     }
//   };

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
//     { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
//     { name: "Applications", icon: <FaFileAlt />, path: "/applications" },
//     { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
//     { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/mentorship" },
//     { name: "Community", icon: <FaUsers />, path: "/community" },
//     { name: "Profile", icon: <FaUser />, path: "/profile" },
//   ];

//   return (
//     <div className={`min-h-screen flex ${darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>

//       {/* Sidebar */}
//       <div className={`w-64 shadow-lg p-6 flex flex-col justify-between fixed h-screen ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//         <div>
//           <h2 className="text-2xl font-bold text-violet-600 mb-8">Campus Connect</h2>
//           <ul className="space-y-2">
//             {menuItems.map(item => (
//               <li key={item.name} onClick={() => navigate(item.path)}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium hover:bg-violet-100 transition duration-200 ${item.name === "Profile" ? "bg-violet-50 text-violet-600" : ""}`}>
//                 {item.icon}<span>{item.name}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <button onClick={handleLogout} className="flex items-center justify-center gap-2 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition duration-300">
//           <FaSignOutAlt /> Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-10 space-y-8 overflow-y-auto">

//         {/* Navbar */}
//         <div className={`flex justify-between items-center mb-6 ${darkTheme ? "bg-gray-800 text-white p-4 rounded-2xl shadow-md" : "bg-white p-4 rounded-2xl shadow-md"}`}>
//           <h2 className="text-xl font-semibold text-violet-600">My Profile</h2>
//           <div className="flex items-center gap-4">
//             <button onClick={toggleTheme}>{darkTheme ? <FaSun /> : <FaMoon />}</button>
//             <FaBell />
//             <span>{personal.firstName}</span>
//           </div>
//         </div>

//         {/* Profile Summary */}
//         <div className={`rounded-2xl shadow-xl p-8 flex justify-between items-center ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <div className="flex items-center gap-6">
//             <div className="w-20 h-20 rounded-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold">
//               {personal.firstName?.charAt(0)}{personal.lastName?.charAt(0)}
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold">{personal.firstName} {personal.lastName}</h2>
//               <p className="text-gray-500">{academic.department} • Batch {academic.batch}</p>
//               <p className="text-gray-500">{personal.email}</p>
//               <p className="text-gray-500">{personal.phone}</p>
//             </div>
//           </div>
//           <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">Save</button>
//         </div>

//         {/* Personal Info */}
//         <div className={`rounded-2xl shadow-xl p-8 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
//           <div className="grid grid-cols-2 gap-6">
//             <input className="input-style" value={personal.firstName} onChange={(e)=>setPersonal({...personal, firstName:e.target.value})} placeholder="First Name"/>
//             <input className="input-style" value={personal.lastName} onChange={(e)=>setPersonal({...personal, lastName:e.target.value})} placeholder="Last Name"/>
//             <input className="input-style" value={personal.email} onChange={(e)=>setPersonal({...personal, email:e.target.value})} placeholder="Email"/>
//             <input className="input-style" value={personal.phone} onChange={(e)=>setPersonal({...personal, phone:e.target.value})} placeholder="Phone"/>
//           </div>
//         </div>

//         {/* Academic Info */}
//         <div className={`rounded-2xl shadow-xl p-8 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-6">Academic Information</h3>
//           <div className="grid grid-cols-2 gap-6">
//             <input className="input-style" value={academic.rollNumber} onChange={(e)=>setAcademic({...academic, rollNumber:e.target.value})} placeholder="Roll Number"/>
//             <input className="input-style" value={academic.department} onChange={(e)=>setAcademic({...academic, department:e.target.value})} placeholder="Department"/>
//             <input className="input-style" value={academic.batch} onChange={(e)=>setAcademic({...academic, batch:e.target.value})} placeholder="Batch"/>
//             <input className="input-style" value={academic.cgpa} onChange={(e)=>setAcademic({...academic, cgpa:e.target.value})} placeholder="CGPA"/>
//           </div>
//           <textarea className="input-style w-full mt-6" value={academic.address} onChange={(e)=>setAcademic({...academic, address:e.target.value})} placeholder="Address"/>
//         </div>

//         {/* Skills */}
//         <div className={`rounded-2xl shadow-xl p-8 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-6">Skills & Expertise</h3>
//           <textarea className="input-style w-full" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="React, Node.js, MongoDB..."/>
//         </div>

//         {/* Profile Photo Upload */}
//         <div className={`rounded-2xl shadow-xl p-8 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><FaUser /> Profile Photo</h3>
//           <input type="file" accept="image/*" onChange={(e)=>setProfileFile(e.target.files[0])} className="input-style w-full"/>
//         </div>

//         {/* Resume Upload */}
//         <div className={`rounded-2xl shadow-xl p-8 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><FaUpload /> Resume Upload</h3>
//           <input type="file" onChange={(e)=>setResumeFile(e.target.files[0])} className="input-style w-full"/>
//         </div>

//         {/* Social Links */}
//         <div className={`rounded-2xl shadow-xl p-8 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-6">Social Links</h3>
//           <div className="grid grid-cols-1 gap-6">
//             <input className="input-style" value={socialLinks.linkedin} onChange={(e)=>setSocialLinks({...socialLinks, linkedin:e.target.value})} placeholder="LinkedIn URL"/>
//             <input className="input-style" value={socialLinks.github} onChange={(e)=>setSocialLinks({...socialLinks, github:e.target.value})} placeholder="GitHub URL"/>
//             <input className="input-style" value={socialLinks.portfolio} onChange={(e)=>setSocialLinks({...socialLinks, portfolio:e.target.value})} placeholder="Portfolio URL"/>
//           </div>
//         </div>

//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default ProfilePage;

// import { useState, useEffect } from "react";


// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import API from "../services/api";
// import "react-toastify/dist/ReactToastify.css";
// import { FaGraduationCap } from "react-icons/fa";

// import {
//   FaTachometerAlt, FaBriefcase, FaFileAlt, FaCalendarAlt,
//   FaChalkboardTeacher, FaUsers, FaUser, FaBell, FaSun, FaMoon,
//   FaEnvelope, FaUserAlt, FaBirthdayCake, FaUpload
// } from "react-icons/fa";

// function ProfilePage() {
//   const navigate = useNavigate();
//   const [darkTheme, setDarkTheme] = useState(false);
//   const [user, setUser] = useState(null);
//   const [personal, setPersonal] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     dob: "",
//     gender: "",
//   });

//   const [academic, setAcademic] = useState({
//   rollNumber: "",
//   department: "",
//   batch: "",
//   cgpa: "",
//   address: ""
// });




//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setPersonal({
//         firstName: parsedUser.firstName || "",
//         lastName: parsedUser.lastName || "",
//         email: parsedUser.email || "",
//         phone: parsedUser.phone || "",
//         dob: parsedUser.dob || "",
//         gender: parsedUser.gender || "",
//       });
//     }
//   }, []);

//   const toggleTheme = () => setDarkTheme(!darkTheme);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handlePersonalChange = (e) => {
//     setPersonal({ ...personal, [e.target.name]: e.target.value });
//   };

//   const handleSavePersonal = () => {
//     toast.info("Personal Information Saved! (API call can be implemented)");
//   };

//   const handleAcademicChange = (e) => {
//   setAcademic({ ...academic, [e.target.name]: e.target.value });
// };

// const handleSaveAcademic = () => {
//   toast.success("Academic Information Saved!");
// };


//   const handlePhotoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("photo", file);

//     try {
        
//       const { data } = await API.put("/profile", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       toast.success("Profile photo updated!");
//       setUser(data.user);
//       localStorage.setItem("user", JSON.stringify(data.user));
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response?.data?.message || "Photo update failed");
//     }
//   };

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
//     { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
//     { name: "Applications", icon: <FaFileAlt />, path: "/applications" },
//     { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
//     { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/mentorship" },
//     { name: "Alumni Directory", icon: <FaUsers />, path: "/alumni-directory" },
//     { name: "Profile", icon: <FaUser />, path: "/profile" },
//   ];

//   return (
//     <>
//       <div className="dashboard-container">
//         {/* Sidebar */}
//         <div className="left-panel">
//           <h2>Campus Connect</h2>
//           {menuItems.map((item) => (
//             <div key={item.name} className="menu-item" onClick={() => navigate(item.path)}>
//               {item.icon}
//               <span>{item.name}</span>
//             </div>
//           ))}
//           <button className="logout-button" onClick={handleLogout}>Logout</button>
//         </div>

//         {/* Right Panel */}
//         <div className="right-panel">
//           <div className="navbar">
//             <div className="navbar-left">
//               <h2>Campus Connect</h2>
//             </div>
//             <div className="navbar-right">
//               <button onClick={toggleTheme}>{darkTheme ? <FaSun /> : <FaMoon />}</button>
//               <button><FaBell /></button>
//               <div className="profile-section" onClick={() => navigate("/profile")}>
//                 <span style={{ fontWeight: "500" }}>{user?.name}</span>
           
//               </div>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="content-area">
//             <h2>My Profile</h2>
//             <p>Manage your profile information and preferences</p>

//             {/* Profile Card */}
//             <div className="profile-card">
//               <div className="save-action">
//                 <button onClick={() => toast.info("Save Changes clicked")} className="save-btn">Save Changes</button>
//               </div>

//               <div className="profile-left">
//                 {/* <img
//                   src={user?.photo ? `http://localhost:3000/uploads/${user.photo}` : "https://via.placeholder.com/90"}
//                   alt="profile"
//                   className="profile-main-pic"
//                 /> */}
//                 <label htmlFor="photo-upload" className="upload-icon">
//                   <FaUpload />
//                 </label>
//                 <input
//                   type="file"
//                   id="photo-upload"
//                   style={{ display: "none" }}
//                   onChange={handlePhotoChange}
//                 />
//               </div>

//               <div className="profile-right">
//                 <p className="profile-info"><strong>Name:</strong> {user?.name}</p>
//                 <p className="profile-info"><FaEnvelope /> {user?.email}</p>
//                 <p className="profile-info"><strong>Batch:</strong> {user?.graduationYear}</p>
//               </div>
//             </div>

//             {/* Personal Info Card */}
//             <div className="personal-card">
//               <div className="card-icon-wrapper">
//                 <FaUserAlt className="card-icon"/>
//               </div>
//               <div className="personal-form">
//                 <div className="personal-row">
//                   <input type="text" name="firstName" placeholder="First Name" value={personal.firstName} onChange={handlePersonalChange}/>
//                   <input type="text" name="lastName" placeholder="Last Name" value={personal.lastName} onChange={handlePersonalChange}/>
//                 </div>
//                 <div className="personal-row">
//                   <input type="email" name="email" placeholder="Email" value={personal.email} onChange={handlePersonalChange}/>
//                   <input type="text" name="phone" placeholder="Phone Number" value={personal.phone} onChange={handlePersonalChange}/>
//                 </div>
//                 <div className="personal-row">
//                   <input type="date" name="dob" value={personal.dob} onChange={handlePersonalChange}/>
//                   <select name="gender" value={personal.gender} onChange={handlePersonalChange}>
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 {/* <button className="save-btn-personal" onClick={handleSavePersonal}>Save Changes</button> */}
//               </div>
//             </div>
// {/* <h1>Additionsl info</h1> */}

// {/* Additional Information Card */}
// <div className="personal-card">
//   <div className="card-icon-wrapper">
//     <FaGraduationCap className="card-icon" />
//   </div>

//   <div className="personal-form">
//     <div className="personal-row">
//       <input
//         type="text"
//         name="rollNumber"
//         placeholder="Roll Number"
//         value={academic.rollNumber}
//         onChange={handleAcademicChange}
//       />
//       <input
//         type="text"
//         name="department"
//         placeholder="Department"
//         value={academic.department}
//         onChange={handleAcademicChange}
//       />
//     </div>

//     <div className="personal-row">
//       <input
//         type="text"
//         name="batch"
//         placeholder="Batch"
//         value={academic.batch}
//         onChange={handleAcademicChange}
//       />
//       <input
//         type="text"
//         name="cgpa"
//         placeholder="CGPA"
//         value={academic.cgpa}
//         onChange={handleAcademicChange}
//       />
//     </div>

//     <div className="personal-row">
//       <textarea
//         name="address"
//         rows="3"
//         placeholder="Address"
//         value={academic.address}
//         onChange={handleAcademicChange}
//         style={{
//           flex: 1,
//           padding: "12px",
//           borderRadius: "8px",
//           border: "1px solid #ccc"
//         }}
//       />
//     </div>
//   </div>
// </div>

//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />

//       <style>{`
//         .dashboard-container { display:flex; min-height:100vh; font-family:'Segoe UI',Helvetica,sans-serif; }
//         .left-panel { width:260px; background:#fff; padding:20px; box-shadow:2px 0 5px rgba(0,0,0,0.1);}
//         .left-panel h2 { margin-bottom:25px; color:#00509e; }
//         .menu-item { display:flex; align-items:center; padding:12px; margin-bottom:10px; cursor:pointer; border-radius:6px; transition:0.3s; color:#333; font-weight:500;}
//         .menu-item:hover { background-color:#f2f2f2;}
//         .menu-item span { margin-left:12px;}
//         .logout-button { margin-top:20px; width:100%; padding:12px; border:none; border-radius:6px; background:#00509e; color:#fff; cursor:pointer; font-size:15px;}
//         .right-panel { flex:1; background-color:${darkTheme ? "#1f1f1f" : "#f5f6fa"}; display:flex; flex-direction:column;}
//         .navbar { height:60px; background-color:${darkTheme ? "#2c2c2c" : "#fff"}; display:flex; align-items:center; justify-content:space-between; padding:0 25px; box-shadow:0 2px 5px rgba(0,0,0,0.08);}
//         .navbar-left h2 { margin:0; color:${darkTheme ? "#fff" : "#00509e"};}
//         .navbar-right { display:flex; align-items:center;}
//         .navbar-right button { background:none; border:none; margin:0 12px; font-size:18px; cursor:pointer; color:${darkTheme ? "#fff" : "#333"};}
//         .profile-section { display:flex; align-items:center; cursor:pointer;}
//         .profile-img { width:38px; height:38px; border-radius:50%; object-fit:cover; margin-left:10px;}
//         .content-area { padding:30px; color:${darkTheme ? "#fff" : "#000"}; flex:1;}

//         /* Profile Card */
//         .profile-card { display:flex; background:#fff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.1); padding:15px 20px; width:95%; height:120px; gap:20px; align-items:center; position:relative; margin-bottom:20px;}
//         .save-action { position:absolute; top:10px; right:20px; }
//         .save-btn { padding:9.5px 12px; border:none; border-radius:6px; background:#003366; color:#fff; cursor:pointer; font-size:13px; margin-top: 35px }
//         .profile-left { flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; }
//         .profile-main-pic { width:90px; height:90px; border-radius:50%; object-fit:cover; }
//         .profile-right { flex:1; display:flex; flex-direction:column; justify-content:center; gap:12px; }
//         .profile-info { margin:0; color:grey; font-weight:500; font-size:14px; display:flex; align-items:center; gap:6px; }
//         .upload-icon { margin-top:6px; font-size:18px; color:#003366; cursor:pointer; display:inline-block; }

//         /* Personal Info Card */
//         .personal-card { display:flex; background:#fff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.1); padding:25px; gap:20px; margin-top:20px; align-items:flex-start; min-height:220px; }
//         .card-icon-wrapper { flex:0 0 40px; display:flex; justify-content:center; align-items:flex-start; margin-top:5px; }
//         .card-icon { font-size:28px; color:#003366; }
//         .personal-form {display:flex; flex-direction:column; gap:30px; }
//         .personal-row { display:flex; gap:20px; }
//         .personal-row input, .personal-row select { flex:1; padding:12px; border-radius:8px; border:1px solid #ccc; font-size: 14px; }
//         .save-btn-personal { align-self:flex-start; padding:6px 12px; border:none; border-radius:6px; background:#003366; color:#fff; cursor:pointer; font-size:13px; }
//       `}</style>
//     </>
//   );
// }

// export default ProfilePage;