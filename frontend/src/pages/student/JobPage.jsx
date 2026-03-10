// import { useState, useEffect } from "react";
// import API from "../../services/api";
// import { toast, ToastContainer } from "react-toastify";
// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// function JobPage() {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     company: "",
//     jobType: "Full-time",
//     location: "",
//     salary: "",
//     description: "",
//     deadline: "",
//   });

//   const [showForm, setShowForm] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("All");

//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     filterJobs();
//   }, [searchQuery, filterType, jobs]);

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

//   const filterJobs = () => {
//     let temp = jobs;
//     if (searchQuery) {
//       temp = temp.filter(
//         (job) =>
//           job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           job.location.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     if (filterType !== "All") {
//       temp = temp.filter((job) => job.jobType === filterType);
//     }
//     setFilteredJobs(temp);
//   };

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
//       fetchJobs();
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to post job");
//     }
//   };

//   return (
//     <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">Jobs</h2>

//       {/* Job Form */}
//       {(role === "admin" || role === "alumni") && (
//         <div className="mb-8 text-center md:text-left">
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             {showForm ? "Close Form" : "Post New Job"}
//           </button>

//           {showForm && (
//             <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 mt-4 rounded-lg shadow space-y-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Job Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="text"
//                 name="company"
//                 placeholder="Company Name"
//                 value={form.company}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <select
//                 name="jobType"
//                 value={form.jobType}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="text"
//                 name="salary"
//                 placeholder="Salary (optional)"
//                 value={form.salary}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <textarea
//                 name="description"
//                 placeholder="Job Description"
//                 value={form.description}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="date"
//                 name="deadline"
//                 value={form.deadline}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition w-full"
//               >
//                 Post Job
//               </button>
//             </form>
//           )}
//         </div>
//       )}

//       {/* Search & Filter */}
//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <input
//           type="text"
//           placeholder="Search by title, company, location..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <div className="flex gap-2">
//           {["All", "Full-time", "Internship", "Campus Drive"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilterType(type)}
//               className={`px-4 py-2 rounded-lg border ${
//                 filterType === type
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300"
//               } transition`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Job Listings */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredJobs.length === 0 && (
//           <p className="text-gray-500 col-span-full text-center">No jobs match your search/filter.</p>
//         )}

//         {filteredJobs.map((job) => {
//           const daysLeft = Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24));
//           return (
//             <div
//               key={job._id}
//               className="bg-white p-5 rounded-lg shadow hover:shadow-md transition transform hover:-translate-y-1"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
//               <p className="text-gray-600 mb-1">{job.company} - {job.location}</p>
//               <p className="text-gray-500 mb-2">{job.jobType} | Salary: {job.salary || "N/A"}</p>
//               <p className="text-gray-700 mb-3 line-clamp-3">{job.description}</p>
//               <p className={`text-sm mb-1 ${daysLeft <= 3 ? "text-red-500 font-semibold" : "text-gray-400"}`}>
//                 Deadline: {new Date(job.deadline).toLocaleDateString()} {daysLeft <= 3 ? `(Hurry! ${daysLeft} days left)` : ""}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Posted by: {job.postedBy ? (
//                   <Link to={`/profile/${job.postedBy._id}`} className="text-blue-600 hover:underline">
//                     {job.postedBy.name}
//                   </Link>
//                 ) : "Unknown"}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default JobPage;


import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function JobPage() {

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    company: "",
    jobType: "Full-time",
    location: "",
    salary: "",
    description: "",
    deadline: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  useEffect(()=>{
    fetchJobs();
  },[]);


  useEffect(()=>{
    filterJobs();
  },[searchQuery,filterType,jobs]);


  const fetchJobs = async()=>{
    try{

      const {data} = await API.get("/api/jobs",{
        headers:{Authorization:`Bearer ${token}`}
      });

      setJobs(data.jobs);

    }catch{
      toast.error("Failed to fetch jobs");
    }
  };


  const filterJobs = ()=>{

    let temp = jobs;

    if(searchQuery){

      temp = temp.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );

    }

    if(filterType !== "All"){
      temp = temp.filter(job => job.jobType === filterType);
    }

    setFilteredJobs(temp);

  };


  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };


  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      const {data} = await API.post("/api/jobs",form,{
        headers:{Authorization:`Bearer ${token}`}
      });

      toast.success(data.message);

      setForm({
        title:"",
        company:"",
        jobType:"Full-time",
        location:"",
        salary:"",
        description:"",
        deadline:""
      });

      fetchJobs();
      setShowForm(false);

    }catch(err){

      toast.error(err.response?.data?.message || "Failed to post job");

    }

  };


  return (

<div className="p-6 md:p-10 bg-gray-50 min-h-screen">

<h2 className="text-3xl font-bold mb-6 text-gray-800">
Job Opportunities
</h2>



{/* Post Job Button */}

{(role === "admin" || role === "alumni") && (

<div className="mb-6">

<button
onClick={()=>setShowForm(!showForm)}
className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
>

{showForm ? "Close Form" : "Post New Job"}

</button>


{showForm && (

<form
onSubmit={handleSubmit}
className="bg-white p-6 mt-4 rounded-xl shadow space-y-4"
>

<input
type="text"
name="title"
placeholder="Job Title"
value={form.title}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
/>

<input
type="text"
name="company"
placeholder="Company"
value={form.company}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
/>

<select
name="jobType"
value={form.jobType}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
>

<option>Full-time</option>
<option>Internship</option>

</select>

<input
type="text"
name="location"
placeholder="Location"
value={form.location}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
/>

<input
type="text"
name="salary"
placeholder="Salary"
value={form.salary}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
/>

<textarea
name="description"
placeholder="Job Description"
value={form.description}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
/>

<input
type="date"
name="deadline"
value={form.deadline}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
/>

<button
className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
>

Post Job

</button>

</form>

)}

</div>

)}



{/* Search + Filter */}

<div className="flex flex-col md:flex-row gap-4 mb-6">

<input
type="text"
placeholder="Search jobs..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
className="border p-3 rounded-lg w-full md:w-1/2"
/>


<div className="flex gap-2">

{["All","Full-time","Internship"].map(type => (

<button
key={type}
onClick={()=>setFilterType(type)}
className={`px-4 py-2 rounded-lg border ${
filterType === type
? "bg-blue-600 text-white"
: "bg-white"
}`}
>

{type}

</button>

))}

</div>

</div>



{/* Job Cards */}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{filteredJobs.length === 0 && (

<p className="text-gray-500 col-span-full">
No jobs available
</p>

)}



{filteredJobs.map(job=>{

const daysLeft = Math.ceil(
(new Date(job.deadline) - new Date())/(1000*60*60*24)
);

return(

<div
key={job._id}
className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
>

<div className="flex justify-between items-start mb-2">

<h3 className="text-lg font-semibold">
{job.title}
</h3>

<span
className={`text-xs px-3 py-1 rounded-full ${
job.jobType === "Internship"
? "bg-purple-100 text-purple-600"
: "bg-green-100 text-green-600"
}`}
>

{job.jobType}

</span>

</div>



<p className="text-gray-700 font-medium">
{job.company}
</p>

<p className="text-gray-500 text-sm">
{job.location}
</p>



{job.salary && (

<span className="inline-block mt-2 text-xs bg-gray-100 px-3 py-1 rounded">
Salary: {job.salary}
</span>

)}



<p className="text-gray-600 mt-3 text-sm line-clamp-3">
{job.description}
</p>



<p className={`text-sm mt-3 ${
daysLeft <= 3 ? "text-red-500 font-semibold" : "text-gray-500"
}`}>

Deadline: {new Date(job.deadline).toLocaleDateString()}

{daysLeft <= 3 && ` (Only ${daysLeft} days left)`}

</p>



<p className="text-xs text-gray-400 mt-2">

Posted by: {job.postedBy?.name}

</p>

</div>

);

})}

</div>

<ToastContainer/>

</div>

  );

}

export default JobPage;