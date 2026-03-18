// import { useEffect, useState, useMemo } from "react";
// import API from "../../services/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FiSearch, FiTrash2, FiEye, FiEdit2,
//   FiUsers, FiCheckCircle, FiClock, FiAward
// } from "react-icons/fi";

// const DEPARTMENTS = ["All Departments",
//   "Computer Science Engineering (CSE)",
//   "Information Technology (IT)",
//   "Computer Science Information Technology (CSIT)",
//   "Electronics & Communication (EC)",
//   "Electrical Engineering (EE)",
//   "Mechanical Engineering (ME)",
//   "Civil Engineering (CE)",
//   "Artificial Intelligence n Data Science (AIDS)",];
// const ITEMS_PER_PAGE = 10;

// // Generate batch years 2020 → current year
// const CURRENT_YEAR = new Date().getFullYear();
// const BATCHES = ["All Batches"];
// for (let y = CURRENT_YEAR; y >= 2020; y--) BATCHES.push(String(y));

// // ── Avatar initials ──────────────────────────────────────
// function Avatar({ name }) {
//   const initials = name
//     ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
//     : "?";
//   return (
//     <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 font-bold
//     text-sm flex items-center justify-center flex-shrink-0">
//       {initials}
//     </div>
//   );
// }

// // ── Stat Card ────────────────────────────────────────────
// function StatCard({ icon, label, value, color }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
//       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-2xl font-bold text-gray-800">{value}</p>
//         <p className="text-xs text-gray-400 mt-0.5">{label}</p>
//       </div>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════
// export default function ManageStudents() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [dept, setDept] = useState("All Departments");
//   const [batch, setBatch] = useState("All Batches");
//   const [page, setPage] = useState(1);
//   const [deleteId, setDeleteId] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   // ── Fetch all students ──────────────────────────────
//   const fetchStudents = async () => {
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

//   // ── Stats ───────────────────────────────────────────
//   const stats = useMemo(() => {
//     const total = students.length;
//     const placed = students.filter((s) => s.placementStatus === "Placed").length;

//     const active = total - placed;
//     const cgpas = students.map((s) => s.cgpa).filter(Boolean);
//     const avgCgpa = cgpas.length
//       ? (cgpas.reduce((a, b) => a + b, 0) / cgpas.length).toFixed(2)
//       : "N/A";
//     return { total, placed, active, avgCgpa };
//   }, [students]);

//   // ── Filtered + Paginated ────────────────────────────
//   const filtered = useMemo(() => {
//     return students.filter((s) => {
//       const matchSearch =
//         s.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
//         s.userId?.email?.toLowerCase().includes(search.toLowerCase()) ||
//         s.enrollmentNumber?.toLowerCase().includes(search.toLowerCase());

//       const matchDept = dept === "All Departments" || s.userId?.department === dept;
//       const matchBatch = batch === "All Batches" || String(s.userId?.graduationYear) === batch;

//       return matchSearch && matchDept && matchBatch;
//     });
//   }, [students, search, dept, batch]);

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

//   const handleFilterChange = (setter) => (e) => {
//     setter(e.target.value);
//     setPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const clearFilters = () => {
//     setSearch("");
//     setDept("All Departments");
//     setBatch("All Batches");
//     setPage(1);
//   };

//   // ── Delete ──────────────────────────────────────────
//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await API.delete(`/api/admin/student/${deleteId}`);
//       toast.success("Student deleted successfully.");
//       setDeleteId(null);
//       fetchStudents();
//     } catch {
//       toast.error("Failed to delete student.");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   return (
//     <div className="space-y-6">

//       {/* ── Page Header ── */}
//       <div>
//         <h1 className="text-2xl font-bold dark:text-gray-200 text-gray-800">Student Management</h1>
//         <p className="text-sm text-gray-400 dark:text-gray-400 mt-0.5">View and manage all student records</p>
//       </div>

//       {/* ── Stats Row ── */}
//       <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
//         <StatCard
//           icon={<FiUsers size={20} className="text-blue-600" />}
//           label="Total Students"
//           value={stats.total}
//           color="bg-blue-50"
//         />
//         <StatCard
//           icon={<FiCheckCircle size={20} className="text-green-600" />}
//           label="Placed"
//           value={stats.placed}
//           color="bg-green-50"
//         />
//         <StatCard
//           icon={<FiClock size={20} className="text-orange-500" />}
//           label="Active"
//           value={stats.active}
//           color="bg-orange-50"
//         />
//         <StatCard
//           icon={<FiAward size={20} className="text-violet-600" />}
//           label="Avg. CGPA"
//           value={stats.avgCgpa}
//           color="bg-violet-50"
//         />
//       </div>

//       {/* ── Filters ── */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
//         <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

//           {/* Search */}
//           <div className="relative w-full sm:w-72">
//             <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               value={search}
//               onChange={handleSearchChange}
//               placeholder="Search by name, roll number, or email..."
//               className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm
//               focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
//             />
//           </div>

//           {/* Department */}
//           <select
//             value={dept}
//             onChange={handleFilterChange(setDept)}
//             className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white
//             focus:ring-2 focus:ring-violet-400 focus:outline-none transition text-gray-600 cursor-pointer"
//           >
//             {DEPARTMENTS.map((d) => (
//               <option key={d} value={d}>{d}</option>
//             ))}
//           </select>

//           {/* Batch */}
//           <select
//             value={batch}
//             onChange={handleFilterChange(setBatch)}
//             className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white
//             focus:ring-2 focus:ring-violet-400 focus:outline-none transition text-gray-600 cursor-pointer"
//           >
//             {BATCHES.map((b) => (
//               <option key={b} value={b}>{b}</option>
//             ))}
//           </select>

//           {/* Clear */}
//           {(search || dept !== "All Departments" || batch !== "All Batches") && (
//             <button
//               onClick={clearFilters}
//               className="text-xs text-red-400 hover:text-red-600 underline transition"
//             >
//               Clear Filters
//             </button>
//           )}

//           <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
//             {filtered.length} student{filtered.length !== 1 ? "s" : ""}
//           </span>
//         </div>
//       </div>

//       {/* ── Table ── */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">

//             {/* Head */}
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wide">
//                 <th className="px-5 py-3 text-left">Roll Number</th>
//                 <th className="px-5 py-3 text-left">Name</th>
//                 <th className="px-5 py-3 text-left">Department</th>
//                 <th className="px-5 py-3 text-center">Batch</th>
//                 <th className="px-5 py-3 text-center">CGPA</th>
//                 <th className="px-5 py-3 text-center">Status</th>
//                 <th className="px-5 py-3 text-center">Actions</th>
//               </tr>
//             </thead>

//             {/* Body */}
//             <tbody className="divide-y divide-gray-50">

//               {loading ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-16 text-gray-400 text-sm">
//                     Loading students...
//                   </td>
//                 </tr>
//               ) : paginated.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center py-16 text-gray-400 text-sm">
//                     No students found
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((s) => (
//                   <tr key={s._id} className="hover:bg-gray-50 transition">

//                     {/* Roll Number */}
//                     <td className="px-5 py-3 font-mono text-xs text-gray-500">
//                       {s.enrollmentNumber || "—"}
//                     </td>

//                     {/* Name + Email */}
//                     <td className="px-5 py-3">
//                       <div className="flex items-center gap-3">
//                         <Avatar name={s.userId?.name} />
//                         <div>
//                           <p className="font-semibold text-gray-800">{s.userId?.name}</p>
//                           <p className="text-xs text-gray-400">{s.userId?.email}</p>

//                         </div>
//                       </div>
//                     </td>

//                     {/* Department */}
//                     <td className="px-5 py-3 text-gray-600">{s.userId?.department|| "—"}</td>

//                     {/* Batch */}
//                     <td className="px-5 py-3 text-center text-gray-600">
//                      {s.userId?.graduationYear || "—"}
//                     </td>

//                     {/* CGPA */}
//                     <td className="px-5 py-3 text-center">
//                       {s.cgpa ? (
//                         <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold
//                         ${s.cgpa >= 8
//                             ? "bg-blue-100 text-blue-700"
//                             : s.cgpa >= 6
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-red-100 text-red-600"
//                           }`}>
//                           {s.cgpa}
//                         </span>
//                       ) : (
//                         <span className="text-gray-400">—</span>
//                       )}
//                     </td>

//                     {/* Placement Status */}
//                     <td className="px-5 py-3 text-center">
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold
//                       ${s.placementStatus === "Placed"
//                           ? "bg-blue-600 text-white"
//                           : "bg-gray-100 text-gray-600"
//                         }`}>
//                         {s.placementStatus || "Active"}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-5 py-3">
//                       <div className="flex items-center justify-center gap-2">
//                         <button
//                           className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400
//                           hover:text-gray-600 transition"
//                           title="View"
//                         >
//                           <FiEye size={15} />
//                         </button>
//                         <button
//                           className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400
//                           hover:text-violet-600 transition"
//                           title="Edit"
//                         >
//                           <FiEdit2 size={15} />
//                         </button>
//                         <button
//                           onClick={() => setDeleteId(s._id)}
//                           className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400
//                           hover:text-red-600 transition"
//                           title="Delete"
//                         >
//                           <FiTrash2 size={15} />
//                         </button>
//                       </div>
//                     </td>

//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ── Pagination ── */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
//             <span className="text-xs text-gray-400">
//               Page {page} of {totalPages} · {filtered.length} total
//             </span>
//             <div className="flex items-center gap-1">
//               <button
//                 onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                 disabled={page === 1}
//                 className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600
//                 hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30
//                 disabled:cursor-not-allowed transition"
//               >
//                 Prev
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                 <button
//                   key={p}
//                   onClick={() => setPage(p)}
//                   className={`w-8 h-8 rounded-lg text-xs font-semibold transition
//                   ${page === p
//                       ? "bg-violet-600 text-white shadow-sm"
//                       : "border border-gray-200 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
//                     }`}
//                 >
//                   {p}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//                 disabled={page === totalPages}
//                 className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600
//                 hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30
//                 disabled:cursor-not-allowed transition"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Delete Confirm Modal ── */}
//       {deleteId && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
//             <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
//               <FiTrash2 size={24} className="text-red-500" />
//             </div>
//             <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Student?</h3>
//             <p className="text-sm text-gray-500 mb-6">
//               This student will be permanently deleted. Are you sure?
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setDeleteId(null)}
//                 className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600
//                 hover:bg-gray-50 text-sm font-medium transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleting}
//                 className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
//                 text-white text-sm font-semibold transition disabled:opacity-60"
//               >
//                 {deleting ? "Deleting..." : "Yes, Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }


import { useEffect, useState, useMemo } from "react";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiSearch, FiTrash2, FiEye, FiEdit2,
  FiUsers, FiCheckCircle, FiClock, FiAward, FiX
} from "react-icons/fi";

// ── Constants ────────────────────────────────────────────
const DEPARTMENTS = [
  "All Departments",
  "Computer Science Engineering (CSE)",
  "Information Technology (IT)",
  "Computer Science Information Technology (CSIT)",
  "Electronics & Communication (EC)",
  "Electrical Engineering (EE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
  "Artificial Intelligence n Data Science (AIDS)",
];
const ITEMS_PER_PAGE = 10;
const CURRENT_YEAR = new Date().getFullYear();
const BATCHES = ["All Batches"];
for (let y = CURRENT_YEAR; y >= 2020; y--) BATCHES.push(String(y));

// ── Avatar ───────────────────────────────────────────────
function Avatar({ name, size = "md" }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  const sz = size === "lg"
    ? "w-16 h-16 text-xl"
    : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} rounded-full bg-violet-100 dark:bg-violet-900/40
    text-violet-700 dark:text-violet-300 font-bold
    flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border
    border-gray-100 dark:border-gray-700 shadow-sm p-5 flex items-center gap-4
    transition-colors duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ── Detail Row (inside View modal) ───────────────────────
function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2.5
    border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500
      uppercase tracking-wide sm:w-36 flex-shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
        {value || "—"}
      </span>
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

  // Modal states
  const [viewStudent, setViewStudent] = useState(null);   // View modal
  const [editStudent, setEditStudent] = useState(null);   // Edit/Status modal
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch ──────────────────────────────────────────────
  const fetchStudents = async () => {
    try {
      const res = await API.get("/api/admin/students");
      setStudents(res.data.profiles || []);
    } catch {
      toast.error("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  // ── Stats ──────────────────────────────────────────────
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

  // ── Filter + Paginate ──────────────────────────────────
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

  const handleFilterChange = (setter) => (e) => { setter(e.target.value); setPage(1); };
  const handleSearchChange = (e) => { setSearch(e.target.value); setPage(1); };
  const clearFilters = () => { setSearch(""); setDept("All Departments"); setBatch("All Batches"); setPage(1); };

  // ── Delete ─────────────────────────────────────────────
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

  // ── Status Update ──────────────────────────────────────
  const openEditModal = (student) => {
    setEditStudent(student);
    setNewStatus(student.placementStatus || "Active");
  };

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await API.patch(`/api/admin/student-status/${editStudent._id}`, { status: newStatus });
      toast.success("Status updated successfully.");
      setEditStudent(null);
      fetchStudents();
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  // ════════════════════════════════════════════════════════
  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Student Management
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          View and manage all student records
        </p>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={<FiUsers size={20} className="text-blue-600" />}
          label="Total Students" value={stats.total} color="bg-blue-50 dark:bg-blue-900/20" />
        <StatCard icon={<FiCheckCircle size={20} className="text-green-600" />}
          label="Placed" value={stats.placed} color="bg-green-50 dark:bg-green-900/20" />
        <StatCard icon={<FiClock size={20} className="text-orange-500" />}
          label="Active" value={stats.active} color="bg-orange-50 dark:bg-orange-900/20" />
        <StatCard icon={<FiAward size={20} className="text-violet-600" />}
          label="Avg. CGPA" value={stats.avgCgpa} color="bg-violet-50 dark:bg-violet-900/20" />
      </div>

      {/* ── Filters ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-4 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by name, roll no, or email..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600
              rounded-xl text-sm bg-white dark:bg-gray-700
              text-gray-800 dark:text-gray-100 placeholder-gray-400
              focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
            />
          </div>

          {/* Department */}
          <select
            value={dept}
            onChange={handleFilterChange(setDept)}
            className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
            text-sm bg-white dark:bg-gray-700
            text-gray-600 dark:text-gray-200
            focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
          >
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          {/* Batch */}
          <select
            value={batch}
            onChange={handleFilterChange(setBatch)}
            className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
            text-sm bg-white dark:bg-gray-700
            text-gray-600 dark:text-gray-200
            focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
          >
            {BATCHES.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>

          {(search || dept !== "All Departments" || batch !== "All Batches") && (
            <button onClick={clearFilters}
              className="text-xs text-red-400 hover:text-red-600 underline transition">
              Clear Filters
            </button>
          )}

          <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
            {filtered.length} student{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">

            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/60 border-b
              border-gray-100 dark:border-gray-700
              text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                <th className="px-5 py-3 text-left">Roll No.</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Department</th>
                <th className="px-5 py-3 text-center">Batch</th>
                <th className="px-5 py-3 text-center">CGPA</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
                    Loading students...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-16 text-gray-400 dark:text-gray-500 text-sm">
                    No students found
                  </td>
                </tr>
              ) : (
                paginated.map((s) => (
                  <tr key={s._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition">

                    {/* Roll Number */}
                    <td className="px-5 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {s.enrollmentNumber || "—"}
                    </td>

                    {/* Name + Email */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={s.userId?.name} />
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-100">
                            {s.userId?.name}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {s.userId?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                      {s.userId?.department || "—"}
                    </td>

                    {/* Batch */}
                    <td className="px-5 py-3 text-center text-gray-600 dark:text-gray-300">
                      {s.userId?.graduationYear || "—"}
                    </td>

                    {/* CGPA */}
                    <td className="px-5 py-3 text-center">
                      {s.cgpa ? (
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold
                        ${s.cgpa >= 8
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : s.cgpa >= 6
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          }`}>
                          {s.cgpa}
                        </span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${s.placementStatus === "Placed"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}>
                        {s.placementStatus || "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {/* View */}
                        <button
                          onClick={() => setViewStudent(s)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                          text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                          title="View"
                        >
                          <FiEye size={15} />
                        </button>
                        {/* Edit Status */}
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30
                          text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition"
                          title="Edit Status"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => setDeleteId(s._id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20
                          text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3
          border-t border-gray-100 dark:border-gray-700">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Page {page} of {totalPages} · {filtered.length} total
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600
                text-xs text-gray-600 dark:text-gray-300
                hover:bg-violet-50 dark:hover:bg-violet-900/20
                hover:text-violet-600 dark:hover:text-violet-400
                disabled:opacity-30 disabled:cursor-not-allowed transition"
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
                      : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600"
                    }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600
                text-xs text-gray-600 dark:text-gray-300
                hover:bg-violet-50 dark:hover:bg-violet-900/20
                hover:text-violet-600 dark:hover:text-violet-400
                disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          VIEW MODAL
      ══════════════════════════════════════════════════ */}
      {viewStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
          w-full max-w-md p-6 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <Avatar name={viewStudent.userId?.name} size="lg" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {viewStudent.userId?.name}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {viewStudent.userId?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewStudent(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                text-gray-400 dark:text-gray-500 transition"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-0">
              <DetailRow label="Roll Number" value={viewStudent.enrollmentNumber} />
              <DetailRow label="Department" value={viewStudent.userId?.department} />
              <DetailRow label="Graduation Year" value={viewStudent.userId?.graduationYear} />
              <DetailRow label="CGPA" value={viewStudent.cgpa} />
              <DetailRow label="Skills" value={viewStudent.skills?.join(", ")} />
              <DetailRow label="LinkedIn" value={viewStudent.linkedIn} />
              <DetailRow
                label="Placement Status"
                value={
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold
                  ${viewStudent.placementStatus === "Placed"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}>
                    {viewStudent.placementStatus || "Active"}
                  </span>
                }
              />
            </div>

            {/* Close */}
            <button
              onClick={() => setViewStudent(null)}
              className="mt-5 w-full py-2.5 rounded-xl border border-gray-200
              dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          EDIT STATUS MODAL
      ══════════════════════════════════════════════════ */}
      {editStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
          w-full max-w-sm p-6 transition-colors duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Update Status
              </h3>
              <button
                onClick={() => setEditStudent(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                text-gray-400 transition"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Student Name */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Student:{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {editStudent.userId?.name}
              </span>
            </p>

            {/* Status Options */}
            <div className="space-y-3 mb-6">
              {["Active", "Placed"].map((status) => (
                <label
                  key={status}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition
                  ${newStatus === status
                      ? "border-violet-400 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-500"
                      : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={newStatus === status}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="accent-violet-600"
                  />
                  <div>
                    <p className={`text-sm font-semibold
                    ${newStatus === status
                        ? "text-violet-700 dark:text-violet-300"
                        : "text-gray-700 dark:text-gray-200"
                      }`}>
                      {status}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {status === "Placed"
                        ? "Student has been placed in a company"
                        : "Student is currently seeking placement"}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditStudent(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700
                text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          DELETE CONFIRM MODAL
      ══════════════════════════════════════════════════ */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
          w-full max-w-sm p-6 text-center transition-colors duration-300">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30
            flex items-center justify-center mx-auto mb-4">
              <FiTrash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              Delete Student?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              This student will be permanently deleted. Are you sure?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
                text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                text-sm font-medium transition"
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