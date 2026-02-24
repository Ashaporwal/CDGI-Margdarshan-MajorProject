import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
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
          width: 400px;
          padding: 35px;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
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

        .auth-card input {
          width: 100%;
          padding: 12px;
          margin-bottom: 18px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          transition: 0.3s;
        }

        .auth-card input:focus {
          border-color: #00509e;
          box-shadow: 0 0 5px rgba(0, 80, 158, 0.4);
          outline: none;
        }

        .password-container {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 12px;
          top: 38%;
          cursor: pointer;
          font-size: 13px;
          color: #00509e;
          font-weight: 500;
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
        }

        .auth-card button:hover {
          background: #002244;
        }

        .auth-link {
          margin-top: 18px;
          text-align: center;
          font-size: 14px;
        }

        .auth-link a {
          color: #00509e;
          text-decoration: none;
          font-weight: 500;
        }

        .auth-link a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Student Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="auth-link">
            <Link to="/">New user? Register here</Link>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Login;