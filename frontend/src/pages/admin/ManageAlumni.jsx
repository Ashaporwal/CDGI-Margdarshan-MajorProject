// import { useEffect, useState, useMemo } from "react";
// import API from "../../services/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   FiSearch, FiCheckCircle, FiClock, FiTrash2,
//   FiUser, FiBriefcase, FiMail, FiAward,
//   FiChevronLeft, FiChevronRight, FiUsers
// } from "react-icons/fi";

// // ── Constants ─────────────────────────────────────────────
// const ITEMS_PER_PAGE = 8;

// // ── Delete Confirm Modal ──────────────────────────────────
// function DeleteModal({ alumni, onCancel, onConfirm, loading }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm">
//         <div className="flex items-center justify-center w-12 h-12 bg-red-100
//         dark:bg-red-900/30 rounded-full mb-4 mx-auto">
//           <FiTrash2 className="text-red-500" size={20} />
//         </div>
//         <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 mb-1">
//           Remove Alumni?
//         </h3>
//         <p className="text-sm text-center text-gray-400 mb-6">
//           <span className="font-semibold text-gray-600 dark:text-gray-300">
//             {alumni?.name}
//           </span>{" "}
//           ka account permanently delete ho jaayega.
//         </p>
//         <div className="flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
//             text-gray-600 dark:text-gray-300 text-sm font-semibold
//             hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={loading}
//             className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
//             text-white text-sm font-semibold transition disabled:opacity-50"
//           >
//             {loading ? "Removing..." : "Remove"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Alumni Card ───────────────────────────────────────────
// function AlumniCard({ alumni, onVerify, onDelete, verifyingId }) {
//   const isVerified  = alumni.status === "Verified";
//   const isVerifying = verifyingId === alumni.userId;

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100
//     dark:border-gray-700 p-5 flex flex-col gap-3 hover:shadow-sm transition">

//       {/* ── Top: Avatar + Name + Status ── */}
//       <div className="flex items-start gap-3">
//         {/* Avatar */}
//         <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30
//         flex items-center justify-center shrink-0">
//           <span className="text-sm font-bold text-violet-600 dark:text-violet-300">
//             {alumni.name?.charAt(0).toUpperCase()}
//           </span>
//         </div>

//         {/* Info */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap">
//             <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">
//               {alumni.name}
//             </h3>
//             <span className={`flex items-center gap-1 text-xs font-semibold
//             px-2 py-0.5 rounded-full
//             ${isVerified
//               ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//               : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
//             }`}>
//               {isVerified
//                 ? <><FiCheckCircle size={10} /> Verified</>
//                 : <><FiClock size={10} /> Pending</>
//               }
//             </span>
//           </div>
//           <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
//             <FiMail size={10} /> {alumni.email}
//           </p>
//         </div>

//         {/* Delete */}
//         <button
//           onClick={() => onDelete(alumni)}
//           className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20
//           text-gray-300 hover:text-red-500 transition shrink-0"
//           title="Remove alumni"
//         >
//           <FiTrash2 size={14} />
//         </button>
//       </div>

//       {/* ── Details ── */}
//       <div className="grid grid-cols-2 gap-2 text-xs">
//         {alumni.department && (
//           <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
//             <FiAward size={10} className="text-violet-400" />
//             {alumni.department}
//           </span>
//         )}
//         {alumni.batch && (
//           <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
//             <FiUsers size={10} className="text-blue-400" />
//             Batch {alumni.batch}
//           </span>
//         )}
//         {alumni.company && (
//           <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
//             <FiBriefcase size={10} className="text-green-400" />
//             {alumni.company}
//           </span>
//         )}
//         {alumni.designation && (
//           <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
//             <FiUser size={10} className="text-orange-400" />
//             {alumni.designation}
//           </span>
//         )}
//         {alumni.experienceYears > 0 && (
//           <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
//             <FiClock size={10} className="text-gray-400" />
//             {alumni.experienceYears} yr{alumni.experienceYears > 1 ? "s" : ""} exp
//           </span>
//         )}
//       </div>

//       {/* ── Verify Button (only for pending) ── */}
//       {!isVerified && (
//         <button
//           onClick={() => onVerify(alumni.userId)}
//           disabled={isVerifying}
//           className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-700
//           text-white text-xs font-semibold transition disabled:opacity-50
//           flex items-center justify-center gap-1.5"
//         >
//           {isVerifying
//             ? "Verifying..."
//             : <><FiCheckCircle size={12} /> Verify Alumni</>
//           }
//         </button>
//       )}

//       {isVerified && (
//         <div className="w-full py-2 rounded-xl bg-green-50 dark:bg-green-900/20
//         text-green-600 dark:text-green-400 text-xs font-semibold
//         flex items-center justify-center gap-1.5">
//           <FiCheckCircle size={12} /> Verified ✓
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main Page ─────────────────────────────────────────────
// export default function ManageAlumni() {
//   const [alumni, setAlumni]           = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [search, setSearch]           = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [currentPage, setCurrentPage]   = useState(1);
//   const [verifyingId, setVerifyingId]   = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // ── Fetch ──────────────────────────────────────────────
//   const fetchAlumni = async () => {
//     try {
//       const { data } = await API.get("/api/admin/pending-alumni");
//       setAlumni(data || []);
//     } catch {
//       toast.error("Failed to fetch alumni");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchAlumni(); }, []);

//   // ── Filter ─────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     return alumni.filter(a => {
//       const q = search.toLowerCase();
//       const matchSearch = !q ||
//         a.name?.toLowerCase().includes(q) ||
//         a.email?.toLowerCase().includes(q) ||
//         a.company?.toLowerCase().includes(q) ||
//         a.department?.toLowerCase().includes(q);
//       const matchStatus =
//         statusFilter === "All" ||
//         (statusFilter === "Verified" && a.status === "Verified") ||
//         (statusFilter === "Pending"  && a.status === "Pending");
//       return matchSearch && matchStatus;
//     });
//   }, [alumni, search, statusFilter]);

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
//   const paginated  = filtered.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   // ── Stats ──────────────────────────────────────────────
//   const stats = {
//     total:    alumni.length,
//     verified: alumni.filter(a => a.status === "Verified").length,
//     pending:  alumni.filter(a => a.status === "Pending").length,
//   };

//   // ── Handlers ───────────────────────────────────────────
//   const handleVerify = async (userId) => {
//     setVerifyingId(userId);
//     try {
//       await API.put(`/api/admin/verify-alumni/${userId}`);
//       toast.success("Alumni verified successfully!");
//       fetchAlumni();
//     } catch {
//       toast.error("Verification failed");
//     } finally {
//       setVerifyingId(null);
//     }
//   };

//   const confirmDelete = async () => {
//     setDeleteLoading(true);
//     try {
//       await API.delete(`/api/admin/student/${deleteTarget.userId}`);
//       toast.success("Alumni removed!");
//       setDeleteTarget(null);
//       fetchAlumni();
//     } catch {
//       toast.error("Failed to remove alumni");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {/* Delete Modal */}
//       {deleteTarget && (
//         <DeleteModal
//           alumni={deleteTarget}
//           onCancel={() => setDeleteTarget(null)}
//           onConfirm={confirmDelete}
//           loading={deleteLoading}
//         />
//       )}

//       {/* ── Header ── */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100
//         flex items-center gap-2">
//           <FiUsers className="text-violet-500" />
//           Manage Alumni
//         </h1>
//         <p className="text-sm text-gray-400 mt-0.5">
//           Verify and manage registered alumni
//         </p>
//       </div>

//       {/* ── Stats ── */}
//       <div className="grid grid-cols-3 gap-3">
//         {[
//           { label: "Total Alumni", value: stats.total,    color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20"  },
//           { label: "Verified",     value: stats.verified, color: "text-green-600",  bg: "bg-green-50 dark:bg-green-900/20"   },
//           { label: "Pending",      value: stats.pending,  color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
//         ].map(s => (
//           <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex flex-col gap-1`}>
//             <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
//             <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
//           </div>
//         ))}
//       </div>

//       {/* ── Search + Filter ── */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl border
//       border-gray-100 dark:border-gray-700 shadow-sm p-4 space-y-3">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
//           placeholder="🔍 Search by name, email, company..."
//           className="w-full border border-gray-200 dark:border-gray-600 rounded-xl
//           px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100
//           focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
//         />
//         <div className="flex items-center gap-2">
//           {["All", "Verified", "Pending"].map(s => (
//             <button
//               key={s}
//               onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
//               className={`px-3 py-1.5 rounded-full text-xs font-semibold transition
//               ${statusFilter === s
//                 ? "bg-violet-600 text-white shadow-sm"
//                 : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
//               }`}
//             >
//               {s}
//             </button>
//           ))}
//           <span className="ml-auto text-xs text-gray-400">
//             {filtered.length} alumni
//           </span>
//         </div>
//       </div>

//       {/* ── Alumni Grid ── */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-400 text-sm">
//           Loading alumni...
//         </div>
//       ) : paginated.length === 0 ? (
//         <div className="flex flex-col items-center py-20 text-gray-400">
//           <FiUsers size={40} className="mb-3 opacity-30" />
//           <p className="text-sm font-medium">No alumni found</p>
//           <p className="text-xs mt-1">Try changing the filters</p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {paginated.map(a => (
//             <AlumniCard
//               key={a.userId}
//               alumni={a}
//               onVerify={handleVerify}
//               onDelete={setDeleteTarget}
//               verifyingId={verifyingId}
//             />
//           ))}
//         </div>
//       )}

//       {/* ── Pagination ── */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-between pt-2">
//           <span className="text-xs text-gray-400">
//             Page {currentPage} of {totalPages} · {filtered.length} total
//           </span>
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
//               text-gray-500 hover:bg-violet-50 hover:text-violet-600
//               disabled:opacity-30 disabled:cursor-not-allowed transition"
//             >
//               <FiChevronLeft size={14} />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`w-8 h-8 rounded-lg text-xs font-semibold transition
//                 ${currentPage === page
//                   ? "bg-violet-600 text-white shadow-sm"
//                   : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button
//               onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
//               text-gray-500 hover:bg-violet-50 hover:text-violet-600
//               disabled:opacity-30 disabled:cursor-not-allowed transition"
//             >
//               <FiChevronRight size={14} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiCheckCircle, FiClock, FiTrash2,
  FiChevronLeft, FiChevronRight, FiUsers
} from "react-icons/fi";

// ── Constants ─────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

// ── Delete Confirm Modal ──────────────────────────────────
function DeleteModal({ alumni, onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100
        dark:bg-red-900/30 rounded-full mb-4 mx-auto">
          <FiTrash2 className="text-red-500" size={20} />
        </div>
        <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 mb-1">
          Remove Alumni?
        </h3>
        <p className="text-sm text-center text-gray-400 mb-6">
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            {alumni?.name}
          </span>{" "}
          Do You want to Delete the alumni?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
            text-gray-600 dark:text-gray-300 text-sm font-semibold
            hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
            text-white text-sm font-semibold transition disabled:opacity-50"
          >
            {loading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function ManageAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [verifyingId, setVerifyingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Fetch ──────────────────────────────────────────────
  const fetchAlumni = async () => {
    try {
      const { data } = await API.get("/api/admin/pending-alumni");
      setAlumni(data || []);
    } catch {
      toast.error("Failed to fetch alumni");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAlumni(); }, []);

  // ── Filter ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    return alumni.filter(a => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        a.name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.company?.toLowerCase().includes(q) ||
        a.department?.toLowerCase().includes(q);
      const matchStatus =
        statusFilter === "All" ||
        (statusFilter === "Verified" && a.status === "Verified") ||
        (statusFilter === "Pending" && a.status === "Pending");
      return matchSearch && matchStatus;
    });
  }, [alumni, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ── Stats ──────────────────────────────────────────────
  const stats = {
    total: alumni.length,
    verified: alumni.filter(a => a.status === "Verified").length,
    pending: alumni.filter(a => a.status === "Pending").length,
  };

  // ── Handlers ───────────────────────────────────────────
  const handleVerify = async (userId) => {
    setVerifyingId(userId);
    try {
      await API.put(`/api/admin/verify-alumni/${userId}`);
      toast.success("Alumni verified!");
      fetchAlumni();
    } catch {
      toast.error("Verification failed");
    } finally {
      setVerifyingId(null);
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await API.delete(`/api/admin/alumni/${deleteTarget.userId}`);
      toast.success("Alumni removed!");
      setDeleteTarget(null);
      fetchAlumni();
    } catch {
      toast.error("Failed to remove alumni");
    } finally {
      setDeleteLoading(false);
    }
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Email", "Department", "Batch", "Company", "Designation", "Status"],
      ...alumni.map(a => [
        a.name, a.email, a.department,
        a.batch, a.company, a.designation, a.status
      ])
    ];

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "alumni_data.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {deleteTarget && (
        <DeleteModal
          alumni={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          loading={deleteLoading}
        />
      )}

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100
    flex items-center gap-2">
            <FiUsers className="text-violet-500" />
            Manage Alumni
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Verify and manage registered alumni
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200
    dark:border-gray-600 rounded-xl text-sm text-gray-600 dark:text-gray-300
    hover:bg-blue-100 dark:hover:bg-gray-700 transition"
        >
          ⬇️ Export CSV
        </button>
      </div>


      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Alumni", value: stats.total, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20" },
          { label: "Verified", value: stats.verified, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
          { label: "Pending", value: stats.pending, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 flex flex-col gap-1`}>
            <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Search + Filter ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-4 space-y-3">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          placeholder="🔍 Search by name, email, company, department..."
          className="w-full border border-gray-200 dark:border-gray-600 rounded-xl
          px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100
          focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
        />
        <div className="flex items-center gap-2">
          {["All", "Verified", "Pending"].map(s => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition
              ${statusFilter === s
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
                }`}
            >
              {s}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} alumni
          </span>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">

        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            Loading alumni...
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-gray-400">
            <FiUsers size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No alumni found</p>
            <p className="text-xs mt-1">Try changing the filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* Head */}
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700
                bg-gray-50 dark:bg-gray-700/50">
                  {["Name", "Department", "Batch", "Company", "Designation", "Exp", "Status", "Action"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold
                    text-gray-500 dark:text-gray-400 px-4 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {paginated.map((a) => (
                  <tr key={a.userId}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">

                    {/* Name + Email */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-violet-100
                        dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-violet-600 dark:text-violet-300">
                            {a.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-gray-100
                          text-xs truncate max-w-[120px]">
                            {a.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-[120px]">
                            {a.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {a.department || "—"}
                      </span>
                    </td>

                    {/* Batch */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {a.batch || "—"}
                      </span>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                        {a.company || "—"}
                      </span>
                    </td>

                    {/* Designation */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {a.designation || "—"}
                      </span>
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {a.experienceYears ? `${a.experienceYears} yr` : "—"}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs
                      font-semibold px-2 py-0.5 rounded-full whitespace-nowrap
                      ${a.status === "Verified"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}>
                        {a.status === "Verified"
                          ? <><FiCheckCircle size={10} /> Verified</>
                          : <><FiClock size={10} /> Pending</>
                        }
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {/* Verify button — only for pending */}
                        {a.status === "Pending" && (
                          <button
                            onClick={() => handleVerify(a.userId)}
                            disabled={verifyingId === a.userId}
                            title="Verify Alumni"
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg
                            bg-violet-600 hover:bg-violet-700 text-white text-xs
                            font-semibold transition disabled:opacity-50 whitespace-nowrap"
                          >
                            {verifyingId === a.userId
                              ? "..."
                              : <><FiCheckCircle size={11} /> Verify</>
                            }
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(a)}
                          title="Remove"
                          className="p-1.5 rounded-lg hover:bg-red-50
                          dark:hover:bg-red-900/20 text-gray-300
                          hover:text-red-500 transition"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-400">
            Page {currentPage} of {totalPages} · {filtered.length} total
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
              text-gray-500 hover:bg-violet-50 hover:text-violet-600
              disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <FiChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition
                ${currentPage === page
                    ? "bg-violet-600 text-white shadow-sm"
                    : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
              text-gray-500 hover:bg-violet-50 hover:text-violet-600
              disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}