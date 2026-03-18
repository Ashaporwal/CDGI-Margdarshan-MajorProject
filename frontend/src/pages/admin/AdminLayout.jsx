// import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaUser,
//   FaUsers,
//   FaClipboardList,
//   FaSignOutAlt,
//   FaTachometerAlt,
//   FaCalendarAlt
// } from "react-icons/fa";

// function AdminLayout() {

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const sidebarItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
//     { name: "Manage Students", icon: <FaUser />, path: "/admin/students" },
//     { name: "Manage Alumni", icon: <FaUsers />, path: "/admin/alumni" },
//     { name: "Manage Notices", icon: <FaClipboardList />, path: "/admin/notices" },
//     { name: "Campus Drives", icon: <FaCalendarAlt />, path: "/admin/campus-drives" }
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-md p-6 flex flex-col fixed h-screen">

//         {/* Brand */}
//         <div className="flex items-center gap-2 mb-8">

//   <span className="text-2xl">🎓</span>

//   <span className="font-bold text-gray-900 text-lg">
//     CDGI
//   </span>

//   <span className="font-semibold bg-gradient-to-r 
//   from-violet-600 via-purple-500 to-indigo-500 
//   bg-clip-text text-transparent text-lg">
//     Margdarshan
//   </span>

// </div>

//         {/* Menu */}
//         <div className="flex-1 space-y-2">

//           {sidebarItems.map((item) => (

//             <div
//               key={item.name}
//               onClick={() => navigate(item.path)}
//               className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
//               ${
//                 location.pathname === item.path
//                   ? "bg-violet-100 text-violet-700 font-semibold"
//                   : "text-gray-700 hover:bg-violet-50"
//               }`}
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </div>

//           ))}

//         </div>

//         {/* Logout */}
//         {/* <button
//           onClick={handleLogout}
//           className="flex items-center justify-center gap-2 py-3 
// bg-gray-800 text-white rounded-xl 
// hover:bg-gray-900 transition"
//         >
//           <FaSignOutAlt />
//           Logout
//         </button> */}
//         <button
//   onClick={handleLogout}
//   className="flex items-center justify-center gap-2 py-3
//   bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
// >
//   <FaSignOutAlt />
//   Logout
// </button>

//       </div>

//       {/* Right Side */}
//       <div className="flex-1 flex flex-col ml-64">

//         {/* Navbar */}
//         <div className="h-16 bg-white shadow flex items-center justify-between px-6">

//           <h2 className="text-lg font-semibold text-violet-700">
//             Admin
//           </h2>

//         </div>

//         {/* Content */}
//         <div className="flex-1 p-8">

//           <Outlet />

//         </div>

//       </div>

//     </div>
//   );
// }

// export default AdminLayout;


import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser, FaUsers, FaClipboardList,
  FaSignOutAlt, FaTachometerAlt, FaCalendarAlt
} from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ── Dark Mode ──────────────────────────────────────────
  // const [dark, setDark] = useState(
  //   localStorage.getItem("theme") === "dark"
  // );

  const [dark, setDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");

    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");

    }

  }, [dark]);

  // ── Handlers ───────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const sidebarItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Manage Students", icon: <FaUser />, path: "/admin/students" },
    { name: "Manage Alumni", icon: <FaUsers />, path: "/admin/alumni" },
    { name: "Manage Notices", icon: <FaClipboardList />, path: "/admin/notices" },
    { name: "Campus Drives", icon: <FaCalendarAlt />, path: "/admin/campus-drives" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">

      {/* ── Sidebar ── */}
      <div className="w-64 bg-white dark:bg-slate-800 shadow-md p-6
      flex flex-col fixed h-screen transition-colors duration-300">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-gray-900 dark:text-white text-lg">
            CDGI
          </span>
          <span className="font-semibold bg-gradient-to-r
          from-violet-600 via-purple-500 to-indigo-500
          bg-clip-text text-transparent text-lg">
            Margdarshan
          </span>
        </div>

        {/* Menu */}
        <div className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
              ${location.pathname === item.path
                  ? "bg-violet-100 dark:bg-violet-700/30 text-violet-700 dark:text-violet-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-gray-700"
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 py-3
          bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* ── Right Side ── */}
      <div className="flex-1 flex flex-col ml-64">

        {/* Navbar */}
        <div className="h-16 bg-white dark:bg-gray-800 shadow flex items-center
        justify-between px-6 transition-colors duration-300">

          <h2 className="text-lg font-semibold text-violet-700 dark:text-violet-400">
            Admin Panel
          </h2>

          <button
            onClick={() => {
              // console.log("clicked! dark =", dark); // ← add karo
              setDark(!dark);
            }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
  text-gray-600 dark:text-gray-300 transition"
          >
            {dark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900
        text-gray-800 dark:text-gray-100 transition-colors duration-300">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;