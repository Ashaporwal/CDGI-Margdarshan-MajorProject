import { useState, useEffect } from "react";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ name: "", department: "", graduationYear: "" });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/get");
        setUser(data.user);
        setForm({
          name: data.user.name || "",
          department: data.user.department || "",
          graduationYear: data.user.graduationYear || "",
        });
      } catch (err) {
        toast.error("Failed to fetch user data");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setPhoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("department", form.department);
    formData.append("graduationYear", form.graduationYear);
    if (photo) formData.append("photo", photo);

    try {
API.put("profile", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
      toast.success(data.message);
      setUser(data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #003366, #00509e);
        }

        .auth-card {
          background: #ffffff;
          width: 450px;
          padding: 35px;
          border-radius: 12px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
          transition: 0.3s ease;
        }

        .auth-card input,
        .auth-card select {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }

        .auth-card button {
          width: 100%;
          padding: 12px;
          background: #003366;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .auth-card button:hover {
          background: #002244;
        }

        .auth-card h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #003366;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Update Profile</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
            />
            <input
              type="number"
              name="graduationYear"
              placeholder="Graduation Year"
              value={form.graduationYear}
              onChange={handleChange}
            />
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Profile;
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Profile() {
//   const [preview, setPreview] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     department: "",
//     graduationYear: "",
//     photo: "",
//   });

//   const departments = [
//     "Computer Science Engineering (CSE)",
//     "Information Technology (IT)",
//     "Electronics & Communication (EC)",
//     "Electrical Engineering (EE)",
//     "Mechanical Engineering (ME)",
//     "Civil Engineering (CE)",
//     "Artificial Intelligence (AI)",
//     "Data Science (DS)",
//   ];

//   const years = Array.from(
//     { length: new Date().getFullYear() - 2006 + 5 },
//     (_, i) => 2006 + i
//   );

//   // 🔥 Fetch user
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await API.get("/get");
//         const user = res.data.user;

//         setForm({
//           name: user.name || "",
//           email: user.email || "",
//           department: user.department || "",
//           graduationYear: user.graduationYear || "",
//           photo: user.photo || "",
//         });

//         setPreview(user.photo || null);
//       } catch (err) {
//         toast.error("Failed to load profile");
//       }
//     };

//     fetchUser();
//   }, []);

//   // 🔥 Input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔥 Image change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//       setForm({ ...form, photo: reader.result }); // base64 save
//     };
//     reader.readAsDataURL(file);
//   };

//   // 🔥 Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put("/profile", form);
//       toast.success("Profile updated successfully 🎉");
//     } catch (err) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           margin: 0;
//           font-family: 'Segoe UI', sans-serif;
//           background: linear-gradient(135deg, #e6f2ff, #f5faff);
//         }

//         .profile-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .profile-card {
//           width: 550px;
//           background: white;
//           padding: 40px;
//           border-radius: 15px;
//           box-shadow: 0 15px 35px rgba(0,0,0,0.1);
//         }

//         .profile-card h2 {
//           text-align: center;
//           margin-bottom: 25px;
//           color: #003366;
//         }

//         .profile-image {
//           text-align: center;
//           margin-bottom: 20px;
//         }

//         .profile-image img {
//           width: 120px;
//           height: 120px;
//           border-radius: 50%;
//           object-fit: cover;
//           border: 3px solid #003366;
//           margin-bottom: 10px;
//         }

//         input, select {
//           width: 100%;
//           padding: 12px;
//           margin-bottom: 15px;
//           border: 1px solid #ccc;
//           border-radius: 6px;
//         }

//         input:focus, select:focus {
//           outline: none;
//           border-color: #003366;
//           box-shadow: 0 0 5px rgba(0,51,102,0.3);
//         }

//         button {
//           width: 100%;
//           padding: 12px;
//           background: #003366;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           transition: 0.3s;
//         }

//         button:hover {
//           background: #002244;
//         }
//       `}</style>

//       <div className="profile-container">
//         <div className="profile-card">
//           <h2>My Profile</h2>

//           <div className="profile-image">
//             <img
//               src={
//                 preview ||
//                 "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               }
//               alt="Profile"
//             />
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//           </div>

//           <form onSubmit={handleSubmit}>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//             />

//             <input value={form.email} disabled />

//             <select
//               name="department"
//               value={form.department}
//               onChange={handleChange}
//             >
//               <option value="">Select Department</option>
//               {departments.map((dept, i) => (
//                 <option key={i} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="graduationYear"
//               value={form.graduationYear}
//               onChange={handleChange}
//             >
//               <option value="">Select Graduation Year</option>
//               {years.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>

//             <button type="submit">Update Profile</button>
//           </form>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

// export default Profile;