import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBriefcase,
  FaFileAlt,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUsers,
  FaUser,
  FaBell,
  FaSun,
  FaMoon,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { name: "Applications", icon: <FaFileAlt />, path: "/applications" },
    { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
    { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/mentorship" },
    { name: "Alumni Directory", icon: <FaUsers />, path: "/alumni-directory" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <>
      <style>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Segoe UI', Helvetica, sans-serif;
        }

        .left-panel {
          width: 260px;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        }

        .left-panel h2 {
          margin-bottom: 25px;
          color: #00509e;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 12px;
          margin-bottom: 10px;
          cursor: pointer;
          border-radius: 6px;
          transition: 0.3s;
          color: #333;
          font-weight: 500;
        }

        .menu-item:hover {
          background-color: #f2f2f2;
        }

        .menu-item span {
          margin-left: 12px;
        }

        .logout-button {
          margin-top: 20px;
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 6px;
          background-color: #00509e;
          color: white;
          cursor: pointer;
          font-size: 15px;
        }

        .right-panel {
          flex: 1;
          background-color: ${darkTheme ? "#1f1f1f" : "#f5f6fa"};
          display: flex;
          flex-direction: column;
        }

        .navbar {
          height: 60px;
          background-color: ${darkTheme ? "#2c2c2c" : "#ffffff"};
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 25px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.08);
        }

        .navbar-left h2 {
          margin: 0;
          color: ${darkTheme ? "#fff" : "#00509e"};
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        .navbar-right button {
          background: none;
          border: none;
          margin: 0 12px;
          font-size: 18px;
          cursor: pointer;
          color: ${darkTheme ? "#fff" : "#333"};
        }

        .profile-section {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .profile-img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          margin-left: 10px;
        }

        .content-area {
          padding: 30px;
          color: ${darkTheme ? "#fff" : "#000"};
          flex: 1;
        }
      `}</style>

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="left-panel">
          <h2>Campus Connect</h2>

          {menuItems.map((item) => (
            <div
              key={item.name}
              className="menu-item"
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Main Section */}
        <div className="right-panel">
          <div className="navbar">
            <div className="navbar-left">
              <h2>Campus Connect</h2>
            </div>

            <div className="navbar-right">
              <button onClick={toggleTheme}>
                {darkTheme ? <FaSun /> : <FaMoon />}
              </button>

              <button>
                <FaBell />
              </button>

              <div
                className="profile-section"
                onClick={() => navigate("/profile")}
              >
                <span style={{ fontWeight: "500" }}>
                  {user?.name}
                </span>

          {/* <img
  src={
    user?.profilePic
      ? `http://localhost:3000/uploads/${user.profilePic}`
      : "https://via.placeholder.com/38"
  }
  alt="profile"
  className="profile-img"
/> */}

<img
  src={user?.photo ? `http://localhost:3000/uploads/${user.photo}` : "/default.avif"}
  alt="profile"
  className="profile-img"
/>


              </div>
            </div>
          </div>

          <div className="content-area">
            <h2>Welcome to Dashboard </h2>
            <p>Select any menu item from the left panel to navigate.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;