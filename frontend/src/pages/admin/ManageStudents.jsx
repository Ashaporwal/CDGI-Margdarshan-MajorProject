import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

function ManageStudents() {

  const [students,setStudents] = useState([]);
  const [filtered,setFiltered] = useState([]);

  const [search,setSearch] = useState("");
  const [batch,setBatch] = useState("");

  const [page,setPage] = useState(1);
  const [pages,setPages] = useState(1);



  useEffect(()=>{
    fetchStudents();
  },[page]);



  const fetchStudents = async()=>{

    try{

      const res = await API.get(`/student/all?page=${page}`);

      setStudents(res.data.profiles);
      setFiltered(res.data.profiles);
      setPages(res.data.pages);

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

    setFiltered(data);

  },[search,batch,students]);



  const updateStatus = async(id,status)=>{

    try{

      await API.patch(`/student/status/${id}`,{status});

      toast.success(`Student ${status}`);
      fetchStudents();

    }catch{

      toast.error("Status update failed");

    }

  };



  const deleteStudent = async(id)=>{

    if(!window.confirm("Delete this student?")) return;

    try{

      await API.delete(`/student/${id}`);

      toast.success("Student deleted");
      fetchStudents();

    }catch{

      toast.error("Delete failed");

    }

  };



  return (

<div className="p-6">

<h2 className="text-2xl font-bold mb-6">
Student Management
</h2>



<div className="flex gap-4 mb-6">

<input
type="text"
placeholder="Search student"
className="border p-2 rounded w-72"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>



<select
className="border p-2 rounded"
value={batch}
onChange={(e)=>setBatch(e.target.value)}
>

 <option value="">Batch</option>
          <option value="2011">2011</option>
          <option value="2012">2012</option>
          <option value="2013">2013</option>
          <option value="2014">2014</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="202">2022</option>
          <option value="202">2023</option>
          <option value="202">2024</option>
          <option value="202">2025</option>
          <option value="202">2026</option>

</select>

</div>



<div className="overflow-x-auto bg-white rounded-xl shadow">

<table className="min-w-full">

<thead className="bg-gray-100">

<tr>

<th className="p-4 text-left">Name</th>
<th>Email</th>
<th>Course</th>
<th>Year</th>
<th>Batch</th>
<th>Status</th>
<th className="text-center">Actions</th>

</tr>

</thead>



<tbody>

{filtered.map((s)=>(

<tr key={s._id} className="border-t hover:bg-gray-50">

<td className="p-4">{s.userId?.name}</td>
<td>{s.userId?.email}</td>
<td>{s.course}</td>
<td>{s.yearOfStudy}</td>
<td>{s.userId?.graduationYear}</td>



<td>

<span
className={`px-3 py-1 rounded-full text-white text-xs ${
s.status === "Verified"
? "bg-green-500"
: s.status === "Rejected"
? "bg-red-500"
: "bg-yellow-500"
}`}
>

{s.status}

</span>

</td>



<td>

<div className="flex justify-center gap-3">

{s.status === "Pending" && (

<>

<button
onClick={()=>updateStatus(s._id,"Verified")}
className="text-green-600"
>

<FaCheck/>

</button>

<button
onClick={()=>updateStatus(s._id,"Rejected")}
className="text-yellow-600"
>

<FaTimes/>

</button>

</>

)}



<button
onClick={()=>deleteStudent(s._id)}
className="text-red-600"
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



<div className="flex justify-center gap-4 mt-6">

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
className="bg-gray-200 px-3 py-1 rounded"
>

Prev

</button>

<span>Page {page} / {pages}</span>

<button
disabled={page===pages}
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