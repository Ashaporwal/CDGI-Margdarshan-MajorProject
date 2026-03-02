import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      
      <h1 className="text-7xl font-bold text-violet-600 mb-4">
        404
      </h1>

      <p className="text-xl text-gray-600 mb-6">
        Oops! Page not found.
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="Not Found"
        className="w-64 mb-6"
      />

      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;