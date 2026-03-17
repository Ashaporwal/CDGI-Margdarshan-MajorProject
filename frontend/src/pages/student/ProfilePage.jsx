// import { useState, useEffect } from "react";
// import API from "../../services/api";
// import { toast } from "react-toastify";
// import Profile from "./Profile";
// import {
//   FaGraduationCap,
//   FaFileAlt,
//   FaLink
// } from "react-icons/fa";

// function ProfilePage() {

//   const [profile, setProfile] = useState({
//     rollNumber: "",
//     department: "",
//     batch: "",
//     cgpa: "",
//     address: "",
//     linkedin: "",
//     github: "",
//     portfolio: "",
//     skills: []
//   });

//   const [resume, setResume] = useState(null);
//   const [resumeUrl, setResumeUrl] = useState(null);

//   useEffect(() => {

//     fetchProfile();

//   }, []);

//   const fetchProfile = async () => {

//     try {

//       const { data } = await API.get("/api/student/full-profile");

//       const student = data.studentProfile;

//       setProfile({
//         rollNumber: student?.enrollmentNumber || "",
//         department: student?.course || "",
//         batch: student?.yearOfStudy || "",
//         cgpa: student?.cgpa || "",
//         address: student?.address || "",
//         linkedin: student?.linkedin || "",
//         github: student?.github || "",
//         portfolio: student?.portfolio || "",
//         skills: student?.skills || []
//       });

//       setResumeUrl(student?.resumeUrl);

//     } catch {

//       toast.error("Failed to load profile");

//     }

//   };

//   const handleChange = (e) => {

//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value
//     });

//   };

//   const handleSave = async () => {

//     try {

//       await API.put("/api/student/profile", {
//         ...profile
//       });

//       if (resume) {

//         const formData = new FormData();
//         formData.append("resume", resume);

//         const { data } = await API.put("/api/student/upload-resume", formData);

//         setResumeUrl(data.resumeUrl);

//       }

//       toast.success("Profile updated");

//     } catch {

//       toast.error("Update failed");

//     }

//   };

//   return (

//     <div className="space-y-6">

//       <Profile />


//      {/* PERSONAL INFORMATION */}

// <div className="bg-white rounded-xl shadow p-6">

//   <h2 className="font-semibold mb-4">
//     Personal Information
//   </h2>

//   <div className="grid grid-cols-2 gap-4">

//     <input
//       value={user?.name || ""}
//       readOnly
//       className="border p-3 rounded bg-gray-100"
//     />

//     <input
//       value={user?.email || ""}
//       readOnly
//       className="border p-3 rounded bg-gray-100"
//     />

//     <input
//       value={user?.department || ""}
//       readOnly
//       className="border p-3 rounded bg-gray-100"
//     />

//     <input
//       value={user?.graduationYear || ""}
//       readOnly
//       className="border p-3 rounded bg-gray-100"
//     />

//   </div>

// </div>

//       <div className="flex justify-between items-center">

//         <div>

//           <h1 className="text-2xl font-bold">
//             My Profile
//           </h1>

//           <p className="text-gray-500 text-sm">
//             Manage your profile information
//           </p>

//         </div>

//         <button
//           onClick={handleSave}
//           className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
//         >

//           Save Changes

//         </button>

//       </div>

//       {/* ACADEMIC INFO */}

//       <div className="bg-white rounded-xl shadow p-6">

//         <h2 className="flex items-center gap-2 font-semibold mb-4">

//           <FaGraduationCap className="text-purple-500" />

//           Academic Information

//         </h2>

//         <div className="grid grid-cols-2 gap-4">

//           <input
//             name="rollNumber"
//             placeholder="Roll Number"
//             value={profile.rollNumber}
//             onChange={handleChange}
//             className="border p-3 rounded"
//           />

//           <input
//             name="department"
//             placeholder="Department"
//             value={profile.department}
//             onChange={handleChange}
//             className="border p-3 rounded"
//           />

//           <input
//             name="batch"
//             placeholder="Batch Year"
//             value={profile.batch}
//             onChange={handleChange}
//             className="border p-3 rounded"
//           />

//           <input
//             name="cgpa"
//             placeholder="CGPA"
//             value={profile.cgpa}
//             onChange={handleChange}
//             className="border p-3 rounded"
//           />

//         </div>

//         <textarea
//           name="address"
//           placeholder="Address"
//           value={profile.address}
//           onChange={handleChange}
//           className="border p-3 rounded w-full mt-4"
//         />

//       </div>

//       {/* RESUME */}

//       <div className="bg-white rounded-xl shadow p-6">

//         <h2 className="flex items-center gap-2 font-semibold mb-4">

//           <FaFileAlt className="text-orange-500" />

//           Resume

//         </h2>

//         <div className="border-2 border-dashed p-8 text-center rounded-lg">

//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) => setResume(e.target.files[0])}
//           />

//           {resumeUrl && (
//             <div className="mt-3 flex items-center gap-3">
//               <span className="text-sm text-gray-600">
//                 Current Resume Uploaded
//               </span>

//               <a
//                 href={`http://localhost:3000/${resumeUrl}`}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 View Resume
//               </a>
//             </div>
//           )}

//         </div>

//       </div>

//       {/* SOCIAL LINKS */}

//       <div className="bg-white rounded-xl shadow p-6">

//         <h2 className="flex items-center gap-2 font-semibold mb-4">

//           <FaLink className="text-green-500" />

//           Social Links

//         </h2>

//         <div className="grid grid-cols-1 gap-4">

//           <input
//             name="linkedin"
//             placeholder="LinkedIn URL"
//             value={profile.linkedin}
//             onChange={handleChange}
//             className="border p-3 rounded"
//           />

//           <input
//             name="github"
//             placeholder="GitHub URL"
//             value={profile.github}
//             onChange={handleChange}
//             className="border p-3 rounded"
//           />

//           <input
//             name="portfolio"
//             placeholder="Portfolio URL"
//             value={profile.portfolio}
//             onChange={handleChange}
//             className="border p-3 rounded"
//           />

//         </div>

//       </div>

//     </div>

//   );

// }

// export default ProfilePage;
import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast ,ToastContainer} from "react-toastify";
import Profile from "./Profile";
import { FaGraduationCap, FaFileAlt, FaLink, FaUser } from "react-icons/fa";

function ProfilePage() {

  const [user, setUser] = useState(null);

  const [profile, setProfile] = useState({
    rollNumber: "",
    department: "",
    batch: "",
    cgpa: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const { data } = await API.get("/api/student/full-profile");

      setUser(data.user);

      const student = data.studentProfile;

      setProfile({
        rollNumber: student?.enrollmentNumber || "",
        department: student?.course || "",
        batch: student?.yearOfStudy || "",
        cgpa: student?.cgpa || "",
        address: student?.address || "",
        linkedin: student?.linkedin || "",
        github: student?.github || "",
        portfolio: student?.portfolio || "",
      });

      setResumeUrl(student?.resumeUrl);

    } catch {
      toast.error("Failed to load profile");
    }

  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {

    try {

      await API.put("/api/student/profile", profile);

      if (resume) {

        const formData = new FormData();
        formData.append("resume", resume);

        const { data } = await API.put("/api/student/upload-resume", formData);

        setResumeUrl(data.resumeUrl);
      }

      toast.success("Profile updated");

    } catch {
      toast.error("Update failed");
    }

  };

  return (

    <div className="space-y-6">

      <Profile />

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
          Save Changes
        </button>

      </div>

      {/* PERSONAL INFORMATION */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 font-semibold mb-4">
          <FaUser className="text-blue-500"/>
          Personal Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input
              value={user?.name || ""}
              readOnly
              className="border p-3 rounded w-full bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="border p-3 rounded w-full bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Department</label>
            <input
              value={user?.department || ""}
              readOnly
              className="border p-3 rounded w-full text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Graduation Year</label>
            <input
              value={user?.graduationYear || ""}
              readOnly
              className="border p-3 rounded w-full text-gray-500 cursor-not-allowed"
            />
          </div>

        </div>

      </div>

      {/* ACADEMIC INFORMATION */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 font-semibold mb-4">
          <FaGraduationCap className="text-purple-500"/>
          Academic Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">Roll Number</label>
            <input
              name="rollNumber"
              value={profile.rollNumber}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">CGPA</label>
            <input
              name="cgpa"
              value={profile.cgpa}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

        </div>

        <div className="mt-4">
          <label className="text-sm text-gray-600">Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>

      </div>

      {/* RESUME */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 font-semibold mb-4">
          <FaFileAlt className="text-orange-500"/>
          Resume
        </h2>

        <div className="border-2 border-dashed p-8 text-center rounded-lg">

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />

          {resumeUrl && (
            <div className="mt-3">
              <a
                href={`http://localhost:3000/${resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Uploaded Resume
              </a>
            </div>
          )}

        </div>

      </div>

      {/* SOCIAL LINKS */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="flex items-center gap-2 font-semibold mb-4">
          <FaLink className="text-green-500"/>
          Social Links
        </h2>

        <div className="grid grid-cols-1 gap-4">

          <div>
            <label className="text-sm text-gray-600">LinkedIn</label>
            <input
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">GitHub</label>
            <input
              name="github"
              value={profile.github}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Portfolio</label>
            <input
              name="portfolio"
              value={profile.portfolio}
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

        </div>

      </div>
<ToastContainer/>
    </div>

  );
 

}

export default ProfilePage;