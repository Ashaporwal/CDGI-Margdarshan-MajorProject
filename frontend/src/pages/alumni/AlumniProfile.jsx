import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import ProfilePhoto from "./ProfilePhoto";

function AlumniProfile() {

  const [profile, setProfile] = useState({
    phone: "",
    location: "",
    company: "",
    designation: "",
    experienceYears: "",
    bio: "",
    skills: "",
    linkedin: "",
    github: "",
    portfolio: "",
    mentorshipAvailable: false,
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/api/alumni/me");

        if (data) {
          setProfile(prev => ({
            ...prev,
            ...data,
            skills: data.skills ? data.skills.join(", ") : "",
            mentorshipAvailable: data.mentorshipAvailable ?? false,
          }));
        }

      } catch (err) {
        console.log("No profile yet");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProfile(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value ?? "",
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await API.put("/api/alumni", {
        ...profile,
        skills: profile.skills
          ? profile.skills.split(",").map(s => s.trim())
          : [],
      });

      toast.success("Profile updated successfully 🎉");

    } catch (err) {
      toast.error("Update failed");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Profile Photo Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <ProfilePhoto />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-gray-500 text-sm">
            Manage your professional information
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 rounded-lg text-white font-medium
          bg-gradient-to-r from-violet-500 to-violet-700
          hover:from-violet-600 hover:to-violet-800 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold mb-4">Professional Information</h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="company"
            placeholder="Current Company"
            value={profile.company || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="designation"
            placeholder="Designation"
            value={profile.designation || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="experienceYears"
            type="number"
            placeholder="Experience Years"
            value={profile.experienceYears || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="location"
            placeholder="Location"
            value={profile.location || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={profile.phone || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <textarea
          name="bio"
          placeholder="Short Bio"
          value={profile.bio || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-4"
        />
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold mb-4">Skills</h2>

        <input
          name="skills"
          placeholder="Add skills (comma separated)"
          value={profile.skills || ""}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="font-semibold mb-4">Social Links</h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            value={profile.linkedin || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="github"
            placeholder="GitHub URL"
            value={profile.github || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="portfolio"
            placeholder="Portfolio Website"
            value={profile.portfolio || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>
      </div>

      {/* Mentorship */}
      <div className="bg-white rounded-xl shadow p-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="mentorshipAvailable"
            checked={profile.mentorshipAvailable ?? false}
            onChange={handleChange}
          />
          <span>Available for mentorship</span>
        </label>
      </div>
    </>
  );
}

export default AlumniProfile;