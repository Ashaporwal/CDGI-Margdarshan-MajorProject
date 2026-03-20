
// import { useState, useEffect } from "react";
// import API from "../services/api";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { useNavigate, Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// function Register() {
//   const navigate = useNavigate();

//   const [role, setRole] = useState("student");
//   const [loading, setLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     name: "",
//     email: "",
//     password: "",
//     department: "",
//     enrollmentNumber: "", // 🔵 IMPORTANT
//     graduationYear: "",
//   });

//   const departments = [
//     "Computer Science Engineering (CSE)",
//     "Information Technology (IT)",
//     "Computer Science Information Technology (CSIT) ",
//     "Electronics & Communication (EC)",
//     "Electrical Engineering (EE)",
//     "Mechanical Engineering (ME)",
//     "Civil Engineering (CE)",
//     "Artificial Intelligence n Data Science (AIDS) ",
//   ];

//   const years = Array.from(
//     { length: new Date().getFullYear() - 2006 + 5 },
//     (_, i) => 2006 + i
//   );

//   // auto full name
//   useEffect(() => {
//     setForm((prev) => ({
//       ...prev,
//       name: `${prev.firstName} ${prev.lastName}`.trim(),
//     }));
//   }, [form.firstName, form.lastName]);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fullName = `${form.firstName} ${form.lastName}`.trim();

//     // console.log("Form data being sent:", { ...form, role });

//     if (!validateEmail(form.email)) {
//       toast.error("Enter valid email");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await API.post("/api/register", {
//         ...form,
//         name: fullName,
//         role,
//       });

//       // localStorage.setItem("token", res.data.token);
//       // localStorage.setItem("user", JSON.stringify(res.data.user));

//       // toast.success("Account created 🎉");
//       //  setTimeout(() => {
//       //   navigate("/login");
//       // }, 1000);
//       if (role === "alumni") {
//         toast.info("Registration successful! Wait for admin verification before logging in. ⏳");
//         setTimeout(() => navigate("/login"), 2500); // thoda zyada time
//       } else {
//         toast.success("Account created! 🎉");
//         setTimeout(() => navigate("/login"), 1000);
//       }


//     } catch (err) {
//       console.log("Error :", err)
//       toast.error(err.response?.data?.message || "Error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6">

//       <div className="text-xl tracking-wide flex items-center gap-2 cursor-pointer group">
//           <span className="font-bold text-gray-900">🎓 CDGI</span>

//           <span className="font-semibold bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm group-hover:drop-shadow-md transition duration-300">
//             Margdarshan
//           </span>
//         </div>

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border mt-5">

//         {/* role toggle */}
//         <div className="flex bg-slate-100 rounded-lg mb-6">
//           <button
//             type="button"
//             onClick={() => setRole("student")}
//             className={`flex-1 py-2 rounded-lg ${role === "student"
//               ? "bg-white shadow text-violet-600"
//               : "text-gray-500"
//               }`}
//           >
//             Student
//           </button>

//           <button
//             type="button"
//             onClick={() => setRole("alumni")}
//             className={`flex-1 py-2 rounded-lg ${role === "alumni"
//               ? "bg-white shadow text-violet-600"
//               : "text-gray-500"
//               }`}
//           >
//             Alumni
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <div className="flex gap-3">
//             <input
//               name="firstName"
//               placeholder="First name"
//               className="input"
//               onChange={handleChange}
//               required
//             />
//             <input
//               name="lastName"
//               placeholder="Last name"
//               className="input"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <input
//             name="email"
//             placeholder="Email"
//             className="input"
//             onChange={handleChange}
//             required
//           />

//           <select
//             name="department"
//             className="input"
//             onChange={handleChange}
//             required
//           >
//             <option value="">Department</option>
//             {departments.map((d) => (
//               <option key={d}>{d}</option>
//             ))}
//           </select>

//           {/* 🔵 STUDENT ROLL NUMBER */}
//           {role === "student" && (
//             <input
//               name="enrollmentNumber"
//               placeholder="Roll Number"
//               className="input"
//               onChange={handleChange}
//               required
//             />
//           )}

//           <select
//             name="graduationYear"
//             className="input"
//             onChange={handleChange}
//             required
//           >
//             <option value="">Graduation Year</option>
//             {years.map((y) => (
//               <option key={y}>{y}</option>
//             ))}
//           </select>

//           {/* password */}
//           <div className="relative">
//             <input
//               type={showPass ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               autoComplete="new-password"
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-11 focus:outline-none focus:ring-2 focus:ring-violet-500"
//             />

//             <span
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//             >
//               {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//             </span>
//           </div>

//           <button
//             disabled={loading}
//             className="w-full py-3 rounded-xl text-white font-semibold 
//             bg-gradient-to-r from-violet-500 to-violet-700
//             hover:from-violet-600 hover:to-violet-800
//             shadow-md transition duration-300"
//           >
//             {loading ? "Creating..." : "Create Account"}
//           </button>
//         </form>

//         <div className="text-center text-sm mt-6 space-y-1">
//           <div>
//             Already have account?{" "}
//             <Link to="/login" className="text-violet-600 font-medium">
//               Login
//             </Link>
//           </div>

//           <Link to="/" className="text-gray-400">
//             ← Back to home
//           </Link>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Register;

import { useState, useEffect } from "react";
import API from "../services/api";
import { FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// ── Enrollment validation ────────────────────────────────
const validateEnrollment = (value) => {
  if (!value) return { valid: false, msg: "Enrollment number is required" };
  if (value.length !== 12) return { valid: false, msg: "Must be exactly 12 characters" };
  if (!/^0832[A-Z]{2}\d{2}\d{4}$/.test(value))
    return { valid: false, msg: "Invalid format. Expected: 0832XXYY1234 (e.g. 0832IT231078)" };
  return { valid: true, msg: "Valid enrollment number ✓" };
};

// ── Auto extract graduation year ─────────────────────────
const extractGraduationYear = (enrollment) => {
  const match = enrollment.match(/^0832[A-Z]{2}(\d{2})\d{4}$/);
  if (!match) return null;
  return 2000 + parseInt(match[1]) + 4;
};

// ── Inline Field Message ─────────────────────────────────
function FieldMsg({ msg, valid }) {
  if (!msg) return null;
  return (
    <p className={`text-xs flex items-center gap-1 mt-1
    ${valid ? "text-green-500" : "text-red-500"}`}>
      {valid ? <FiCheckCircle size={11} /> : <FiAlertCircle size={11} />}
      {msg}
    </p>
  );
}

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
    enrollmentNumber: "",
    graduationYear: "",
  });

  // ── Validation states ──────────────────────────────────
  const [errors, setErrors] = useState({
    email: null,
    enrollmentNumber: null,
    password: null,
  });
  const [touched, setTouched] = useState({
    email: false,
    enrollmentNumber: false,
    password: false,
  });

  const departments = [
    "Computer Science Engineering (CSE)",
    "Information Technology (IT)",
    "Computer Science Information Technology (CSIT)",
    "Electronics & Communication (EC)",
    "Electrical Engineering (EE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Artificial Intelligence n Data Science (AIDS)",
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 2006 + 6 },
    (_, i) => 2006 + i
  );

  // auto full name
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: `${prev.firstName} ${prev.lastName}`.trim(),
    }));
  }, [form.firstName, form.lastName]);

  // ── Validate email ─────────────────────────────────────
  const validateEmail = (email) => {
    if (!email) return { valid: false, msg: "Email is required" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return { valid: false, msg: "Enter a valid email address" };
    return { valid: true, msg: "Valid email ✓" };
  };

  // ── Validate password ──────────────────────────────────
  const validatePassword = (password) => {
    if (!password) return { valid: false, msg: "Password is required" };
    if (password.length < 6)
      return { valid: false, msg: `Too short — ${6 - password.length} more character${6 - password.length > 1 ? "s" : ""} needed` };
    return { valid: true, msg: "Strong password ✓" };
  };

  // ── Handle change ──────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enrollment — auto uppercase
    const finalValue = name === "enrollmentNumber" ? value.toUpperCase() : value;

    setForm((prev) => ({ ...prev, [name]: finalValue }));

    // Live validation
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(finalValue) }));
    }

    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(finalValue) }));
    }

    if (name === "enrollmentNumber") {
      const result = validateEnrollment(finalValue);
      setErrors((prev) => ({ ...prev, enrollmentNumber: result }));

      // Auto-fill graduation year when valid
      if (result.valid) {
        const gradYear = extractGraduationYear(finalValue);
        if (gradYear) {
          setForm((prev) => ({
            ...prev,
            enrollmentNumber: finalValue,
            graduationYear: String(gradYear),
          }));
        }
      } else {
        // Clear graduation year if enrollment invalid
        setForm((prev) => ({
          ...prev,
          enrollmentNumber: finalValue,
          graduationYear: "",
        }));
      }
    }
  };

  // Mark field as touched on blur
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Trigger validation on blur even if not changed
    if (field === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
    if (field === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(form.password) }));
    if (field === "enrollmentNumber")
      setErrors((prev) => ({ ...prev, enrollmentNumber: validateEnrollment(form.enrollmentNumber) }));
  };

  // ── Border color helper ────────────────────────────────
  const borderClass = (field) => {
    if (!touched[field] || !errors[field]) return "border-gray-300";
    return errors[field].valid
      ? "border-green-400 focus:ring-green-300"
      : "border-red-400 focus:ring-red-300";
  };

  // ── Submit ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ email: true, enrollmentNumber: true, password: true });

    // Final validation check
    const emailResult = validateEmail(form.email);
    const passwordResult = validatePassword(form.password);
    const enrollResult = role === "student"
      ? validateEnrollment(form.enrollmentNumber)
      : { valid: true };

    setErrors({
      email: emailResult,
      password: passwordResult,
      enrollmentNumber: enrollResult,
    });

    if (!emailResult.valid || !passwordResult.valid || !enrollResult.valid) {
      toast.error("Please fix the errors before submitting");
      return;
    }


    const fullName = `${form.firstName} ${form.lastName}`.trim();
    setLoading(true);

    try {
      await API.post("/api/register", {
        ...form,
        name: fullName,
        role,
      });

      if (role === "alumni") {
        toast.info("Registration successful! Wait for admin verification before logging in. ⏳");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        toast.success("Account created! 🎉");
        setTimeout(() => navigate("/login"), 1000);
      }

    } catch (err) {
      // toast.error(err.response?.data?.message || "Registration failed");

      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
      if (msg.toLowerCase().includes("enrollment")) {
        setTouched((prev) => ({ ...prev, enrollmentNumber: true }));
        setErrors((prev) => ({
          ...prev,
          enrollmentNumber: { valid: false, msg: "Enrollment number already registered!" }
        }));
      }

      // Email already registered
      if (msg.toLowerCase().includes("email")) {
        setTouched((prev) => ({ ...prev, email: true }));
        setErrors((prev) => ({
          ...prev,
          email: { valid: false, msg: "Email already registered!" }
        }));
      }
    }

    setLoading(false);
  };

  // ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center justify-center
    bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6">

      <h1 className="text-3xl font-bold text-violet-600 mb-6">
        Campus Connect
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border">

        {/* Role Toggle */}
        <div className="flex bg-slate-100 rounded-lg mb-6">
          <button type="button" onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg transition ${role === "student"
              ? "bg-white shadow text-violet-600 font-semibold"
              : "text-gray-500"}`}>
            Student
          </button>
          <button type="button" onClick={() => setRole("alumni")}
            className={`flex-1 py-2 rounded-lg transition ${role === "alumni"
              ? "bg-white shadow text-violet-600 font-semibold"
              : "text-gray-500"}`}>
            Alumni
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="flex gap-3">
            <input name="firstName" placeholder="First name"
              className="input" onChange={handleChange} required />
            <input name="lastName" placeholder="Last name"
              className="input" onChange={handleChange} required />
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              className={`input border ${borderClass("email")}
              focus:ring-2 focus:outline-none transition`}
              required
            />
            {touched.email && errors.email && (
              <FieldMsg msg={errors.email.msg} valid={errors.email.valid} />
            )}
          </div>

          {/* Department */}
          <select name="department" className="input" onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>

          {/* Enrollment Number — Students only */}
          {role === "student" && (
            <div>
              <input
                name="enrollmentNumber"
                placeholder="e.g. 0832IT231078"
                maxLength={12}
                value={form.enrollmentNumber}
                onChange={handleChange}
                onBlur={() => handleBlur("enrollmentNumber")}
                className={`input border ${borderClass("enrollmentNumber")}
                focus:ring-2 focus:outline-none transition font-mono`}
                required
              />
              {touched.enrollmentNumber && errors.enrollmentNumber && (
                <FieldMsg
                  msg={errors.enrollmentNumber.msg}
                  valid={errors.enrollmentNumber.valid}
                />
              )}
              {/* {!touched.enrollmentNumber && (
                <p className="text-xs text-gray-400 mt-1">
                  Format: 0832 + Branch(IT/CS..) + Year(23) + Serial(1078)
                </p>
              )} */}
            </div>
          )}

          {/* Graduation Year */}
          <div>
            <select
              name="graduationYear"
              value={form.graduationYear}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Graduation Year</option>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
            {/* {role === "student" && form.graduationYear && (
              <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                <FiCheckCircle size={11} />
                Auto-detected from enrollment number
              </p>
            )} */}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password (min. 6 characters)"
                autoComplete="new-password"
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                required
                className={`w-full border ${borderClass("password")}
                rounded-lg px-3 py-2 pr-11 focus:outline-none
                focus:ring-2 transition`}
              />
              <span onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                cursor-pointer text-gray-500">
                {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
            </div>
            {touched.password && errors.password && (
              <FieldMsg msg={errors.password.msg} valid={errors.password.valid} />
            )}
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-violet-500 to-violet-700
            hover:from-violet-600 hover:to-violet-800
            shadow-md transition duration-300 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="text-center text-sm mt-6 space-y-1">
          <div>
            Already have account?{" "}
            <Link to="/login" className="text-violet-600 font-medium">Login</Link>
          </div>
          <Link to="/" className="text-gray-400">← Back to home</Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Register;