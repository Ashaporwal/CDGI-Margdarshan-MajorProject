import { useState, useEffect } from "react";
import API from "../../services/api.js"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
    const [user, setUser] = useState({});
    const [form, setForm] = useState({ name: "", department: "", graduationYear: "" });
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await API.get("/api/get");
                setUser(data.user);
                setForm({
                    name: data.user.name || "",
                    department: data.user.department || "",
                    graduationYear: data.user.graduationYear || "",
                });
            } catch (err) {
                toast.error("Failed to fetch user data");
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleFileChange = (e) => setPhoto(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("department", form.department);
        formData.append("graduationYear", form.graduationYear);
        if (photo) formData.append("photo", photo);

        try {
         const { data } = await API.put("/api/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(data.message);
            setUser(data.user);
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
      `}</style>

            <div className="auth-container">
                <div className="auth-card">
                    <h2>Update Profile</h2>

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
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Update Profile</button>
                    </form>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default Profile;