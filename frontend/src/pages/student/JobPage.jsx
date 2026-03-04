

import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    jobType: "Full-time",
    location: "",
    salary: "",
    description: "",
    deadline: "",
  });

  const [showForm, setShowForm] = useState(false); // only alumni/admin can see

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // store user role in localStorage after login

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/job", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(data.jobs);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/job", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);
      setForm({
        title: "",
        company: "",
        jobType: "Full-time",
        location: "",
        salary: "",
        description: "",
        deadline: "",
      });
      fetchJobs(); // refresh job list
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-violet-600 text-center md:text-left">
        Jobs
      </h2>

      {/* Job Form */}
      {(role === "admin" || role === "alumni") && (
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-5 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 transition"
          >
            {showForm ? "Close Form" : "Post New Job"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-8 mt-4 rounded-lg shadow-lg space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option>Full-time</option>
                <option>Internship</option>
                <option>Campus Drive</option>
              </select>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <input
                type="text"
                name="salary"
                placeholder="Salary (optional)"
                value={form.salary}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <textarea
                name="description"
                placeholder="Job Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
              <button
                type="submit"
                className="bg-violet-600 text-white px-6 py-3 rounded-lg shadow hover:bg-violet-700 transition w-full"
              >
                Post Job
              </button>
            </form>
          )}
        </div>
      )}

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No jobs available at the moment.
          </p>
        )}

        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-violet-600 mb-1">
              {job.title}
            </h3>
            <p className="text-gray-700 font-medium mb-1">
              {job.company} - {job.location}
            </p>
            <p className="text-gray-500 mb-2">
              <span className="font-semibold">{job.jobType}</span> | Salary:{" "}
              {job.salary || "N/A"}
            </p>
            <p className="text-gray-600 mb-3 line-clamp-3">{job.description}</p>
            <p className="text-sm text-gray-400 mb-1">
              Deadline: {new Date(job.deadline).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Posted by: {job.postedBy?.name || "Unknown"}
            </p>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default JobPage;

// import { useState, useEffect } from "react";
// import API from "../../services/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function JobPage() {
//   const [jobs, setJobs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     company: "",
//     jobType: "Full-time",
//     location: "",
//     salary: "",
//     description: "",
//     deadline: "",
//   });

//   const [showForm, setShowForm] = useState(false); // only alumni/admin can see

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); // store user role in localStorage after login

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const { data } = await API.get("/job", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setJobs(data.jobs);
//     } catch (err) {
//       toast.error("Failed to fetch jobs");
//     }
//   };

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post("/job", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success(data.message);
//       setForm({
//         title: "",
//         company: "",
//         jobType: "Full-time",
//         location: "",
//         salary: "",
//         description: "",
//         deadline: "",
//       });
//       fetchJobs(); // refresh job list
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to post job");
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-violet-600">Jobs</h2>

//       {role === "admin" || role === "alumni" ? (
//         <div className="mb-8">
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="px-4 py-2 bg-violet-600 text-white rounded-lg mb-4"
//           >
//             {showForm ? "Close Form" : "Post New Job"}
//           </button>

//           {showForm && (
//             <form
//               onSubmit={handleSubmit}
//               className="bg-white p-6 rounded-lg shadow-md space-y-4"
//             >
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Job Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company Name"
//                 value={form.company}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <select
//                 name="jobType"
//                 value={form.jobType}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               >
//                 <option>Full-time</option>
//                 <option>Internship</option>
//                 <option>Campus Drive</option>
//               </select>
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Location"
//                 value={form.location}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="salary"
//                 placeholder="Salary (optional)"
//                 value={form.salary}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Job Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="date"
//                 name="deadline"
//                 value={form.deadline}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <button type="submit" className="bg-violet-600 text-white px-4 py-2 rounded">
//                 Post Job
//               </button>
//             </form>
//           )}
//         </div>
//       ) : null}

//       {/* Job Listings */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {jobs.map((job) => (
//           <div key={job._id} className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-violet-600">{job.title}</h3>
//             <p className="text-gray-700">{job.company} - {job.location}</p>
//             <p className="text-gray-500">{job.jobType} | Salary: {job.salary || "N/A"}</p>
//             <p className="mt-2">{job.description}</p>
//             <p className="mt-2 text-sm text-gray-400">
//               Deadline: {new Date(job.deadline).toLocaleDateString()}
//             </p>
//             {/* <p className="mt-1 text-sm text-gray-500">Posted by: {job.postedBy.name}</p>
//              */}
//              <p className="mt-1 text-sm text-gray-500">
//   Posted by: {job.postedBy?.name || "Unknown"}
// </p>
//           </div>
//         ))}
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default JobPage;