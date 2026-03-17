import { useEffect, useState, useMemo } from "react";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSearch, FiTrash2, FiEye, FiEdit2,
  FiUsers, FiCheckCircle, FiClock, FiAward
} from "react-icons/fi";

const DEPARTMENTS = ["All Departments",
  "Computer Science Engineering (CSE)",
  "Information Technology (IT)",
  "Computer Science Information Technology (CSIT)",
  "Electronics & Communication (EC)",
  "Electrical Engineering (EE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
  "Artificial Intelligence n Data Science (AIDS)",];
const ITEMS_PER_PAGE = 10;

// Generate batch years 2020 → current year
const CURRENT_YEAR = new Date().getFullYear();
const BATCHES = ["All Batches"];
for (let y = CURRENT_YEAR; y >= 2020; y--) BATCHES.push(String(y));

// ── Avatar initials ──────────────────────────────────────
function Avatar({ name }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  return (
    <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 font-bold
    text-sm flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [batch, setBatch] = useState("All Batches");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch all students ──────────────────────────────
  const fetchStudents = async () => {
    try {
      const res = await API.get("/api/admin/students");
      console.log("Full response:", res.data);
      setStudents(res.data.profiles || []);

    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  // ── Stats ───────────────────────────────────────────
  const stats = useMemo(() => {
    const total = students.length;
    const placed = students.filter((s) => s.placementStatus === "Placed").length;

    const active = total - placed;
    const cgpas = students.map((s) => s.cgpa).filter(Boolean);
    const avgCgpa = cgpas.length
      ? (cgpas.reduce((a, b) => a + b, 0) / cgpas.length).toFixed(2)
      : "N/A";
    return { total, placed, active, avgCgpa };
  }, [students]);

  // ── Filtered + Paginated ────────────────────────────
  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.userId?.email?.toLowerCase().includes(search.toLowerCase()) ||
        s.enrollmentNumber?.toLowerCase().includes(search.toLowerCase());

      const matchDept = dept === "All Departments" || s.userId?.department === dept;
      const matchBatch = batch === "All Batches" || String(s.userId?.graduationYear) === batch;

      return matchSearch && matchDept && matchBatch;
    });
  }, [students, search, dept, batch]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setDept("All Departments");
    setBatch("All Batches");
    setPage(1);
  };

  // ── Delete ──────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await API.delete(`/api/admin/student/${deleteId}`);
      toast.success("Student deleted successfully.");
      setDeleteId(null);
      fetchStudents();
    } catch {
      toast.error("Failed to delete student.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
        <p className="text-sm text-gray-400 mt-0.5">View and manage all student records</p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FiUsers size={20} className="text-blue-600" />}
          label="Total Students"
          value={stats.total}
          color="bg-blue-50"
        />
        <StatCard
          icon={<FiCheckCircle size={20} className="text-green-600" />}
          label="Placed"
          value={stats.placed}
          color="bg-green-50"
        />
        <StatCard
          icon={<FiClock size={20} className="text-orange-500" />}
          label="Active"
          value={stats.active}
          color="bg-orange-50"
        />
        <StatCard
          icon={<FiAward size={20} className="text-violet-600" />}
          label="Avg. CGPA"
          value={stats.avgCgpa}
          color="bg-violet-50"
        />
      </div>

      {/* ── Filters ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name, roll number, or email..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm
              focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
            />
          </div>

          {/* Department */}
          <select
            value={dept}
            onChange={handleFilterChange(setDept)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white
            focus:ring-2 focus:ring-violet-400 focus:outline-none transition text-gray-600 cursor-pointer"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Batch */}
          <select
            value={batch}
            onChange={handleFilterChange(setBatch)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white
            focus:ring-2 focus:ring-violet-400 focus:outline-none transition text-gray-600 cursor-pointer"
          >
            {BATCHES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* Clear */}
          {(search || dept !== "All Departments" || batch !== "All Batches") && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-400 hover:text-red-600 underline transition"
            >
              Clear Filters
            </button>
          )}

          <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
            {filtered.length} student{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">

            {/* Head */}
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-5 py-3 text-left">Roll Number</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Department</th>
                <th className="px-5 py-3 text-center">Batch</th>
                <th className="px-5 py-3 text-center">CGPA</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-50">

              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-gray-400 text-sm">
                    Loading students...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-gray-400 text-sm">
                    No students found
                  </td>
                </tr>
              ) : (
                paginated.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50 transition">

                    {/* Roll Number */}
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">
                      {s.enrollmentNumber || "—"}
                    </td>

                    {/* Name + Email */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.userId?.name} />
                        <div>
                          <p className="font-semibold text-gray-800">{s.userId?.name}</p>
                          <p className="text-xs text-gray-400">{s.userId?.email}</p>

                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-3 text-gray-600">{s.userId?.department|| "—"}</td>

                    {/* Batch */}
                    <td className="px-5 py-3 text-center text-gray-600">
                     {s.userId?.graduationYear || "—"}
                    </td>

                    {/* CGPA */}
                    <td className="px-5 py-3 text-center">
                      {s.cgpa ? (
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold
                        ${s.cgpa >= 8
                            ? "bg-blue-100 text-blue-700"
                            : s.cgpa >= 6
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-600"
                          }`}>
                          {s.cgpa}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    {/* Placement Status */}
                    <td className="px-5 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${s.placementStatus === "Placed"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                        }`}>
                        {s.placementStatus || "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400
                          hover:text-gray-600 transition"
                          title="View"
                        >
                          <FiEye size={15} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400
                          hover:text-violet-600 transition"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(s._id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400
                          hover:text-red-600 transition"
                          title="Delete"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Page {page} of {totalPages} · {filtered.length} total
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600
                hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30
                disabled:cursor-not-allowed transition"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition
                  ${page === p
                      ? "bg-violet-600 text-white shadow-sm"
                      : "border border-gray-200 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
                    }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600
                hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30
                disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FiTrash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Student?</h3>
            <p className="text-sm text-gray-500 mb-6">
              This student will be permanently deleted. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600
                hover:bg-gray-50 text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
                text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}



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
//   const [pages,setPages] = useState(1);



//     const fetchStudents = async () => {
//     try {
//       const res = await API.get("/api/admin/students");
//       console.log("Full response:", res.data);
//       setStudents(res.data.profiles || []);

//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch students.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchStudents(); }, []);



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

//   },[search,batch,students]);



//   const updateStatus = async(id,status)=>{

//     try{

//       await API.patch(`/api/student/status/${id}`,{status});

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

//  <option value="">Batch</option>
//           <option value="2011">2011</option>
//           <option value="2012">2012</option>
//           <option value="2013">2013</option>
//           <option value="2014">2014</option>
//           <option value="2015">2015</option>
//           <option value="2016">2016</option>
//           <option value="2017">2017</option>
//           <option value="2018">2018</option>
//           <option value="2019">2019</option>
//           <option value="2020">2020</option>
//           <option value="2021">2021</option>
//           <option value="202">2022</option>
//           <option value="202">2023</option>
//           <option value="202">2024</option>
//           <option value="202">2025</option>
//           <option value="202">2026</option>

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

// {filtered.map((s)=>(

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

// <span>Page {page} / {pages}</span>

// <button
// disabled={page===pages}
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