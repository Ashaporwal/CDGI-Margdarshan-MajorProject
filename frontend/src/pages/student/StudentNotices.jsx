// import { useEffect, useState, useMemo } from "react";
// import API from "../../services/api";
// import {
//   FiBell, FiCalendar, FiLink, FiClock,
//   FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight
// } from "react-icons/fi";

// // ── Constants ────────────────────────────────────────────
// const NOTICES_PER_PAGE = 10;

// const TYPE_FILTERS = ["All", "General", "Campus Drive", "Deadline", "Update"];

// const TYPE_STYLES = {
//   General:        { badge: "bg-blue-100 text-blue-700",     dot: "bg-blue-400"    },
//   "Campus Drive": { badge: "bg-green-100 text-green-700",   dot: "bg-green-400"   },
//   Deadline:       { badge: "bg-red-100 text-red-700",       dot: "bg-red-400"     },
//   Update:         { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400"  },
// };

// const MONTH_OPTIONS = [
//   { value: "All", label: "All Months" },
//   { value: "0",  label: "January"   },
//   { value: "1",  label: "February"  },
//   { value: "2",  label: "March"     },
//   { value: "3",  label: "April"     },
//   { value: "4",  label: "May"       },
//   { value: "5",  label: "June"      },
//   { value: "6",  label: "July"      },
//   { value: "7",  label: "August"    },
//   { value: "8",  label: "September" },
//   { value: "9",  label: "October"   },
//   { value: "10", label: "November"  },
//   { value: "11", label: "December"  },
// ];

// const CURRENT_YEAR = new Date().getFullYear();
// const YEAR_OPTIONS = [{ value: "All", label: "All Years" }];
// for (let y = CURRENT_YEAR; y >= 2023; y--) {
//   YEAR_OPTIONS.push({ value: String(y), label: String(y) });
// }

// // ── Helpers ──────────────────────────────────────────────
// function formatDate(dateStr) {
//   if (!dateStr) return null;
//   return new Date(dateStr).toLocaleDateString("en-IN", {
//     day: "numeric", month: "short", year: "numeric",
//   });
// }

// function isExpiringSoon(deadline) {
//   if (!deadline) return false;
//   const diff = new Date(deadline) - new Date();
//   return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000;
// }

// function isExpired(deadline) {
//   if (!deadline) return false;
//   return new Date(deadline) < new Date();
// }

// // ── Notice Card ──────────────────────────────────────────
// function NoticeCard({ notice }) {
//   const [expanded, setExpanded] = useState(false);

//   const style        = TYPE_STYLES[notice.noticeType] || TYPE_STYLES["General"];
//   const expiringSoon = isExpiringSoon(notice.deadline);
//   const expired      = isExpired(notice.deadline);
//   const isLong       = notice.description.length > 120;
//   const displayDesc  = expanded
//     ? notice.description
//     : notice.description.slice(0, 120) + (isLong ? "..." : "");

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border
//     border-gray-100 dark:border-gray-700 p-5 flex flex-col gap-3
//     hover:shadow-md transition-all duration-200">

// {/* ── Created By ── */}
// <div className="flex items-center gap-3 mb-1">
//   <img
//     src={
//       notice.createdBy?.photo
//         ? `http://localhost:3000/uploads/photos/${notice.createdBy.photo}`
//         : "/default.avif"
//     }
//     alt="admin"
//     className="w-8 h-8 rounded-full object-cover border border-gray-200"
//   />
//   <div>
//     <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
//       {notice.createdBy?.name || "Admin"}
//     </p>
//     <p className="text-xs text-gray-400">
//       {formatDate(notice.createdAt)}
//     </p>
//   </div>
// </div>

// {/* ── Type Badge + Date ── */}
//       {/* ── Type Badge + Date ── */}
//       <div className="flex items-center justify-between">
//         <span className={`text-xs font-semibold px-3 py-1 rounded-full
//         flex items-center gap-1 ${style.badge}`}>
//           <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
//           {notice.noticeType}
//         </span>

//         <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
//           <FiClock size={11} />
//           {formatDate(notice.createdAt)}
//         </span>
//       </div>

//       {/* ── Title ── */}
//       <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base leading-snug">
//         {notice.title}
//       </h3>

//       {/* ── Description + Read More ── */}
//       <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
//         <p>{displayDesc}</p>
//         {isLong && (
//           <button
//             onClick={() => setExpanded(!expanded)}
//             className="flex items-center gap-1 mt-1 text-xs font-semibold
//             text-violet-500 hover:text-violet-700 transition"
//           >
//             {expanded
//               ? <><FiChevronUp size={13} /> Read Less</>
//               : <><FiChevronDown size={13} /> Read More</>
//             }
//           </button>
//         )}
//       </div>

//       {/* ── Footer: Deadline + Link ── */}
//       {(notice.deadline || notice.link) && (
//         <div className="flex flex-wrap items-center gap-3 pt-2
//         border-t border-gray-100 dark:border-gray-700">

//           {notice.deadline && (
//             <span className={`flex items-center gap-1 text-xs font-medium
//             px-2 py-0.5 rounded-full
//             ${expired
//               ? "bg-gray-100 text-gray-400 line-through dark:bg-gray-700"
//               : expiringSoon
//               ? "bg-red-100 text-red-600 animate-pulse"
//               : "bg-orange-50 text-orange-600"
//             }`}>
//               <FiCalendar size={11} />
//               {expired ? "Expired: " : expiringSoon ? "⚠️ Due: " : "Deadline: "}
//               {formatDate(notice.deadline)}
//             </span>
//           )}

//           {notice.link && (
//             <a
//               href={notice.link}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center gap-1 text-xs text-violet-500
//               hover:text-violet-700 hover:underline ml-auto"
//             >
//               <FiLink size={11} />
//               View Link
//             </a>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main Page ────────────────────────────────────────────
// export default function StudentNotices() {
//   const [notices, setNotices]           = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [filter, setFilter]             = useState("All");
//   const [search, setSearch]             = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("All");
//   const [selectedYear, setSelectedYear]   = useState("All");
//   const [currentPage, setCurrentPage]     = useState(1);

//   // ── Fetch notices ───────────────────────────────────
//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const res = await API.get("/api/notice");
//         setNotices(res.data.notices || []);
//       } catch (error) {
//         console.error("Error fetching notices:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotices();
//   }, []);

//   // ── Filter logic ────────────────────────────────────
//   const filtered = useMemo(() => {
//     return notices.filter((n) => {
//       const matchType   = filter === "All" || n.noticeType === filter;
//       const matchSearch =
//         n.title.toLowerCase().includes(search.toLowerCase()) ||
//         n.description.toLowerCase().includes(search.toLowerCase());

//       const d = new Date(n.createdAt);
//       const matchMonth = selectedMonth === "All" || d.getMonth() === Number(selectedMonth);
//       const matchYear  = selectedYear  === "All" || d.getFullYear() === Number(selectedYear);

//       return matchType && matchSearch && matchMonth && matchYear;
//     });
//   }, [notices, filter, search, selectedMonth, selectedYear]);

//   // ── Pagination ──────────────────────────────────────
//   const totalPages = Math.ceil(filtered.length / NOTICES_PER_PAGE);
//   const paginated  = filtered.slice(
//     (currentPage - 1) * NOTICES_PER_PAGE,
//     currentPage * NOTICES_PER_PAGE
//   );

//   const resetPage = () => setCurrentPage(1);

//   return (
//     <div className="space-y-6 max-w-3xl mx-auto">

//       {/* ── Header ── */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100
//         flex items-center gap-2">
//           <FiBell className="text-violet-500" />
//           College Notices
//         </h1>
//         <p className="text-sm text-gray-400 mt-0.5">
//           All important announcements from the placement cell
//         </p>
//       </div>

//       {/* ── Filters ── */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl border
//       border-gray-100 dark:border-gray-700 shadow-sm p-4 space-y-3">

//         {/* Search */}
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => { setSearch(e.target.value); resetPage(); }}
//           placeholder="🔍 Search notices..."
//           className="w-full border border-gray-200 dark:border-gray-600 rounded-xl
//           px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100
//           focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
//         />

//         {/* Type Filter Pills */}
//         <div className="flex flex-wrap gap-2">
//           {TYPE_FILTERS.map((f) => (
//             <button
//               key={f}
//               onClick={() => { setFilter(f); resetPage(); }}
//               className={`px-3 py-1.5 rounded-full text-xs font-semibold transition
//               ${filter === f
//                 ? "bg-violet-600 text-white shadow-sm"
//                 : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {/* Month + Year Dropdowns */}
//         <div className="flex flex-wrap gap-3 items-center">
//           <span className="text-xs text-gray-400 font-medium">📅 Filter by:</span>

//           <select
//             value={selectedMonth}
//             onChange={(e) => { setSelectedMonth(e.target.value); resetPage(); }}
//             className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
//             text-sm bg-white dark:bg-gray-700 dark:text-gray-100
//             focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
//           >
//             {MONTH_OPTIONS.map((m) => (
//               <option key={m.value} value={m.value}>{m.label}</option>
//             ))}
//           </select>

//           <select
//             value={selectedYear}
//             onChange={(e) => { setSelectedYear(e.target.value); resetPage(); }}
//             className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
//             text-sm bg-white dark:bg-gray-700 dark:text-gray-100
//             focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
//           >
//             {YEAR_OPTIONS.map((y) => (
//               <option key={y.value} value={y.value}>{y.label}</option>
//             ))}
//           </select>

//           {/* Reset */}
//           {(selectedMonth !== "All" || selectedYear !== "All") && (
//             <button
//               onClick={() => { setSelectedMonth("All"); setSelectedYear("All"); resetPage(); }}
//               className="text-xs text-red-400 hover:text-red-600 underline transition"
//             >
//               Reset
//             </button>
//           )}

//           <span className="ml-auto text-xs text-gray-400">
//             {filtered.length} notice{filtered.length !== 1 ? "s" : ""}
//           </span>
//         </div>
//       </div>

//       {/* ── Notice List ── */}
//       {loading ? (
//         <div className="text-center py-20 text-gray-400 text-sm">
//           Loading notices...
//         </div>
//       ) : paginated.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//           <FiBell size={40} className="mb-3 opacity-30" />
//           <p className="text-sm font-medium">No notices found</p>
//           <p className="text-xs mt-1">Try changing filters</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {paginated.map((notice) => (
//             <NoticeCard key={notice._id} notice={notice} />
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
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
//               text-gray-500 hover:bg-violet-50 hover:text-violet-600
//               disabled:opacity-30 disabled:cursor-not-allowed transition"
//             >
//               <FiChevronLeft size={14} />
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
import {
  FiBell, FiCalendar, FiLink, FiClock,
  FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight,
  FiUser
} from "react-icons/fi";

// ── Constants ────────────────────────────────────────────
const NOTICES_PER_PAGE = 10;
const TYPE_FILTERS = ["All", "General", "Campus Drive", "Deadline", "Update"];

const TYPE_STYLES = {
  General:        { badge: "bg-blue-100 text-blue-700",     dot: "bg-blue-400",   border: "border-l-blue-400"   },
  "Campus Drive": { badge: "bg-green-100 text-green-700",   dot: "bg-green-400",  border: "border-l-green-400"  },
  Deadline:       { badge: "bg-red-100 text-red-700",       dot: "bg-red-400",    border: "border-l-red-400"    },
  Update:         { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400", border: "border-l-yellow-400" },
};

const MONTH_OPTIONS = [
  { value: "All", label: "All Months" },
  { value: "0",  label: "January"   },
  { value: "1",  label: "February"  },
  { value: "2",  label: "March"     },
  { value: "3",  label: "April"     },
  { value: "4",  label: "May"       },
  { value: "5",  label: "June"      },
  { value: "6",  label: "July"      },
  { value: "7",  label: "August"    },
  { value: "8",  label: "September" },
  { value: "9",  label: "October"   },
  { value: "10", label: "November"  },
  { value: "11", label: "December"  },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = [{ value: "All", label: "All Years" }];
for (let y = CURRENT_YEAR; y >= 2023; y--) {
  YEAR_OPTIONS.push({ value: String(y), label: String(y) });
}

// ── Helpers ──────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function isExpiringSoon(deadline) {
  if (!deadline) return false;
  const diff = new Date(deadline) - new Date();
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000;
}

function isExpired(deadline) {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
}

// ── Notice Card ──────────────────────────────────────────
function NoticeCard({ notice }) {
  const [expanded, setExpanded] = useState(false);

  const style        = TYPE_STYLES[notice.noticeType] || TYPE_STYLES["General"];
  const expiringSoon = isExpiringSoon(notice.deadline);
  const expired      = isExpired(notice.deadline);
  const isLong       = notice.description.length > 120;
  const displayDesc  = expanded
    ? notice.description
    : notice.description.slice(0, 120) + (isLong ? "..." : "");

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm 
    border border-gray-100 dark:border-gray-700
    border-l-4 ${style.border}
    p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200`}>

      {/* ── Top: Type Badge ── */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full
        flex items-center gap-1 ${style.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
          {notice.noticeType}
        </span>

        {/* Posted date top right */}
        <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <FiClock size={11} />
          {formatDate(notice.createdAt)}
        </span>
      </div>

      {/* ── Title ── */}
      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base leading-snug">
        {notice.title}
      </h3>

      {/* ── Description + Read More ── */}
      <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        <p>{displayDesc}</p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-1.5 text-xs font-semibold
            text-violet-500 hover:text-violet-700 transition"
          >
            {expanded
              ? <><FiChevronUp size={13} /> Read Less</>
              : <><FiChevronDown size={13} /> Read More</>
            }
          </button>
        )}
      </div>

      {/* ── Deadline Badge ── */}
      {notice.deadline && (
        <div>
          <span className={`inline-flex items-center gap-1 text-xs font-medium
          px-2.5 py-1 rounded-full
          ${expired
            ? "bg-gray-100 text-gray-400 line-through dark:bg-gray-700"
            : expiringSoon
            ? "bg-red-100 text-red-600 animate-pulse"
            : "bg-orange-50 text-orange-600"
          }`}>
            <FiCalendar size={11} />
            {expired ? "Expired: " : expiringSoon ? "⚠️ Due: " : "Deadline: "}
            {formatDate(notice.deadline)}
          </span>
        </div>
      )}

      {/* ── Footer: Admin Info + Link ── */}
      <div className="flex items-center justify-between pt-2
      border-t border-gray-100 dark:border-gray-700 mt-1">

        {/* Admin photo + name — subtle at bottom */}
        <div className="flex items-center gap-2">
          <img
            src={
              notice.createdBy?.photo
                ? `http://localhost:3000/uploads/photos/${notice.createdBy.photo}`
                : "/default.avif"
            }
            alt="admin"
            className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Posted by{" "}
            <span className="font-medium text-gray-500 dark:text-gray-400">
              {notice.createdBy?.name || "Admin"}
            </span>
          </span>
        </div>

        {/* External link */}
        {notice.link && (
          <a
            href={notice.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-violet-500
            hover:text-violet-700 hover:underline transition"
          >
            <FiLink size={11} />
            View Link
          </a>
        )}
      </div>

    </div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function StudentNotices() {
  const [notices, setNotices]             = useState([]);
  const [loading, setLoading]             = useState(true);
  const [filter, setFilter]               = useState("All");
  const [search, setSearch]               = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear]   = useState("All");
  const [currentPage, setCurrentPage]     = useState(1);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await API.get("/api/notice");
        setNotices(res.data.notices || []);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filtered = useMemo(() => {
    return notices.filter((n) => {
      const matchType   = filter === "All" || n.noticeType === filter;
      const matchSearch =
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.description.toLowerCase().includes(search.toLowerCase());
      const d = new Date(n.createdAt);
      const matchMonth = selectedMonth === "All" || d.getMonth() === Number(selectedMonth);
      const matchYear  = selectedYear  === "All" || d.getFullYear() === Number(selectedYear);
      return matchType && matchSearch && matchMonth && matchYear;
    });
  }, [notices, filter, search, selectedMonth, selectedYear]);

  const totalPages = Math.ceil(filtered.length / NOTICES_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * NOTICES_PER_PAGE,
    currentPage * NOTICES_PER_PAGE
  );

  const resetPage = () => setCurrentPage(1);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <FiBell className="text-violet-500" />
          College Notices
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Official announcements from the placement cell
        </p>
      </div>

      {/* ── Filters ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-4 space-y-3">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); resetPage(); }}
          placeholder="🔍 Search notices..."
          className="w-full border border-gray-200 dark:border-gray-600 rounded-xl
          px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100
          focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
        />

        {/* Type Pills */}
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); resetPage(); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition
              ${filter === f
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Month + Year */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-xs text-gray-400 font-medium">📅 Filter by:</span>

          <select
            value={selectedMonth}
            onChange={(e) => { setSelectedMonth(e.target.value); resetPage(); }}
            className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
            text-sm bg-white dark:bg-gray-700 dark:text-gray-100
            focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
          >
            {MONTH_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => { setSelectedYear(e.target.value); resetPage(); }}
            className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
            text-sm bg-white dark:bg-gray-700 dark:text-gray-100
            focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
          >
            {YEAR_OPTIONS.map((y) => (
              <option key={y.value} value={y.value}>{y.label}</option>
            ))}
          </select>

          {(selectedMonth !== "All" || selectedYear !== "All") && (
            <button
              onClick={() => { setSelectedMonth("All"); setSelectedYear("All"); resetPage(); }}
              className="text-xs text-red-400 hover:text-red-600 underline transition"
            >
              Reset
            </button>
          )}

          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} notice{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Notice List ── */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">Loading notices...</div>
      ) : paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <FiBell size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">No notices found</p>
          <p className="text-xs mt-1">Try changing the filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginated.map((notice) => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-400">
            Page {currentPage} of {totalPages} · {filtered.length} total
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
              text-gray-500 hover:bg-violet-50 hover:text-violet-600
              disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <FiChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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