import { useEffect, useState } from "react";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    name: "",
     firstName: "",   // ✅ add this
  lastName: "", 
    email: "",
    department: "",
    graduationYear: "",
    photo: null,
  });

  const departments = [
    "Computer Science Engineering (CSE)",
    "Information Technology (IT)",
    "Electronics & Communication (EC)",
    "Electrical Engineering (EE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Artificial Intelligence (AI)",
    "Data Science (DS)",
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 2006 + 5 },
    (_, i) => 2006 + i
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/get");
        setForm(res.data.user);

        if (res.data.user.photo) {
          setPreview(
            `http://localhost:3000/uploads/${res.data.user.photo}`
          );
        }
      } catch {
        toast.error("Failed to load profile");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("department", form.department);
    formData.append("graduationYear", form.graduationYear);

    if (form.photo instanceof File) {
      formData.append("photo", form.photo);
    }

    try {
      await API.put("/profile", formData);
      toast.success("Profile updated 🎉");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <>
   <style>{`
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #003366, #00509e);
  }

  .profile-wrapper {
    display: flex;
    gap: 30px;
    padding: 40px;
  }

  /* LEFT CARD */
  .profile-card {
    width: 30%;
    background: #ffffff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
    text-align: center;
    transition: 0.3s ease;
  }

  .profile-card:hover {
    transform: translateY(-5px);
  }

  .profile-card img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #00509e;
    margin-bottom: 15px;
    transition: 0.3s;
  }

  .profile-card img:hover {
    transform: scale(1.05);
  }

  .profile-card h3 {
    margin: 10px 0 5px;
    color: #003366;
    font-weight: 600;
  }

  .profile-card p {
    margin: 4px 0;
    color: #555;
    font-size: 14px;
  }

  .profile-card input {
    margin-top: 10px;
    font-size: 14px;
  }

  /* RIGHT PANEL */
  .profile-right {
    flex: 1;
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
  }

  .profile-right h2 {
    margin-bottom: 20px;
    color: #003366;
    font-weight: 600;
  }

  input, select {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 6px;
    border: 1px solid #ccc;
    transition: 0.3s;
    font-size: 14px;
  }

  input:focus, select:focus {
    border-color: #00509e;
    box-shadow: 0 0 6px rgba(0, 80, 158, 0.4);
    outline: none;
  }

  button {
    padding: 12px 20px;
    background: #003366;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 15px;
    transition: 0.3s ease;
  }

  button:hover {
    background: #002244;
    transform: translateY(-2px);
  }
`}</style>

      <div className="profile-wrapper">
        <div className="profile-card">
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
          />
<h3>{form.firstName} {form.lastName}</h3>
<p>@{form.name}</p>
          <p>{form.department}</p>
          <p>Batch {form.graduationYear}</p>
          <p>{form.email}</p>

          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="profile-right">
          <h2>Edit Profile</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              name="graduationYear"
              value={form.graduationYear}
              onChange={handleChange}
            >
              <option value="">Select Graduation Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <button type="submit">Save Changes</button>
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