// import { useState, useEffect } from "react";
// import API from "../services/api";
// import { useNavigate, Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     name: "",        // auto-generated from firstName + lastName
//     email: "",
//     password: "",
//     role: "student",
//     department: "",
//     graduationYear: "",
//   });

//   // Departments array
//   const departments = [
//     "Computer Science Engineering (CSE)",
//     "Information Technology (IT)",
//     "Electronics & Communication (EC)",
//     "Electrical Engineering (EE)",
//     "Mechanical Engineering (ME)",
//     "Civil Engineering (CE)",
//     "Artificial Intelligence (AI)",
//     "Data Science (DS)"
//   ];

//   // Graduation years array
//   const years = Array.from(
//     { length: new Date().getFullYear() - 2006 + 5 },
//     (_, i) => 2006 + i
//   );

//   // Update full name whenever firstName or lastName changes
//   useEffect(() => {
//     setForm(prev => ({ ...prev, name: `${prev.firstName} ${prev.lastName}`.trim() }));
//   }, [form.firstName, form.lastName]);

//   // Handle input changes
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/api/register", form);
//       localStorage.setItem("token", res.data.token);

//       toast.success("Registration successful 🎉");

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (err) {

//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           margin: 0;
//           padding: 0;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: linear-gradient(135deg, #003366, #00509e);
//         }

//         .auth-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         .auth-card {
//           background: #ffffff;
//           width: 450px;
//           padding: 35px;
//           border-radius: 12px;
//           box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
//           transition: 0.3s ease;
//         }

//         .auth-card:hover {
//           transform: translateY(-5px);
//         }

//         .auth-card h2 {
//           text-align: center;
//           margin-bottom: 25px;
//           color: #003366;
//           font-weight: 600;
//         }

//         .auth-card input,
//         .auth-card select {
//           width: 100%;
//           padding: 12px;
//           margin-bottom: 15px;
//           border: 1px solid #ccc;
//           border-radius: 6px;
//           font-size: 14px;
//           transition: 0.3s;
//         }

//         .auth-card input:focus,
//         .auth-card select:focus {
//           border-color: #00509e;
//           box-shadow: 0 0 5px rgba(0, 80, 158, 0.4);
//           outline: none;
//         }

//         .auth-card button {
//           width: 100%;
//           padding: 12px;
//           background: #003366;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           font-size: 15px;
//           cursor: pointer;
//           transition: 0.3s;
//           margin-top: 10px;
//         }

//         .auth-card button:hover {
//           background: #002244;
//         }

//         .auth-card p {
//           margin-top: 18px;
//           text-align: center;
//           font-size: 14px;
//         }

//         .auth-card a {
//           color: #00509e;
//           text-decoration: none;
//           font-weight: 500;
//         }

//         .auth-card a:hover {
//           text-decoration: underline;
//         }
//       `}</style>

//       <div className="auth-container">
//         <div className="auth-card">
//           <h2>B.Tech Registration</h2>

//           <form onSubmit={handleSubmit}>
//             <input
//               name="firstName"
//               placeholder="First Name"
//               value={form.firstName}
//               onChange={handleChange}
//               required
//             />

//             <input
//               name="lastName"
//               placeholder="Last Name"
//               value={form.lastName}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="College Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               required
//             />

//             <select name="role" value={form.role} onChange={handleChange}>
//               <option value="student">Student</option>
//               <option value="alumni">Alumni</option>
//             </select>

//             <select
//               name="department"
//               value={form.department}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Department</option>
//               {departments.map((dept, index) => (
//                 <option key={index} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="graduationYear"
//               value={form.graduationYear}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Graduation Year</option>
//               {years.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>

//             <button type="submit">Register</button>
//           </form>

//           <p>
//             Already registered? <Link to="/login">Login</Link>
//           </p>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

// export default Register;
import { useState, useEffect } from "react";
import API from "../services/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    password: "",
    department: "",
    enrollmentNumber: "", // 🔵 IMPORTANT
    graduationYear: "",
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

  // auto full name
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: `${prev.firstName} ${prev.lastName}`.trim(),
    }));
  }, [form.firstName, form.lastName]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      toast.error("Enter valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/register", {
        ...form,
        role,
      });

      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6">

      <h1 className="text-3xl font-bold text-violet-600 mb-6">
        Campus Connect
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border">

        {/* role toggle */}
        <div className="flex bg-slate-100 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg ${role === "student"
                ? "bg-white shadow text-violet-600"
                : "text-gray-500"
              }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("alumni")}
            className={`flex-1 py-2 rounded-lg ${role === "alumni"
                ? "bg-white shadow text-violet-600"
                : "text-gray-500"
              }`}
          >
            Alumni
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="flex gap-3">
            <input
              name="firstName"
              placeholder="First name"
              className="input"
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              className="input"
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            required
          />

          <select
            name="department"
            className="input"
            onChange={handleChange}
            required
          >
            <option value="">Department</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          {/* 🔵 STUDENT ROLL NUMBER */}
          {role === "student" && (
            <input
              name="enrollmentNumber"
              placeholder="Roll Number"
              className="input"
              onChange={handleChange}
              required
            />
          )}

          <select
            name="graduationYear"
            className="input"
            onChange={handleChange}
            required
          >
            <option value="">Graduation Year</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          {/* password */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-violet-500 to-violet-700
            hover:from-violet-600 hover:to-violet-800
            shadow-md transition duration-300"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="text-center text-sm mt-6 space-y-1">
          <div>
            Already have account?{" "}
            <Link to="/login" className="text-violet-600 font-medium">
              Login
            </Link>
          </div>

          <Link to="/" className="text-gray-400">
            ← Back to home
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Register;