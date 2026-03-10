import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

function ManageStudents() {

  const [students,setStudents] = useState([]);
  const [filtered,setFiltered] = useState([]);

  const [search,setSearch] = useState("");
  const [batch,setBatch] = useState("");
  const [dept,setDept] = useState("");

  const [page,setPage] = useState(1);

  const itemsPerPage = 10;


  useEffect(()=>{
    fetchStudents();
  },[]);


  const fetchStudents = async()=>{

    try{

      const res = await API.get("/api/admin/students");

      setStudents(res.data.profiles);
      setFiltered(res.data.profiles);

    }catch{

      toast.error("Failed to fetch students");

    }

  };


  useEffect(()=>{

    let data = students;

    if(search){

      data = data.filter((s)=>
        s.userId?.name?.toLowerCase().includes(search.toLowerCase())
      );

    }

    if(batch){

      data = data.filter(
        (s)=> String(s.userId?.graduationYear) === batch
      );

    }

    if(dept){

      data = data.filter(
        (s)=> s.userId?.department === dept
      );

    }

    setFiltered(data);
    setPage(1);

  },[search,batch,dept,students]);


  const updateStatus = async(id,status)=>{

    try{

      await API.patch(`/api/admin/student-status/${id}`,{status});

      toast.success(`Student ${status}`);
      fetchStudents();

    }catch{

      toast.error("Status update failed");

    }

  };


  const deleteStudent = async(id)=>{

    if(!window.confirm("Delete this student?")) return;

    try{

      await API.delete(`/api/admin/student/${id}`);

      toast.success("Student deleted");
      fetchStudents();

    }catch{

      toast.error("Delete failed");

    }

  };


  const start = (page-1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedStudents = filtered.slice(start,end);

  const totalPages = Math.ceil(filtered.length/itemsPerPage);

  return (

<div className="p-6">

<h2 className="text-2xl font-bold mb-6 text-gray-700">
Student Management
</h2>



{/* Filters */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

<input
type="text"
placeholder="Search by name"
className="border rounded-lg p-2"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>


<select
className="border rounded-lg p-2"
value={batch}
onChange={(e)=>setBatch(e.target.value)}
>

<option value="">Batch</option>
<option value="2020">2020</option>
<option value="2021">2021</option>
<option value="2022">2022</option>
<option value="2023">2023</option>
<option value="2024">2024</option>
<option value="2025">2025</option>
<option value="2026">2026</option>

</select>


<select
className="border rounded-lg p-2"
value={dept}
onChange={(e)=>setDept(e.target.value)}
>

<option value="">Department</option>
<option value="CSE">CSE</option>
<option value="IT">IT</option>
<option value="ECE">ECE</option>
<option value="ME">ME</option>
<option value="CE">CE</option>

</select>


<button
onClick={()=>{setSearch("");setBatch("");setDept("");}}
className="bg-gray-200 rounded-lg font-medium"
>

Clear Filters

</button>

</div>



{/* Table */}

<div className="overflow-x-auto bg-white rounded-xl shadow">

<table className="min-w-full text-sm">

<thead className="bg-gray-100 text-gray-700">

<tr>

<th className="p-3 text-left">Name</th>
<th>Email</th>
<th>Course</th>
<th>Batch</th>
<th>Department</th>
<th>Status</th>
<th className="text-center">Actions</th>

</tr>

</thead>



<tbody>

{paginatedStudents.length === 0 && (

<tr>

<td colSpan="7" className="text-center p-6 text-gray-500">

No students found

</td>

</tr>

)}



{paginatedStudents.map((s)=>(

<tr key={s._id} className="border-t hover:bg-gray-50">

<td className="p-3 font-medium">
{s.userId?.name}
</td>

<td>{s.userId?.email}</td>

<td>{s.course}</td>

<td className="text-center">
{s.userId?.graduationYear}
</td>

<td>
{s.userId?.department}
</td>


<td className="text-center">

<span
className={`px-3 py-1 text-xs font-medium rounded-full ${
s.status === "Verified"
? "bg-green-100 text-green-700"
: s.status === "Rejected"
? "bg-red-100 text-red-700"
: "bg-yellow-100 text-yellow-700"
}`}
>

{s.status || "Pending"}

</span>

</td>



<td>

<div className="flex justify-center gap-3">

{s.status === "Pending" && (

<>

<button
onClick={()=>updateStatus(s._id,"Verified")}
className="text-green-600 hover:scale-110"
>

<FaCheck/>

</button>

<button
onClick={()=>updateStatus(s._id,"Rejected")}
className="text-yellow-600 hover:scale-110"
>

<FaTimes/>

</button>

</>

)}



<button
onClick={()=>deleteStudent(s._id)}
className="text-red-600 hover:scale-110"
>

<FaTrash/>

</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>



{/* Pagination */}

<div className="flex justify-center items-center gap-4 mt-6">

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
className="bg-gray-200 px-3 py-1 rounded"
>

Prev

</button>

<span>

Page {page} / {totalPages || 1}

</span>

<button
disabled={page===totalPages}
onClick={()=>setPage(page+1)}
className="bg-gray-200 px-3 py-1 rounded"
>

Next

</button>

</div>

</div>

  );
}

export default ManageStudents;


// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import { toast } from "react-toastify";
// import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

// function ManageStudents() {

//   const [students,setStudents] = useState([]);
//   const [filtered,setFiltered] = useState([]);

//   const [search,setSearch] = useState("");
//   const [batch,setBatch] = useState("");

//   const [page,setPage] = useState(1);

//   const itemsPerPage = 10;



//   useEffect(()=>{
//     fetchStudents();
//   },[]);



//   const fetchStudents = async()=>{

//     try{

//       const res = await API.get("/api/admin/students");

//       setStudents(res.data.profiles);
//       setFiltered(res.data.profiles);

//     }catch{

//       toast.error("Failed to fetch students");

//     }

//   };



//   useEffect(()=>{

//     let data = students;

//     if(search){

//       data = data.filter((s)=>
//         s.userId?.name?.toLowerCase().includes(search.toLowerCase())
//       );

//     }

//     if(batch){

//       data = data.filter(
//         (s)=> String(s.userId?.graduationYear) === batch
//       );

//     }

//     setFiltered(data);
//     setPage(1);

//   },[search,batch,students]);



//   const updateStatus = async(id,status)=>{

//     try{

//       await API.patch(`/api/admin/student-status/${id}`,{status});

//       toast.success(`Student ${status}`);
//       fetchStudents();

//     }catch{

//       toast.error("Status update failed");

//     }

//   };



//   const deleteStudent = async(id)=>{

//     if(!window.confirm("Delete this student?")) return;

//     try{

//       await API.delete(`/api/admin/student/${id}`);

//       toast.success("Student deleted");
//       fetchStudents();

//     }catch{

//       toast.error("Delete failed");

//     }

//   };



//   // frontend pagination
//   const start = (page-1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const paginatedStudents = filtered.slice(start,end);

//   const totalPages = Math.ceil(filtered.length/itemsPerPage);



//   return (

// <div className="p-6">

// <h2 className="text-2xl font-bold mb-6">
// Student Management
// </h2>



// <div className="flex gap-4 mb-6">

// <input
// type="text"
// placeholder="Search student"
// className="border p-2 rounded w-72"
// value={search}
// onChange={(e)=>setSearch(e.target.value)}
// />



// <select
// className="border p-2 rounded"
// value={batch}
// onChange={(e)=>setBatch(e.target.value)}
// >

// <option value="">Batch</option>
// <option value="2020">2020</option>
// <option value="2021">2021</option>
// <option value="2022">2022</option>
// <option value="2023">2023</option>
// <option value="2024">2024</option>
// <option value="2025">2025</option>
// <option value="2026">2026</option>

// </select>

// </div>



// <div className="overflow-x-auto bg-white rounded-xl shadow">

// <table className="min-w-full">

// <thead className="bg-gray-100">

// <tr>

// <th className="p-4 text-left">Name</th>
// <th>Email</th>
// <th>Course</th>
// <th>Year</th>
// <th>Batch</th>
// <th>Status</th>
// <th className="text-center">Actions</th>

// </tr>

// </thead>



// <tbody>

// {paginatedStudents.map((s)=>(

// <tr key={s._id} className="border-t hover:bg-gray-50">

// <td className="p-4">{s.userId?.name}</td>
// <td>{s.userId?.email}</td>
// <td>{s.course}</td>
// <td>{s.yearOfStudy}</td>
// <td>{s.userId?.graduationYear}</td>



// <td>

// <span
// className={`px-3 py-1 rounded-full text-white text-xs ${
// s.status === "Verified"
// ? "bg-green-500"
// : s.status === "Rejected"
// ? "bg-red-500"
// : "bg-yellow-500"
// }`}
// >

// {s.status}

// </span>

// </td>



// <td>

// <div className="flex justify-center gap-3">

// {s.status === "Pending" && (

// <>

// <button
// onClick={()=>updateStatus(s._id,"Verified")}
// className="text-green-600"
// >

// <FaCheck/>

// </button>

// <button
// onClick={()=>updateStatus(s._id,"Rejected")}
// className="text-yellow-600"
// >

// <FaTimes/>

// </button>

// </>

// )}



// <button
// onClick={()=>deleteStudent(s._id)}
// className="text-red-600"
// >

// <FaTrash/>

// </button>

// </div>

// </td>

// </tr>

// ))}

// </tbody>

// </table>

// </div>



// <div className="flex justify-center gap-4 mt-6">

// <button
// disabled={page===1}
// onClick={()=>setPage(page-1)}
// className="bg-gray-200 px-3 py-1 rounded"
// >

// Prev

// </button>

// <span>Page {page} / {totalPages}</span>

// <button
// disabled={page===totalPages}
// onClick={()=>setPage(page+1)}
// className="bg-gray-200 px-3 py-1 rounded"
// >

// Next

// </button>

// </div>

// </div>

//   );
// }

// export default ManageStudents;