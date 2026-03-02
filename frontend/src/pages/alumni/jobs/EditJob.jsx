import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../services/api";
import { toast } from "react-toastify";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const { data } = await API.get(`/api/jobs/${id}`);
      const jobData = data.job || data;

      setJob({
        title: jobData.title || "",
        company: jobData.company || "",
        jobType: jobData.jobType || "",
        location: jobData.location || "",
        salary: jobData.salary || "",
        description: jobData.description || "",
        deadline: jobData.deadline
          ? jobData.deadline.split("T")[0]
          : "",
        requirements:
          jobData.requirements && jobData.requirements.length > 0
            ? jobData.requirements
            : [""],
        experienceLevel: jobData.experienceLevel || "",
        minCGPA: jobData.minCGPA || "",
        skills:
          jobData.skills && jobData.skills.length > 0
            ? jobData.skills.join(", ")
            : ""
      });

    } catch (error) {
      toast.error("Failed to load job");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prev => ({
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

  const handleUpdate = async () => {
    try {
      const payload = {
        ...job,
        minCGPA: job.minCGPA ? Number(job.minCGPA) : undefined,
        skills: job.skills
          ? job.skills.split(",").map(s => s.trim())
          : [],
        requirements: job.requirements.filter(r => r.trim() !== "")
      };

      await API.put(`/api/jobs/${id}`, payload);

      toast.success("Job updated successfully 🎉");
      navigate("/alumni/my-jobs");

    } catch (error) {
      console.log("Update Error:", error.response?.data);
      toast.error("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
  <div className="max-w-5xl mx-auto py-8">

    <h1 className="text-3xl font-bold mb-8 text-gray-800">
      Edit Job Posting
    </h1>

    <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8">

      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Basic Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Job Title
            </label>
            <input
              name="title"
              value={job.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Company
            </label>
            <input
              name="company"
              value={job.company}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Job Type
            </label>
            <select
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Location
            </label>
            <input
              name="location"
              value={job.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Salary
            </label>
            <input
              name="salary"
              value={job.salary}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={job.deadline}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Job Description
        </h2>
        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
        />
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Requirements
        </h2>

        {job.requirements.map((req, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              value={req}
              onChange={(e) =>
                handleRequirementChange(index, e.target.value)
              }
              className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />
            {job.requirements.length > 1 && (
              <button
                onClick={() => removeRequirement(index)}
                className="text-red-500 font-semibold"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addRequirement}
          className="text-violet-600 text-sm font-medium mt-2"
        >
          + Add Requirement
        </button>
      </div>

      {/* Qualifications */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Qualifications
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={job.experienceLevel}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            >
              <option value="">Select Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Minimum CGPA
            </label>
            <input
              name="minCGPA"
              type="number"
              value={job.minCGPA}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Required Skills (comma separated)
          </label>
          <input
            name="skills"
            value={job.skills}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500 outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          onClick={() => navigate("/alumni/my-jobs")}
          className="px-6 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-violet-500 to-violet-700 hover:opacity-90"
        >
          Update Job
        </button>
      </div>

    </div>
  </div>
);
  
}

export default EditJob;