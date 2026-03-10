import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaTachometerAlt
} from "react-icons/fa";

function AdminLayout() {

  const navigate = useNavigate();
  const location = useLocation();

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
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col fixed h-screen">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">

  <span className="text-2xl">🎓</span>

  <span className="font-bold text-gray-900 text-lg">
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
              ${
                location.pathname === item.path
                  ? "bg-violet-100 text-violet-700 font-semibold"
                  : "text-gray-700 hover:bg-violet-50"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>

          ))}

        </div>

        {/* Logout */}
        {/* <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 py-3 
bg-gray-800 text-white rounded-xl 
hover:bg-gray-900 transition"
        >
          <FaSignOutAlt />
          Logout
        </button> */}
        <button
  onClick={handleLogout}
  className="flex items-center justify-center gap-2 py-3
  bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition"
>
  <FaSignOutAlt />
  Logout
</button>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col ml-64">

        {/* Navbar */}
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">

          <h2 className="text-lg font-semibold text-violet-700">
            Admin
          </h2>

        </div>

        {/* Content */}
        <div className="flex-1 p-8">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default AdminLayout;

