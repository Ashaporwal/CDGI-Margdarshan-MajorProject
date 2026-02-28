import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

function ProfilePhoto() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("/api/get");
        setUser(data.user);
      } catch (err) {
        console.log("Failed to fetch user");
      }
    };

    fetchUser();
  }, []);

  // Upload photo
  const handleUpload = async () => {
    if (!photo) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("photo", photo);

      const { data } = await API.put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(data.user);

      // 🔥 IMPORTANT → update localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();

      toast.success("Profile photo updated 🎉");
    } catch (err) {
      toast.error("Photo upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center gap-6">

      <div className="relative">
        <img
          src={
            user?.photo
              ? `http://localhost:3000/uploads/${user.photo}`
              : "/default.avif"
          }
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <label className="absolute bottom-0 right-0 bg-violet-600 text-white p-2 rounded-full cursor-pointer text-xs">
          ✎
          <input
            type="file"
            hidden
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </label>
      </div>

      <div>
        <h3 className="font-semibold text-lg">{user?.name}</h3>
        <p className="text-gray-500 text-sm">{user?.email}</p>

        {photo && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-2 px-4 py-1 text-sm rounded-lg text-white
            bg-gradient-to-r from-violet-500 to-violet-700
            hover:from-violet-600 hover:to-violet-800 transition"
          >
            {loading ? "Uploading..." : "Save Photo"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfilePhoto;