import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "", // no role selected by default
    remember: false,
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // handle role button click
  const handleRoleClick = (role) => {
    setForm({ ...form, role });
  };

  // submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) {
      toast.error("Please select your role before login");
      return;
    }

    try {
      const res = await API.post("/api/login", form);
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🎉");

      // redirect based on role
      if (form.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Helvetica, sans-serif;
          background: linear-gradient(135deg, #f0f2f5, #e6e9ed);
        }

        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .auth-card {
          background: #ffffff;
          width: 100%;
          max-width: 450px;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }

        .auth-card h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #00509e;
          font-weight: 600;
          font-size: 1.8rem;
        }

        .role-selection {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        /* Role buttons */
        .role-button {
          flex: 1;
          padding: 10px 0;
          margin: 0 5px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #d3d3d3; /* default grey */
          color: #333;
        }

        .role-button.active {
          background: #ffffff; /* clicked button white */
          color: #000;
        }

        .role-button:hover {
          background: #e0e0e0; /* subtle hover effect */
        }

        .auth-card input[type="email"],
        .auth-card input[type="password"] {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          background: #ffffff;
          transition: 0.3s;
        }

        .auth-card input:focus {
          border-color: #00509e;
          box-shadow: 0 0 5px rgba(0,80,158,0.2);
          outline: none;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .checkbox-container input[type="checkbox"] {
          margin-right: 8px;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .auth-card button {
          width: 100%;
          padding: 12px;
          background: #00509e;
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .auth-card button:hover {
          background: #377f00;
        }

        .auth-card p {
          margin-top: 18px;
          text-align: center;
          font-size: 14px;
        }

        .auth-card a {
          color: #5a5a5a;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-card a:hover {
          text-decoration: underline;
        }

        .forgot-link {
          display: block;
          text-align: right;
          margin-top: -10px;
          margin-bottom: 15px;
          font-size: 13px;
          color: #5a5a5a;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 500px) {
          .auth-card {
            padding: 30px 20px;
          }
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <h2 style={{fontWeight:"700" , color:"black"}}>Campus Connect</h2>

        
          {/* Role buttons */}
          <div className="role-selection">
            {["student", "alumni", "admin"].map((role) => (
              <button
                key={role}
                type="button"
                className={`role-button ${form.role === role ? "active" : ""}`}
                onClick={() => handleRoleClick(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="College Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                id="rememberMe"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <Link className="forgot-link" to="/change-password">
              Forgot Password?
            </Link>

            <button type="submit" style={{background:"blue", borderRadius:"9px"}}>Login</button>
          </form>

          <p style={{ color: "grey" }}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>

          {/* <p style={{ fontWeight: "500", color: "grey" }}>Back to home</p> */}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Login;