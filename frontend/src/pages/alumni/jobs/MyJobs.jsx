import { useEffect, useState } from "react";
import API from "../../../services/api";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch my jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/api/jobs/my");
      setJobs(data);
    } catch (error) {
      toast.error("Failed to load jobs");
    }
    setLoading(false);
  };

  // Delete job
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await API.delete(`/api/jobs/${id}`);
      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Job Postings</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Location</th>
                <th className="p-4">Type</th>
                <th className="p-4">Salary</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-t">
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4">{job.location}</td>
                  <td className="p-4">{job.jobType}</td>
                  <td className="p-4">{job.salary || "-"}</td>
                  <td className="p-4">
                    {new Date(job.deadline).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default MyJobs;