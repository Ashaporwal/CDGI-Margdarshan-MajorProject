import { Outlet, useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaClipboardList,
  FaCalendarAlt,
  FaUser,
  FaBell,
  FaMoon,
  FaSun,
  FaNewspaper,
  FaPlayCircle,
  FaChalkboardTeacher,
  FaSignOutAlt
} from "react-icons/fa";

function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Fetch Student
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/api/get");
        setUser(data.user);
      } catch (err) {
        console.log("User fetch failed");
      }
    };
    fetchUser();
  }, []);

  // Dark Mode Apply
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/student/dashboard" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/student/jobs" },
    { name: "Applications", icon: <FaClipboardList />, path: "/student/applications" },
    { name: "Events", icon: <FaCalendarAlt />, path: "/student/events" },
    { name: "Notice", icon: <FaNewspaper />, path: "/student/notice" },
    { name: "Stories", icon: <FaPlayCircle />, path: "/student/stories" },
    { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/student/mentorship" },
    { name: "Profile", icon: <FaUser />, path: "/student/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md p-6 flex flex-col transition-colors duration-300">

        <div className="flex-1">

          <h2 className="text-xl font-bold text-violet-600 dark:text-violet-400 mb-6">
            Campus Connect
          </h2>

          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
              text-gray-700 dark:text-gray-200
              hover:bg-violet-50 dark:hover:bg-gray-700
              ${
                location.pathname === item.path
                  ? "bg-violet-100 text-violet-700 font-semibold"
                  : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition w-full"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6 transition-colors duration-300">

          <h2 className="text-lg font-semibold text-violet-600 dark:text-violet-400">
            My Profile
          </h2>

          <div className="flex items-center gap-5 text-gray-700 dark:text-gray-200">

            {/* Dark Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {dark ? <FaSun /> : <FaMoon />}
            </button>

            <FaBell className="cursor-pointer" />

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/student/profile")}
            >
              <span className="font-medium">
                {user?.name}
              </span>

              <img
                src={
                  user?.photo
                    ? `http://localhost:3000/uploads/${user.photo}`
                    : "/default.avif"
                }
                alt="profile"
                className="w-9 h-9 rounded-full object-cover border"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default StudentLayout;

// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import {
//     FaTachometerAlt,
//     FaBriefcase,
//     FaClipboardList,
//     FaCalendarAlt,
//     FaUser,
//     FaBell,
//     FaSignOutAlt,
//     FaNewspaper,
//     FaPlayCircle,
//     FaChalkboardTeacher
// } from "react-icons/fa";

// function StudentLayout() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const { data } = await API.get("/api/get");
//                 setUser(data.user);
//             } catch (err) {
//                 console.log("User fetch failed");
//             }
//         };
//         fetchUser();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     const menuItems = [
//         { name: "Dashboard", icon: <FaTachometerAlt />, path: "/student/dashboard" },
//         { name: "Jobs", icon: <FaBriefcase />, path: "/student/jobs" },
//         { name: "Applications", icon: <FaClipboardList />, path: "/student/applications" },
//         { name: "Events", icon: <FaCalendarAlt />, path: "/student/events" },
//         { name: "Notice", icon: <FaNewspaper />, path: "/student/notice" },
//         { name: "Stories", icon: <FaPlayCircle />, path: "/student/stories" },
//         { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/student/mentorship" },
//         { name: "Profile", icon: <FaUser />, path: "/student/profile" },
//     ];

//     return (
//         <div className="flex min-h-screen bg-gray-100">

//             {/* Sidebar */}
//             <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">

//                 <div>
//                     <h2 className="text-2xl font-bold text-violet-600 mb-8">
//                         Campus Connect
//                     </h2>

//                     {menuItems.map((item) => (
//                         <div
//                             key={item.name}
//                             onClick={() => navigate(item.path)}
//                             className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//                 ${location.pathname === item.path
//                                     ? "bg-blue-600 text-white"
//                                     : "hover:bg-blue-50 text-gray-700"
//                                 }`}
//                         >
//                             {item.icon}
//                             <span>{item.name}</span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Logout fixed under menu */}
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center justify-center gap-2 py-3 
//           bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition duration-300">
//                     <FaSignOutAlt />
//                     Logout
//                 </button>
//             </div>

//             {/* Right Side */}
//             <div className="flex-1 flex flex-col">

//                 {/* Navbar */}
//                 <div className="h-16 bg-white shadow flex items-center justify-between px-6">

//                     <h2 className="text-lg font-semibold text-blue-600">
//                         Student Panel
//                     </h2>

//                     <div className="flex items-center gap-5">

//                         <FaBell className="cursor-pointer text-gray-600" />

//                         <div
//                             className="flex items-center gap-3 cursor-pointer"
//                             onClick={() => navigate("/student/profile")}
//                         >
//                             <span className="font-medium text-gray-700">
//                                 {user?.name}
//                             </span>

//                             <img
//                                 src={
//                                     user?.photo
//                                         ? `http://localhost:3000/uploads/${user.photo}`
//                                         : "/default.avif"
//                                 }
//                                 alt="profile"
//                                 className="w-9 h-9 rounded-full object-cover border"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Content Area */}
//                 <div className="flex-1 p-8">
//                     <Outlet />
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default StudentLayout;