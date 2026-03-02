import { useEffect, useState } from "react";
import API from "../../../services/api";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/api/jobs");

      const myJobs = data.jobs.filter(
        (job) =>
          String(job.postedBy?._id || job.postedBy) === String(user?.id)
      );

      setJobs(myJobs);
    } catch (error) {
      toast.error("Failed to load jobs");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/api/jobs/${id}`);
      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  // 🔥 CLOSE / REOPEN TOGGLE
  const toggleStatus = async (job) => {
    try {
      await API.put(`/api/jobs/${job._id}`, {
        status: job.status === "active" ? "closed" : "active"
      });

      toast.success(
        job.status === "active"
          ? "Job closed successfully"
          : "Job reopened successfully"
      );

      fetchJobs();
    } catch (error) {
      toast.error("Failed to update status");
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

                  {/* Status Badge */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex items-center gap-4">

                    {/* Edit */}
                    <button
                      onClick={() =>
                        navigate(`/alumni/edit-job/${job._id}`)
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>

                    {/* Close / Reopen */}
                    <button
                      onClick={() => toggleStatus(job)}
                      className={`text-sm px-2 py-1 rounded ${
                        job.status === "active"
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      {job.status === "active"
                        ? "Close"
                        : "Reopen"}
                    </button>

                    {/* Delete */}
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