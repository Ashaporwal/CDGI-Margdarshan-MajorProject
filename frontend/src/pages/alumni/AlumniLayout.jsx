import { Outlet, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { useEffect, useState } from "react";
import {
    FaTachometerAlt,
    FaBriefcase,
    FaUsers,
    FaChalkboardTeacher,
FaClipboardList,
    FaUser,
    FaBell,
    FaMoon,
    FaSun,
} from "react-icons/fa";

function AlumniLayout() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dark, setDark] = useState(false);

    // Always sync with localStorage
    // useEffect(() => {
    //     const loadUser = () => {
    //         const stored = localStorage.getItem("user");
    //         if (stored) setUser(JSON.parse(stored));
    //         const parsed = JSON.parse(stored);
    //         setUser(parsed);
    //     };
    //     console.log("USER DATA:", user);
    //     loadUser();
    //     // window.addEventListener("storage", loadUser);

    //     // return () => {
    //     //   window.removeEventListener("storage", loadUser);

    //     const interval = setInterval(loadUser, 500);

    //     return () => clearInterval(interval);
    // }, []);

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
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "/alumni/dashboard" },
        { name: "Post Job", icon: <FaBriefcase />, path: "/alumni/post-job" },
        { name: "My Jobs", icon: <FaClipboardList />, path: "/alumni/my-jobs" },
        { name: "Mentorship", icon: <FaChalkboardTeacher />, path: "/alumni/mentorship" },
        { name: "Alumni Network", icon: <FaUsers />, path: "/alumni/network" },
        { name: "Profile", icon: <FaUser />, path: "/alumni/profile" },
    ];



    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md p-6 flex flex-col">
                <h2 className="text-xl font-bold text-violet-600 mb-6">
                    Campus Connect
                </h2>

                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-violet-50 transition"
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                ))}

                {/* Logout directly under Profile */}
                <button onClick={handleLogout} className="mt-6 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition" > Logout </button>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <div className="h-16 bg-white shadow flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold text-violet-600">
                        Alumni Panel
                    </h2>

                    <div className="flex items-center gap-5">
                        <button onClick={() => setDark(!dark)}>
                            {dark ? <FaSun /> : <FaMoon />}
                        </button>

                        <FaBell className="cursor-pointer" />

                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => navigate("/alumni/profile")}
                        >
                            <img
                                src={
                                    user?.photo
                                        ? `http://localhost:3000/uploads/${user.photo}`
                                        : "/default.avif"
                                }
                                alt="profile"
                                className="w-9 h-9 rounded-full object-cover border"
                            />
                            <span className="font-medium text-gray-700">
                                {user?.name}
                            </span>
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

export default AlumniLayout;