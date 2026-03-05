// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import { toast } from "react-toastify";
// import { FaEnvelope, FaUser } from "react-icons/fa";

// function Profile({ onUserLoad }) {

// const [user,setUser] = useState(null);
// const [photo,setPhoto] = useState(null);
// const [loading,setLoading] = useState(false);

// useEffect(()=>{

// const fetchUser = async()=>{

// try{

// const {data} = await API.get("/api/student/full-profile");

// setUser(data.user);

// if(onUserLoad){
// onUserLoad(data.user);
// }

// }catch{

// toast.error("Failed to load profile");

// }

// };

// fetchUser();

// },[]);

// const handleUpload = async()=>{

// if(!photo) return;

// try{

// setLoading(true);

// const formData = new FormData();
// formData.append("photo",photo);

// const {data} = await API.put("/api/profile",formData,{
// headers:{ "Content-Type":"multipart/form-data" }
// });

// setUser(data.user);

// localStorage.setItem("user",JSON.stringify(data.user));

// toast.success("Photo updated");

// }catch{

// toast.error("Upload failed");

// }

// setLoading(false);

// };

// return(

// <div className="bg-white rounded-xl shadow p-6">

// <div className="flex items-center gap-6">

// <div className="relative">

// <img
// src={
// user?.photo
// ? `http://localhost:3000/uploads/photos/${user.photo}`
// : "/default.avif"
// }
// alt="profile"
// className="w-24 h-24 rounded-full object-cover border"
// />

// <label className="absolute bottom-0 right-0 bg-violet-600 text-white p-2 rounded-full cursor-pointer text-xs">

// ✎

// <input
// type="file"
// hidden
// onChange={(e)=>setPhoto(e.target.files[0])}
// />

// </label>

// </div>

// <div>

// <h3 className="text-xl font-semibold">{user?.name}</h3>

// <p className="text-gray-500 text-sm">
// {user?.department} • Batch {user?.graduationYear}
// </p>

// <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
// <FaEnvelope/> {user?.email}
// </p>

// {photo && (

// <button
// onClick={handleUpload}
// disabled={loading}
// className="mt-2 px-4 py-1 rounded-lg text-white bg-violet-600 hover:bg-violet-700"
// >

// {loading ? "Uploading..." : "Save Photo"}

// </button>

// )}

// </div>

// </div>

// {/* PERSONAL INFO */}

// <div className="mt-6">

// <h2 className="flex items-center gap-2 font-semibold mb-4">

// <FaUser className="text-blue-500"/>

// Personal Information

// </h2>

// <div className="grid grid-cols-2 gap-4">

// <input
// value={user?.name || ""}
// readOnly
// className="border p-3 rounded-lg bg-gray-100"
// />

// <input
// value={user?.email || ""}
// readOnly
// className="border p-3 rounded-lg bg-gray-100"
// />

// <input
// value={user?.department || ""}
// readOnly
// className="border p-3 rounded-lg bg-gray-100"
// />

// <input
// value={user?.graduationYear || ""}
// readOnly
// className="border p-3 rounded-lg bg-gray-100"
// />

// </div>

// </div>

// </div>

// );

// }

// export default Profile;

import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";

function Profile() {

  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const { data } = await API.get("/api/student/full-profile");
        setUser(data.user);

      } catch {

        toast.error("Failed to load profile");

      }

    };

    fetchUser();

  }, []);

  const handleUpload = async () => {

    if (!photo) return;

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("photo", photo);

      const { data } = await API.put("/api/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Photo updated");

    } catch {

      toast.error("Upload failed");

    }

    setLoading(false);

  };

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center gap-6">

        <div className="relative">

          <img
            src={
              user?.photo
                ? `http://localhost:3000/uploads/photos/${user.photo}`
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

          <h3 className="text-xl font-semibold">{user?.name}</h3>

          <p className="text-gray-500 text-sm">
            {user?.department} • Batch {user?.graduationYear}
          </p>

          <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <FaEnvelope /> {user?.email}
          </p>

          {photo && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-2 px-4 py-1 rounded-lg text-white bg-violet-600 hover:bg-violet-700"
            >
              {loading ? "Uploading..." : "Save Photo"}
            </button>
          )}

        </div>

      </div>

    </div>

  );

}

export default Profile;