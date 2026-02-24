import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    name: "",        // auto-generated from firstName + lastName
    email: "",
    password: "",
    role: "student",
    department: "",
    graduationYear: "",
  });

  // Departments array
  const departments = [
    "Computer Science Engineering (CSE)",
    "Information Technology (IT)",
    "Electronics & Communication (EC)",
    "Electrical Engineering (EE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Artificial Intelligence (AI)",
    "Data Science (DS)"
  ];

  // Graduation years array
  const years = Array.from(
    { length: new Date().getFullYear() - 2006 + 5 },
    (_, i) => 2006 + i
  );

  // Update full name whenever firstName or lastName changes
  useEffect(() => {
    setForm(prev => ({ ...prev, name: `${prev.firstName} ${prev.lastName}`.trim() }));
  }, [form.firstName, form.lastName]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", form);
      localStorage.setItem("token", res.data.token);

      toast.success("Registration successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #003366, #00509e);
        }

        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .auth-card {
          background: #ffffff;
          width: 450px;
          padding: 35px;
          border-radius: 12px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
          transition: 0.3s ease;
        }

        .auth-card:hover {
          transform: translateY(-5px);
        }

        .auth-card h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #003366;
          font-weight: 600;
        }

        .auth-card input,
        .auth-card select {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          transition: 0.3s;
        }

        .auth-card input:focus,
        .auth-card select:focus {
          border-color: #00509e;
          box-shadow: 0 0 5px rgba(0, 80, 158, 0.4);
          outline: none;
        }

        .auth-card button {
          width: 100%;
          padding: 12px;
          background: #003366;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .auth-card button:hover {
          background: #002244;
        }

        .auth-card p {
          margin-top: 18px;
          text-align: center;
          font-size: 14px;
        }

        .auth-card a {
          color: #00509e;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-card a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <h2>B.Tech Registration</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="College Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              name="graduationYear"
              value={form.graduationYear}
              onChange={handleChange}
              required
            >
              <option value="">Select Graduation Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <button type="submit">Register</button>
          </form>

          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Register;

// import { useState } from "react";
// import API from "../services/api";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//     department: "",
//     graduationYear: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (role) => {
//     setForm({ ...form, role });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/register", form);
//       localStorage.setItem("token", res.data.token);
//       toast.success("Registration successful 🎉");
//       navigate("/dashboard");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <>
//       {/* 🎨 INTERNAL CSS */}
//       <style>{`
//         body {
//           background: linear-gradient(135deg, #f3f9ff, #e6f2ff);
//           font-family: "Segoe UI", Tahoma, sans-serif;
//         }

//         .auth-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .auth-card {
//           width: 580px;
//           background: #ffffff;
//           border-radius: 20px;
//           box-shadow: 0 18px 45px rgba(0, 140, 255, 0.15);
//           overflow: hidden;
//         }

//         /* 🔹 ROLE PANEL */
//         .role-panel {
//           display: flex;
//           background: #eef6ff;
//         }

//         .role-tab {
//           flex: 1;
//           padding: 20px;
//           text-align: center;
//           cursor: pointer;
//           font-weight: 600;
//           letter-spacing: 0.4px;
//           color: #5a6b7f;
//           transition: all 0.3s ease;
//         }

//         .role-tab.active {
//           background: linear-gradient(135deg, #6cb6ff, #9ad9ff);
//           color: #fff;
//         }

//         .form-content {
//           padding: 45px 50px;
//         }

//         .form-content h2 {
//           text-align: center;
//           margin-bottom: 36px;
//           color: #2c3e50;
//           font-size: 27px;
//         }

//         .form-content input,
//         .form-content select {
//           width: 100%;
//           padding: 15px;
//           margin-bottom: 20px;
//           border: 1px solid #d6e6f7;
//           border-radius: 12px;
//           font-size: 15px;
//           background: #fafdff;
//           transition: 0.2s;
//         }

//         .form-content input:focus,
//         .form-content select:focus {
//           outline: none;
//           border-color: #6cb6ff;
//           box-shadow: 0 0 0 4px rgba(108,182,255,0.25);
//         }

//         .form-content button {
//           width: 100%;
//           padding: 16px;
//           background: linear-gradient(135deg, #6cb6ff, #9ad9ff);
//           color: #fff;
//           border: none;
//           border-radius: 14px;
//           font-size: 18px;
//           font-weight: bold;
//           cursor: pointer;
//           margin-top: 18px;
//           transition: transform 0.2s, box-shadow 0.2s;
//         }

//         .form-content button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 22px rgba(108,182,255,0.4);
//         }

//         .auth-link {
//           text-align: center;
//           margin-top: 24px;
//           font-size: 14px;
//         }

//         .auth-link a {
//           color: #6cb6ff;
//           font-weight: 600;
//           text-decoration: none;
//         }

//         .note {
//           text-align: center;
//           margin-top: 14px;
//           font-size: 13px;
//           color: #7a8ca3;
//         }
//       `}</style>

//       {/* 🧾 UI */}
//       <div className="auth-container">
//         <div className="auth-card">

//           {/* 🔹 STUDENT / ALUMNI TABS */}
//           <div className="role-panel">
//             <div
//               className={`role-tab ${form.role === "student" ? "active" : ""}`}
//               onClick={() => handleRoleChange("student")}
//             >
//               Student
//             </div>
//             <div
//               className={`role-tab ${form.role === "alumni" ? "active" : ""}`}
//               onClick={() => handleRoleChange("alumni")}
//             >
//               Alumni
//             </div>
//           </div>

//           <div className="form-content">
//             <h2>{form.role === "student" ? "Student" : "Alumni"} Registration</h2>

//             <form onSubmit={handleSubmit}>
//               <input
//                 name="name"
//                 placeholder="Full Name"
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 name="email"
//                 placeholder="College Email"
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 required
//               />

//               {/* 🎓 Department */}
//               <select name="department" onChange={handleChange} required>
//                 <option value="">Select Department</option>
//                 <option value="IT">Information Technology</option>
//                 <option value="CS">Computer Science</option>
//                 <option value="AD">App Development</option>
//                 <option value="ME">Mechanical</option>
//                 <option value="CE">Civil</option>
//                 <option value="EC">Electronics</option>
//               </select>

//               {/* 📅 Batch */}
//               <select name="graduationYear" onChange={handleChange} required>
//                 <option value="">Select Passout Year</option>
//                 {Array.from({ length: 2029 - 2006 + 1 }, (_, i) => {
//                   const year = 2006 + i;
//                   return (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   );
//                 })}
//               </select>

//               <button type="submit">Register</button>
//             </form>

//             <div className="auth-link">
//               Already registered? <Link to="/login">Login</Link>
//             </div>

//             <p className="note">
//               For students & alumni of the institute only
//             </p>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

// export default Register;
