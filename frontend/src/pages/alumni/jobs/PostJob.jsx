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
    deadline: "",
    requirements: [""],
    experienceLevel: "",
    minCGPA: "",
    skills: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const updated = [...job.requirements];
    updated[index] = value;
    setJob({ ...job, requirements: updated });
  };

  const addRequirement = () => {
    setJob({
      ...job,
      requirements: [...job.requirements, ""]
    });
  };

  const removeRequirement = (index) => {
    const updated = job.requirements.filter((_, i) => i !== index);
    setJob({ ...job, requirements: updated });
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    const payload = {
      ...job,
      minCGPA: job.minCGPA ? Number(job.minCGPA) : undefined,
      skills: job.skills
        ? job.skills.split(",").map((s) => s.trim())
        : [],
      requirements: job.requirements.filter(r => r.trim() !== "")
    };

    await API.post("/api/jobs", payload);

    toast.success("Job posted successfully 🎉");

    setJob({
      title: "",
      company: "",
      jobType: "",
      location: "",
      salary: "",
      description: "",
      deadline: "",
      requirements: [""],
      experienceLevel: "",
      minCGPA: "",
      skills: ""
    });

  } catch (error) {
    console.log("REAL ERROR:", error.response?.data);
    toast.error(error.response?.data?.message || "Failed to post job");
  }

  setLoading(false);
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Post New Job</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">

          <input name="title" placeholder="Job Title *"
            value={job.title} onChange={handleChange} className="input" />

          <input name="company" placeholder="Company *"
            value={job.company} onChange={handleChange} className="input" />

          <select name="jobType"
            value={job.jobType}
            onChange={handleChange}
            className="input">
            <option value="">Select Job Type *</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
          </select>

          <input name="location" placeholder="Location *"
            value={job.location} onChange={handleChange} className="input" />

          <input name="salary" placeholder="Salary"
            value={job.salary} onChange={handleChange} className="input" />

          <input type="date"
            name="deadline"
            value={job.deadline}
            onChange={handleChange}
            className="input" />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description *"
          value={job.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Requirements */}
        <div>
          <h3 className="font-semibold mb-2">Requirements</h3>
          {job.requirements.map((req, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={req}
                onChange={(e) =>
                  handleRequirementChange(index, e.target.value)
                }
                className="flex-1 input"
                placeholder={`Requirement ${index + 1}`}
              />
              {job.requirements.length > 1 && (
                <button
                  onClick={() => removeRequirement(index)}
                  className="text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addRequirement}
            className="text-violet-600 text-sm mt-2"
          >
            + Add Requirement
          </button>
        </div>

        {/* Qualification */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="experienceLevel"
            value={job.experienceLevel}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1-2 Years">1-2 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>

          <input
            name="minCGPA"
            type="number"
            placeholder="Minimum CGPA"
            value={job.minCGPA}
            onChange={handleChange}
            className="input"
          />
        </div>

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={job.skills}
          onChange={handleChange}
          className="input"
        />

        {/* Submit */}
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
  );
}

export default PostJob;