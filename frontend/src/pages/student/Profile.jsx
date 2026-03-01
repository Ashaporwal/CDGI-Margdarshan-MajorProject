import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
    department: "",
    graduationYear: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch user profile from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await API.get("/student/full-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const merged = {
          ...data.user,
          ...data.studentProfile,
        };
        setUser(merged);

        setForm({
          name: merged.name || "",
          department: merged.department || "",
          graduationYear: merged.graduationYear || "",
        });

        // Show existing profile photo
        if (merged.profilePic) {
          setPreview(merged.profilePic);
        }
      } catch (err) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("department", form.department);
    formData.append("graduationYear", form.graduationYear);

    // append file if selected
    if (photo) formData.append("resume", photo); // backend expects 'resume' field

    try {
      const token = localStorage.getItem("token");
      const { data } = await API.put("/student/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated successfully!");
      // Update local state with latest info
      setUser({ ...user, ...data.profile });

      // Update preview if new photo uploaded
      if (data.profile.profilePic) setPreview(data.profile.profilePic);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <style>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #003366, #00509e);
        }
        .auth-card {
          background: #ffffff;
          width: 450px;
          padding: 35px;
          border-radius: 12px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
          transition: 0.3s ease;
        }
        .auth-card input,
        .auth-card select {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }
        .auth-card button {
          width: 100%;
          padding: 12px;
          background: #003366;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .auth-card button:hover {
          background: #002244;
        }
        .auth-card h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #003366;
        }
        .photo-preview {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 15px;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Update Profile</h2>

          {preview && <img src={preview} alt="preview" className="photo-preview" />}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
            />
            <input
              type="number"
              name="graduationYear"
              placeholder="Graduation Year"
              value={form.graduationYear}
              onChange={handleChange}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Profile;