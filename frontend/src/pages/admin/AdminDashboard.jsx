import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminEmail");
    if (!adminEmail) navigate("/admin/login"); // protect route
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>
      <p>Here you can manage users, notices, alumni, etc.</p>
    </div>
  );
}

export default AdminDashboard;