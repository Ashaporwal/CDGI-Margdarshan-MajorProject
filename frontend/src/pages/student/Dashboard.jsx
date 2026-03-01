import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUser,
  FaBell,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBriefcase,
  FaFileAlt,
  FaCalendarAlt,
  FaChalkboard,
  FaChalkboardTeacher

} from "react-icons/fa";
import API from "../../services/api"; // tumhara axios instance

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(false);
  const [user, setUser] = useState(null);

  // Backend se latest profile fetch karo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await API.get("/student/full-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Merge basic + student profile
        setUser({
          ...data.user,
          ...data.studentProfile,
        });
      } catch (err) {
        console.log("Failed to fetch user profile:", err);
      }
    };

    fetchUser();
  }, []);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
    <div className={`min-h-screen flex ${darkTheme ? "bg-gray-900" : "bg-gray-100"}`}>

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-violet-600 mb-8">
            Campus Connect
          </h2>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer 
                hover:bg-violet-100 transition duration-200 text-gray-700 font-medium"
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 py-3 
          bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition duration-300"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div
          className={`h-16 px-8 flex items-center justify-between shadow-sm 
          ${darkTheme ? "bg-gray-800 text-white" : "bg-white"}`}
        >
          <h2 className="text-xl font-semibold text-violet-600">
            Dashboard
          </h2>

          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-lg">
              {darkTheme ? <FaSun /> : <FaMoon />}
            </button>

            {/* Notification */}
            <button className="text-lg">
              <FaBell />
            </button>

            {/* Profile */}
            {user && (
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span className="font-medium">{user.firstName || user.name}</span>

                <img
                  src={
                    user.resume        // backend se jo file upload hui hai uska field
                      ? `http://localhost:5000/uploads/${user.resume}`
                      : "/default-avatar.png"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`flex-1 p-10 ${darkTheme ? "text-white" : "text-gray-800"}`}
        >
          <h2 className="text-3xl font-bold mb-4">
            Welcome to Dashboard 👋
          </h2>
          <p className="text-gray-500">
            Select any menu item from the sidebar to navigate.
          </p>

          {/* Example Cards */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-violet-600">Total Users</h3>
              <p className="text-3xl font-bold mt-2">124</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-violet-600">Active Sessions</h3>
              <p className="text-3xl font-bold mt-2">18</p>
            </div>
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-violet-600">Notifications</h3>
              <p className="text-3xl font-bold mt-2">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   FaTachometerAlt,
//   FaBriefcase,
//   FaFileAlt,
//   FaCalendarAlt,
//   FaChalkboardTeacher,
//   FaUsers,
//   FaUser,
//   FaBell,
//   FaSun,
//   FaMoon,
// } from "react-icons/fa";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [darkTheme, setDarkTheme] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const toggleTheme = () => {
//     setDarkTheme(!darkTheme);
//   };

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
//     { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
//     { name: "Applications", icon: <FaFileAlt />, path: "/applications" },
//     { name: "Events", icon: <FaCalendarAlt />, path: "/events" },
//     { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/mentorship" },
//     { name: "Alumni Directory", icon: <FaUsers />, path: "/alumni-directory" },
//     { name: "Profile", icon: <FaUser />, path: "/profile" },
//   ];

//   return (
//     <>
//       <style>{`
//         .dashboard-container {
//           display: flex;
//           min-height: 100vh;
//           font-family: 'Segoe UI', Helvetica, sans-serif;
//         }

//         .left-panel {
//           width: 260px;
//           background-color: #ffffff;
//           padding: 20px;
//           box-shadow: 2px 0 5px rgba(0,0,0,0.1);
//         }

//         .left-panel h2 {
//           margin-bottom: 25px;
//           color: #00509e;
//         }

//         .menu-item {
//           display: flex;
//           align-items: center;
//           padding: 12px 12px;
//           margin-bottom: 10px;
//           cursor: pointer;
//           border-radius: 6px;
//           transition: 0.3s;
//           color: #333;
//           font-weight: 500;
//         }

//         .menu-item:hover {
//           background-color: #f2f2f2;
//         }

//         .menu-item span {
//           margin-left: 12px;
//         }

//         .logout-button {
//           margin-top: 20px;
//           width: 100%;
//           padding: 12px;
//           border: none;
//           border-radius: 6px;
//           background-color: #00509e;
//           color: white;
//           cursor: pointer;
//           font-size: 15px;
//         }

//         .right-panel {
//           flex: 1;
//           background-color: ${darkTheme ? "#1f1f1f" : "#f5f6fa"};
//           display: flex;
//           flex-direction: column;
//         }

//         .navbar {
//           height: 60px;
//           background-color: ${darkTheme ? "#2c2c2c" : "#ffffff"};
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 25px;
//           box-shadow: 0 2px 5px rgba(0,0,0,0.08);
//         }

//         .navbar-left h2 {
//           margin: 0;
//           color: ${darkTheme ? "#fff" : "#00509e"};
//         }

//         .navbar-right {
//           display: flex;
//           align-items: center;
//         }

//         .navbar-right button {
//           background: none;
//           border: none;
//           margin: 0 12px;
//           font-size: 18px;
//           cursor: pointer;
//           color: ${darkTheme ? "#fff" : "#333"};
//         }

//         .profile-section {
//           display: flex;
//           align-items: center;
//           cursor: pointer;
//         }

//         .profile-img {
//           width: 38px;
//           height: 38px;
//           border-radius: 50%;
//           object-fit: cover;
//           margin-left: 10px;
//         }

//         .content-area {
//           padding: 30px;
//           color: ${darkTheme ? "#fff" : "#000"};
//           flex: 1;
//         }
//       `}</style>

//       <div className="dashboard-container">
//         {/* Sidebar */}
//         <div className="left-panel">
//           <h2>Campus Connect</h2>

//           {menuItems.map((item) => (
//             <div
//               key={item.name}
//               className="menu-item"
//               onClick={() => navigate(item.path)}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </div>
//           ))}

//           <button className="logout-button" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         {/* Main Section */}
//         <div className="right-panel">
//           <div className="navbar">
//             <div className="navbar-left">
//               <h2>Campus Connect</h2>
//             </div>

//             <div className="navbar-right">
//               <button onClick={toggleTheme}>
//                 {darkTheme ? <FaSun /> : <FaMoon />}
//               </button>

//               <button>
//                 <FaBell />
//               </button>

//               <div
//                 className="profile-section"
//                 onClick={() => navigate("/profile")}
//               >
//                 <span style={{ fontWeight: "500" }}>
//                   {user?.name}
//                 </span>

//           {/* <img
//   src={
//     user?.profilePic
//       ? `http://localhost:3000/uploads/${user.profilePic}`
//       : "https://via.placeholder.com/38"
//   }
//   alt="profile"
//   className="profile-img"
// /> */}

// <img
//   src={user?.photo ? `http://localhost:3000/uploads/${user.photo}` : "/default.avif"}
//   alt="profile"
//   className="profile-img"
// />


//               </div>
//             </div>
//           </div>

//           <div className="content-area">
//             <h2>Welcome to Dashboard </h2>
//             <p>Select any menu item from the left panel to navigate.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;