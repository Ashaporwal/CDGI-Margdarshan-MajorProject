import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import {
    FaTachometerAlt,
    FaBriefcase,
    FaClipboardList,
    FaCalendarAlt,
    FaUser,
    FaBell,
    FaSignOutAlt,
    FaNewspaper,
    FaPlayCircle,
    FaChalkboardTeacher
} from "react-icons/fa";

function StudentLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

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

    const handleLogout = () => {
        localStorage.removeItem("token");
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
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-violet-600 mb-8">
                        Campus Connect
                    </h2>

                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
                ${location.pathname === item.path
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-blue-50 text-gray-700"
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Logout fixed under menu */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <div className="h-16 bg-white shadow flex items-center justify-between px-6">

                    <h2 className="text-lg font-semibold text-blue-600">
                        Student Panel
                    </h2>

                    <div className="flex items-center gap-5">

                        <FaBell className="cursor-pointer text-gray-600" />

                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => navigate("/student/profile")}
                        >
                            <span className="font-medium text-gray-700">
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

                {/* Content Area */}
                <div className="flex-1 p-8">
                    <Outlet />
                </div>

            </div>
        </div>
    );
}

export default StudentLayout;