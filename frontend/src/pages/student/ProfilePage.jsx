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
//   const [loading, setLoading] = useState(true);

//   const [personal, setPersonal] = useState({ firstName: "", lastName: "", email: "", phone: "" });
//   const [academic, setAcademic] = useState({ rollNumber: "", department: "", batch: "", cgpa: "", address: "" });
//   const [skills, setSkills] = useState("");
//   const [socialLinks, setSocialLinks] = useState({ linkedin: "", github: "", portfolio: "" });
//   const [profileFile, setProfileFile] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [profilePreview, setProfilePreview] = useState(null);
//   const [resumePreview, setResumePreview] = useState(null);

//   // ================= FETCH PROFILE ON PAGE LOAD =================
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await API.get("/student/full-profile");
//         const user = data.user;
//         const profile = data.studentProfile;

//         setPersonal({
//           firstName: user?.firstName || "",
//           lastName: user?.lastName || "",
//           email: user?.email || "",
//           phone: user?.phone || "",
//         });

//         setAcademic({
//           rollNumber: profile?.enrollmentNumber || "",
//           department: profile?.course || "",
//           batch: profile?.yearOfStudy || "",
//           cgpa: profile?.cgpa || "",
//           address: profile?.address || "",
//         });

//         setSkills(profile?.skills || "");
//         setSocialLinks({
//           linkedin: profile?.linkedin || "",
//           github: profile?.github || "",
//           portfolio: profile?.portfolio || "",
//         });

//         setProfilePreview(profile?.profilePic || null);
//         setResumePreview(profile?.resume || null);

//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         toast.error("Failed to load profile");
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // ================= SAVE PROFILE =================
//   const handleSaveChanges = async () => {
//     try {
//       // ===== USER UPDATE =====
//       const userForm = new FormData();
//       userForm.append("firstName", personal.firstName);
//       userForm.append("lastName", personal.lastName);
//       userForm.append("phone", personal.phone);
//       if (profileFile) userForm.append("profilePic", profileFile);

//       await API.put("/profile", userForm, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // ===== STUDENT UPDATE =====
//       const studentForm = new FormData();
//       studentForm.append("enrollmentNumber", academic.rollNumber);
//       studentForm.append("course", academic.department);
//       studentForm.append("yearOfStudy", academic.batch);
//       studentForm.append("cgpa", academic.cgpa);
//       studentForm.append("address", academic.address);
//       studentForm.append("skills", skills);
//       studentForm.append("linkedin", socialLinks.linkedin);
//       studentForm.append("github", socialLinks.github);
//       studentForm.append("portfolio", socialLinks.portfolio);
//       if (resumeFile) studentForm.append("resume", resumeFile);

//       await API.put("/student/profile", studentForm, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (profileFile) setProfilePreview(URL.createObjectURL(profileFile));
//       if (resumeFile) setResumePreview(resumeFile.name);

//       toast.success("Profile Updated Successfully");
//     } catch (err) {
//       console.log(err);
//       toast.error("Update Failed");
//     }
//   };

//   const toggleTheme = () => setDarkTheme(!darkTheme);
//   const handleLogout = () => { localStorage.clear(); navigate("/login"); };

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
//     { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
//     { name: "Applications", icon: <FaFileAlt />, path: "/applications" },
//     { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
//     { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/mentorship" },
//     { name: "Alumni Directory", icon: <FaUsers />, path: "/alumni-directory" },
//     { name: "Profile", icon: <FaUser />, path: "/profile" },
//   ];

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen text-gray-600">Loading Profile...</div>;
//   }

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
//           <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
//             Save
//           </button>
//         </div>

//         {/* Personal Info */}
//         <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" placeholder="First Name" value={personal.firstName} onChange={e => setPersonal({...personal, firstName: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="text" placeholder="Last Name" value={personal.lastName} onChange={e => setPersonal({...personal, lastName: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="email" placeholder="Email" value={personal.email} disabled className="p-2 border rounded-md w-full bg-gray-200"/>
//             <input type="text" placeholder="Phone" value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} className="p-2 border rounded-md w-full"/>
//           </div>
//         </div>

//         {/* Academic Info */}
//         <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" placeholder="Enrollment Number" value={academic.rollNumber} onChange={e => setAcademic({...academic, rollNumber: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="text" placeholder="Department" value={academic.department} onChange={e => setAcademic({...academic, department: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="number" placeholder="Batch" value={academic.batch} onChange={e => setAcademic({...academic, batch: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="number" placeholder="CGPA" value={academic.cgpa} onChange={e => setAcademic({...academic, cgpa: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="text" placeholder="Address" value={academic.address} onChange={e => setAcademic({...academic, address: e.target.value})} className="p-2 border rounded-md w-full md:col-span-2"/>
//           </div>
//         </div>

//         {/* Skills */}
//         <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-4">Skills</h3>
//           <textarea placeholder="Skills" value={skills} onChange={e => setSkills(e.target.value)} className="p-2 border rounded-md w-full"></textarea>
//         </div>

//         {/* Profile Photo */}
//         <div className={`p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-4 ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Profile Photo</h3>
//             {profilePreview && <img src={profilePreview} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-2"/>}
//             <input type="file" onChange={e => setProfileFile(e.target.files[0])} />
//           </div>

//           {/* Resume */}
//           <div>
//             <h3 className="text-lg font-semibold mb-2">Resume</h3>
//             {resumePreview && <p>{resumePreview}</p>}
//             <input type="file" onChange={e => setResumeFile(e.target.files[0])} />
//           </div>
//         </div>

//         {/* Social Links */}
//         <div className={`p-6 rounded-2xl shadow-md ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//           <h3 className="text-lg font-semibold mb-4">Social Links</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input type="text" placeholder="LinkedIn" value={socialLinks.linkedin} onChange={e => setSocialLinks({...socialLinks, linkedin: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="text" placeholder="GitHub" value={socialLinks.github} onChange={e => setSocialLinks({...socialLinks, github: e.target.value})} className="p-2 border rounded-md w-full"/>
//             <input type="text" placeholder="Portfolio" value={socialLinks.portfolio} onChange={e => setSocialLinks({...socialLinks, portfolio: e.target.value})} className="p-2 border rounded-md w-full"/>
//           </div>
//         </div>

//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default ProfilePage;

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

