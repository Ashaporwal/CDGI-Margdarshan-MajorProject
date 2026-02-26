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
      const res = await API.post("/api/register", form);
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

