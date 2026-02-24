import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <h1>Welcome to Dashboard 🎓</h1>

      <button onClick={() => navigate("/profile")}>
        Go to Profile
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;