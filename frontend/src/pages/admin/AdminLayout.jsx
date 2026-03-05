// AdminLayout.jsx
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUser, FaUsers, FaClipboardList, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
// import AdminDashboard from "./AdminDashboard";

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminEmail");
    if (!adminEmail) navigate("/admin/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const sidebarItems = [
    { title: "Dashboard", icon: <FaTachometerAlt />, route: "/admin/dashboard" },
    { title: "Manage Students", icon: <FaUser />, route: "/admin/students" },
    { title: "Manage Alumni", icon: <FaUsers />, route: "/admin/alumni" },
    // { title: "Manage Notices", icon: <FaClipboardList />, route: "/admin/notices" },
    { title: "Manage Notices", icon: <FaClipboardList />, route: "/admin/notices" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-lg shadow-lg flex flex-col p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-10 tracking-tight">Admin Panel</h1>

        <nav className="flex-1 space-y-3">
          {sidebarItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.route}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl font-medium transition-colors
                ${isActive ? "bg-indigo-500 text-white shadow-md" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"}`
              }
            >
              {item.icon} <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-semibold transition-all shadow-md mt-auto"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
         {/* <AdminDashboard/> */}
              <div className="mt-10">
          <Outlet />
        </div>
        <div className="mb-8">
           
          {/* <h2 className="text-3xl font-bold text-gray-700 mb-2">Welcome, Admin!</h2> */}
          {/* <p className="text-gray-500">
            Manage students, alumni, notices, and all campus-related activities from here.
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cards */}
          <NavLink
            to="/admin/students"
            className="flex items-center p-6 rounded-3xl shadow-2xl bg-gradient-to-r from-blue-400 to-blue-600 text-white backdrop-blur-md hover:scale-105 transition-transform"
          >
            <FaUser size={28} className="mr-5" />
            <div>
              <h3 className="text-xl font-bold">Manage Students</h3>
              <p className="opacity-90 text-sm">View and verify student accounts</p>
            </div>
          </NavLink>

          <NavLink
            to="/admin/alumni"
            className="flex items-center p-6 rounded-3xl shadow-2xl bg-gradient-to-r from-green-400 to-green-600 text-white backdrop-blur-md hover:scale-105 transition-transform"
          >
            <FaUsers size={28} className="mr-5" />
            <div>
              <h3 className="text-xl font-bold">Manage Alumni</h3>
              <p className="opacity-90 text-sm">Approve alumni registrations</p>
            </div>
          </NavLink>

          <NavLink
            to="/admin/notices"
            className="flex items-center p-6 rounded-3xl shadow-2xl bg-gradient-to-r from-purple-400 to-purple-600 text-white backdrop-blur-md hover:scale-105 transition-transform"
          >
            <FaClipboardList size={28} className="mr-5" />
            <div>
              <h3 className="text-xl font-bold">Manage Notices</h3>
              <p className="opacity-90 text-sm">Create and update campus notices</p>
            </div>
          </NavLink>
        </div>

        {/* Nested routes will render here */}
   
      </main>
    </div>
  );
}

export default AdminLayout;