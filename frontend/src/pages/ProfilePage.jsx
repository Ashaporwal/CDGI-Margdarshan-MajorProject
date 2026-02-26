import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API from "../services/api";
import "react-toastify/dist/ReactToastify.css";

import {
  FaTachometerAlt, FaBriefcase, FaFileAlt, FaCalendarAlt,
  FaChalkboardTeacher, FaUsers, FaUser, FaBell, FaSun, FaMoon,
  FaEnvelope, FaUserAlt, FaBirthdayCake, FaUpload
} from "react-icons/fa";

function ProfilePage() {
  const navigate = useNavigate();
  const [darkTheme, setDarkTheme] = useState(false);
  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setPersonal({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        dob: parsedUser.dob || "",
        gender: parsedUser.gender || "",
      });
    }
  }, []);

  const toggleTheme = () => setDarkTheme(!darkTheme);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handleSavePersonal = () => {
    toast.info("Personal Information Saved! (API call can be implemented)");
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
        
      const { data } = await API.put("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("Profile photo updated!");
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Photo update failed");
    }
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
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="left-panel">
          <h2>Campus Connect</h2>
          {menuItems.map((item) => (
            <div key={item.name} className="menu-item" onClick={() => navigate(item.path)}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="navbar">
            <div className="navbar-left">
              <h2>Campus Connect</h2>
            </div>
            <div className="navbar-right">
              <button onClick={toggleTheme}>{darkTheme ? <FaSun /> : <FaMoon />}</button>
              <button><FaBell /></button>
              <div className="profile-section" onClick={() => navigate("/profile")}>
                <span style={{ fontWeight: "500" }}>{user?.name}</span>
                {/* <img
                  src={user?.photo ? `http://localhost:3000/uploads/${user.photo}` : "https://via.placeholder.com/38"}
                  alt="profile"
                  className="profile-img"
                /> */}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="content-area">
            <h2>My Profile</h2>
            <p>Manage your profile information and preferences</p>

            {/* Profile Card */}
            <div className="profile-card">
              <div className="save-action">
                <button onClick={() => toast.info("Save Changes clicked")} className="save-btn">Save Changes</button>
              </div>

              <div className="profile-left">
                {/* <img
                  src={user?.photo ? `http://localhost:3000/uploads/${user.photo}` : "https://via.placeholder.com/90"}
                  alt="profile"
                  className="profile-main-pic"
                /> */}
                <label htmlFor="photo-upload" className="upload-icon">
                  <FaUpload />
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
              </div>

              <div className="profile-right">
                <p className="profile-info"><strong>Name:</strong> {user?.name}</p>
                <p className="profile-info"><FaEnvelope /> {user?.email}</p>
                <p className="profile-info"><strong>Batch:</strong> {user?.graduationYear}</p>
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="personal-card">
              <div className="card-icon-wrapper">
                <FaUserAlt className="card-icon"/>
              </div>
              <div className="personal-form">
                <div className="personal-row">
                  <input type="text" name="firstName" placeholder="First Name" value={personal.firstName} onChange={handlePersonalChange}/>
                  <input type="text" name="lastName" placeholder="Last Name" value={personal.lastName} onChange={handlePersonalChange}/>
                </div>
                <div className="personal-row">
                  <input type="email" name="email" placeholder="Email" value={personal.email} onChange={handlePersonalChange}/>
                  <input type="text" name="phone" placeholder="Phone Number" value={personal.phone} onChange={handlePersonalChange}/>
                </div>
                <div className="personal-row">
                  <input type="date" name="dob" value={personal.dob} onChange={handlePersonalChange}/>
                  <select name="gender" value={personal.gender} onChange={handlePersonalChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button className="save-btn-personal" onClick={handleSavePersonal}>Save Changes</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <style>{`
        .dashboard-container { display:flex; min-height:100vh; font-family:'Segoe UI',Helvetica,sans-serif; }
        .left-panel { width:260px; background:#fff; padding:20px; box-shadow:2px 0 5px rgba(0,0,0,0.1);}
        .left-panel h2 { margin-bottom:25px; color:#00509e; }
        .menu-item { display:flex; align-items:center; padding:12px; margin-bottom:10px; cursor:pointer; border-radius:6px; transition:0.3s; color:#333; font-weight:500;}
        .menu-item:hover { background-color:#f2f2f2;}
        .menu-item span { margin-left:12px;}
        .logout-button { margin-top:20px; width:100%; padding:12px; border:none; border-radius:6px; background:#00509e; color:#fff; cursor:pointer; font-size:15px;}
        .right-panel { flex:1; background-color:${darkTheme ? "#1f1f1f" : "#f5f6fa"}; display:flex; flex-direction:column;}
        .navbar { height:60px; background-color:${darkTheme ? "#2c2c2c" : "#fff"}; display:flex; align-items:center; justify-content:space-between; padding:0 25px; box-shadow:0 2px 5px rgba(0,0,0,0.08);}
        .navbar-left h2 { margin:0; color:${darkTheme ? "#fff" : "#00509e"};}
        .navbar-right { display:flex; align-items:center;}
        .navbar-right button { background:none; border:none; margin:0 12px; font-size:18px; cursor:pointer; color:${darkTheme ? "#fff" : "#333"};}
        .profile-section { display:flex; align-items:center; cursor:pointer;}
        .profile-img { width:38px; height:38px; border-radius:50%; object-fit:cover; margin-left:10px;}
        .content-area { padding:30px; color:${darkTheme ? "#fff" : "#000"}; flex:1;}

        /* Profile Card */
        .profile-card { display:flex; background:#fff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.1); padding:15px 20px; width:100%; height:120px; gap:20px; align-items:center; position:relative; margin-bottom:20px;}
        .save-action { position:absolute; top:10px; right:20px; }
        .save-btn { padding:6px 12px; border:none; border-radius:6px; background:#003366; color:#fff; cursor:pointer; font-size:13px; }
        .profile-left { flex:0 0 100px; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .profile-main-pic { width:90px; height:90px; border-radius:50%; object-fit:cover; }
        .profile-right { flex:1; display:flex; flex-direction:column; justify-content:center; gap:12px; }
        .profile-info { margin:0; color:grey; font-weight:500; font-size:14px; display:flex; align-items:center; gap:6px; }
        .upload-icon { margin-top:6px; font-size:18px; color:#003366; cursor:pointer; display:inline-block; }

        /* Personal Info Card */
        .personal-card { display:flex; background:#fff; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.1); padding:20px; gap:20px; margin-top:20px; align-items:flex-start; }
        .card-icon-wrapper { flex:0 0 40px; display:flex; justify-content:center; align-items:flex-start; margin-top:5px; }
        .card-icon { font-size:28px; color:#003366; }
        .personal-form { flex:1; display:flex; flex-direction:column; gap:12px; }
        .personal-row { display:flex; gap:12px; }
        .personal-row input, .personal-row select { flex:1; padding:8px; border-radius:6px; border:1px solid #ccc; }
        .save-btn-personal { align-self:flex-start; padding:6px 12px; border:none; border-radius:6px; background:#003366; color:#fff; cursor:pointer; font-size:13px; }
      `}</style>
    </>
  );
}

export default ProfilePage;