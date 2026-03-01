import { useState } from "react";
import API from "../../../services/api";
import { toast } from "react-toastify";

function PostJob() {
  const [loading, setLoading] = useState(false);

  const [job, setJob] = useState({
    title: "",
    company: "",
    jobType: "",
    location: "",
    salary: "",
    description: "",
    deadline: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await API.post("/api/jobs", job);

      toast.success("Job posted successfully 🎉");

      // Reset form
      setJob({
        title: "",
        company: "",
        jobType: "",
        location: "",
        salary: "",
        description: "",
        deadline: ""
      });

    } catch (error) {
      toast.error("Failed to post job");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Post New Job</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">

          <input
            name="title"
            placeholder="Job Title *"
            value={job.title}
            onChange={handleChange}
            className="input"
          />

          <input
            name="company"
            placeholder="Company *"
            value={job.company}
            onChange={handleChange}
            className="input"
          />

          <select
            name="jobType"
            value={job.jobType}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Job Type *</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
            <option value="Campus Drive">Campus Drive</option>
          </select>

          <input
            name="location"
            placeholder="Location *"
            value={job.location}
            onChange={handleChange}
            className="input"
          />

          <input
            name="salary"
            placeholder="Salary (optional)"
            value={job.salary}
            onChange={handleChange}
            className="input"
          />

          <input
            type="date"
            name="deadline"
            value={job.deadline}
            onChange={handleChange}
            className="input"
          />

        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description *"
          value={job.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded-lg text-white
            bg-gradient-to-r from-violet-500 to-violet-700"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default PostJob;