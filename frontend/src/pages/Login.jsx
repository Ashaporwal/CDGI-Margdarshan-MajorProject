// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate, Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await API.post("/api/login", form);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       toast.success("Login successful 🎉");

//       setTimeout(() => {
//         navigate(
//           res.data.user.role === "student"
//             ? "/student/dashboard"
//             : res.data.user.role === "alumni"
//               ? "/alumni/dashboard"
//               : "/admin/dashboard"
//         );
//       }, 1000);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6">

//       <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border">

//         <h2 className="text-3xl font-bold text-center text-violet-600 mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-center text-gray-500 mb-8">
//           Login to continue your journey
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <input
//             name="email"
//             type="email"
//             placeholder="Email Address"
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
//           />

//           {/* PASSWORD FIELD */}
//           <div className="relative">
//             <input
//               type={showPass ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               autoComplete="current-password"
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 pr-12"
//             />

//             <span
//               onClick={() => setShowPass(!showPass)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
//             >
//               {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//             </span>
//           </div>

//           <button
//             disabled={loading}
//             className="w-full py-3 rounded-xl text-white font-semibold 
// bg-gradient-to-r from-violet-500 to-violet-700
// hover:from-violet-600 hover:to-violet-800
// shadow-md transition duration-300"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-500">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-violet-600 font-medium">
//             Register
//           </Link>
//           <br />
//           <Link to="/" className="text-gray-400">
//             ← Back to Home
//           </Link>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

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

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Validation states ──────────────────────────────────
  const [errors, setErrors] = useState({ email: null, password: null });
  const [touched, setTouched] = useState({ email: false, password: false });

  // ── Validators ─────────────────────────────────────────
  const validateEmail = (val) => {
    if (!val) return { valid: false, msg: "Email is required" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return { valid: false, msg: "Enter a valid email address" };
    return { valid: true, msg: "Valid email ✓" };
  };

  const validatePassword = (val) => {
    if (!val) return { valid: false, msg: "Password is required" };
    if (val.length < 6)
      return { valid: false, msg: `Too short — ${6 - val.length} more character${6 - val.length > 1 ? "s" : ""} needed` };
    return { valid: true, msg: "Password entered ✓" };
  };
  

  // ── Border color ───────────────────────────────────────
  const borderClass = (field) => {
    if (!touched[field] || !errors[field]) return "border-gray-300";
    return errors[field].valid
      ? "border-green-400 focus:ring-green-300"
      : "border-red-400 focus:ring-red-300";
  };

  // ── Handlers ───────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
    if (field === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(form.password) }));
  };

  // ── Submit ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all touched
    setTouched({ email: true, password: true });

    const emailResult    = validateEmail(form.email);
    const passwordResult = validatePassword(form.password);

    setErrors({ email: emailResult, password: passwordResult });

    if (!emailResult.valid || !passwordResult.valid) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/api/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate(
          res.data.user.role === "student"
            ? "/student/dashboard"
            : res.data.user.role === "alumni"
              ? "/alumni/dashboard"
              : "/admin/dashboard"
        );
      }, 1000);

    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);

      // Inline error for specific cases
      if (msg.toLowerCase().includes("email") || msg.toLowerCase().includes("invalid")) {
        setTouched((prev) => ({ ...prev, email: true }));
        setErrors((prev) => ({
          ...prev,
          email: { valid: false, msg: "Invalid email or password" },
        }));
      }

      if (msg.toLowerCase().includes("password")) {
        setTouched((prev) => ({ ...prev, password: true }));
        setErrors((prev) => ({
          ...prev,
          password: { valid: false, msg: msg },
        }));
      }

      // Pending verification case — sirf toast, no inline
      if (err.response?.status === 403) {
        setErrors({ email: null, password: null });
        setTouched({ email: false, password: false });
      }
    }

    setLoading(false);
  };

  // ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border">

        <h2 className="text-3xl font-bold text-center text-violet-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              required
              className={`w-full px-4 py-3 border ${borderClass("email")}
              rounded-xl focus:outline-none focus:ring-2 transition`}
            />
            {touched.email && errors.email && (
              <FieldMsg msg={errors.email.msg} valid={errors.email.valid} />
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                required
                className={`w-full px-4 py-3 border ${borderClass("password")}
                rounded-xl focus:outline-none focus:ring-2 transition pr-12`}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                cursor-pointer text-gray-500"
              >
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
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-violet-600 font-medium">
            Register
          </Link>
          <br />
          <Link to="/" className="text-gray-400">← Back to Home</Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;