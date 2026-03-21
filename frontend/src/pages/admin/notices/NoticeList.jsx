// import { useMemo, useState } from "react";
// import NoticeCard from "./Noticecard";
// import { FiBell, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// const NOTICES_PER_PAGE = 10;

// const TYPE_FILTERS = ["All", "General", "Campus Drive", "Deadline", "Update"];

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

// function NoticeList({
//   notices,
//   onEdit,
//   onDelete,
//   filter,
//   onFilterChange,
//   search,
//   onSearchChange,
// }) {
//   const [selectedMonth, setSelectedMonth] = useState("All");
//   const [selectedYear,  setSelectedYear]  = useState("All");
//   const [currentPage,   setCurrentPage]   = useState(1);

//   // ── Apply all filters: type + search + month + year ──
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

//   // ── Pagination ──
//   const totalPages = Math.ceil(filtered.length / NOTICES_PER_PAGE);
//   const paginated  = filtered.slice(
//     (currentPage - 1) * NOTICES_PER_PAGE,
//     currentPage * NOTICES_PER_PAGE
//   );

//   // Reset page 1 on any filter change
//   const handleMonthChange  = (val) => { setSelectedMonth(val); setCurrentPage(1); };
//   const handleYearChange   = (val) => { setSelectedYear(val);  setCurrentPage(1); };
//   const handleFilterChange = (f)   => { onFilterChange(f);     setCurrentPage(1); };
//   const handleSearchChange = (val) => { onSearchChange(val);   setCurrentPage(1); };

//   return (
//     <div className="space-y-4">

    
//       <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

        
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => handleSearchChange(e.target.value)}
//           placeholder="🔍 Search notices..."
//           className="w-full sm:w-64 border border-gray-200 rounded-xl px-4 py-2 text-sm
//           focus:ring-2 focus:ring-violet-400 focus:outline-none transition bg-white"
//         />

//         <div className="flex flex-wrap gap-2">
//           {TYPE_FILTERS.map((f) => (
//             <button
//               key={f}
//               onClick={() => handleFilterChange(f)}
//               className={`px-3 py-1.5 rounded-full text-xs font-semibold transition
//               ${filter === f
//                 ? "bg-violet-600 text-white shadow-sm"
//                 : "bg-white border border-gray-200 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {/* Count */}
//         <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
//           {filtered.length} notice{filtered.length !== 1 ? "s" : ""}
//         </span>
//       </div>

//       {/* ── Row 2: Month + Year Dropdowns ── */}
//       <div className="flex flex-wrap gap-3 items-center">
//         <span className="text-xs text-gray-400 font-medium">📅 Filter by:</span>

//         {/* Month Select */}
//         <select
//           value={selectedMonth}
//           onChange={(e) => handleMonthChange(e.target.value)}
//           className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white
//           focus:ring-2 focus:ring-indigo-400 focus:outline-none transition cursor-pointer
//           text-gray-600 font-medium"
//         >
//           {MONTH_OPTIONS.map((m) => (
//             <option key={m.value} value={m.value}>
//               {m.label}
//             </option>
//           ))}
//         </select>

//         {/* Year Select */}
//         <select
//           value={selectedYear}
//           onChange={(e) => handleYearChange(e.target.value)}
//           className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white
//           focus:ring-2 focus:ring-indigo-400 focus:outline-none transition cursor-pointer
//           text-gray-600 font-medium"
//         >
//           {YEAR_OPTIONS.map((y) => (
//             <option key={y.value} value={y.value}>
//               {y.label}
//             </option>
//           ))}
//         </select>

//         {/* Reset button — only show if filter is active */}
//         {(selectedMonth !== "All" || selectedYear !== "All") && (
//           <button
//             onClick={() => { setSelectedMonth("All"); setSelectedYear("All"); setCurrentPage(1); }}
//             className="text-xs text-red-400 hover:text-red-600 underline transition"
//           >
//             Reset
//           </button>
//         )}
//       </div>

//       {/* ── Notice Grid ── */}
//       {paginated.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//           <FiBell size={40} className="mb-3 opacity-30" />
//           <p className="text-sm font-medium">Koi notice nahi mila</p>
//           <p className="text-xs mt-1">Filter change karo ya naya notice add karo</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//           {paginated.map((notice) => (
//             <NoticeCard
//               key={notice._id}
//               notice={notice}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           ))}
//         </div>
//       )}

//       {/* ── Pagination ── */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-between pt-2">

//           <span className="text-xs text-gray-400">
//             Page {currentPage} of {totalPages} &nbsp;·&nbsp; {filtered.length} total
//           </span>

//           <div className="flex items-center gap-1">

//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-lg border border-gray-200 text-gray-500
//               hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30
//               disabled:cursor-not-allowed transition"
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
//                   : "border border-gray-200 text-gray-600 hover:bg-violet-50 hover:text-violet-600"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="p-2 rounded-lg border border-gray-200 text-gray-500
//               hover:bg-violet-50 hover:text-violet-600 disabled:opacity-30
//               disabled:cursor-not-allowed transition"
//             >
//               <FiChevronRight size={14} />
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default  NoticeList;

import { useMemo, useState } from "react";
import NoticeCard from "./Noticecard";
import { FiBell, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const NOTICES_PER_PAGE = 10;

const TYPE_FILTERS = ["All", "General", "Campus Drive", "Deadline", "Update"];

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

function NoticeList({
  notices,
  onEdit,
  onDelete,
  filter,
  onFilterChange,
  search,
  onSearchChange,
  mode = "notices",   // ← "notices" | "events"
}) {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear,  setSelectedYear]  = useState("All");
  const [currentPage,   setCurrentPage]   = useState(1);

  const isEvents = mode === "events";

  // ── Filters ───────────────────────────────────────────
  const filtered = useMemo(() => {
    return notices.filter((n) => {
      // Events tab pe type filter nahi
      const matchType = isEvents
        ? true
        : filter === "All" || n.noticeType === filter;

      const matchSearch =
        n.title?.toLowerCase().includes(search.toLowerCase()) ||
        n.description?.toLowerCase().includes(search.toLowerCase());

      const d = new Date(n.createdAt);
      const matchMonth = selectedMonth === "All" || d.getMonth() === Number(selectedMonth);
      const matchYear  = selectedYear  === "All" || d.getFullYear() === Number(selectedYear);

      return matchType && matchSearch && matchMonth && matchYear;
    });
  }, [notices, filter, search, selectedMonth, selectedYear, isEvents]);

  // ── Pagination ────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / NOTICES_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * NOTICES_PER_PAGE,
    currentPage * NOTICES_PER_PAGE
  );

  const handleMonthChange  = (val) => { setSelectedMonth(val); setCurrentPage(1); };
  const handleYearChange   = (val) => { setSelectedYear(val);  setCurrentPage(1); };
  const handleFilterChange = (f)   => { onFilterChange(f);     setCurrentPage(1); };
  const handleSearchChange = (val) => { onSearchChange(val);   setCurrentPage(1); };

  return (
    <div className="space-y-4">

      {/* ── Row 1: Search + Type Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={isEvents ? "🔍 Search events..." : "🔍 Search notices..."}
          className="w-full sm:w-64 border border-gray-200 dark:border-gray-600
          rounded-xl px-4 py-2 text-sm bg-white dark:bg-gray-700
          text-gray-800 dark:text-gray-100 placeholder-gray-400
          focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
        />

        {/* Type filters — sirf Notices tab pe dikhenge */}
        {!isEvents && (
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition
                ${filter === f
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* Count */}
        <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
          {filtered.length} {isEvents ? "event" : "notice"}{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Row 2: Month + Year ── */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          📅 Filter by:
        </span>

        <select
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 rounded-xl
          px-3 py-2 text-sm bg-white dark:bg-gray-700
          text-gray-600 dark:text-gray-200 font-medium
          focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
        >
          {MONTH_OPTIONS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 rounded-xl
          px-3 py-2 text-sm bg-white dark:bg-gray-700
          text-gray-600 dark:text-gray-200 font-medium
          focus:ring-2 focus:ring-violet-400 focus:outline-none transition cursor-pointer"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y.value} value={y.value}>{y.label}</option>
          ))}
        </select>

        {(selectedMonth !== "All" || selectedYear !== "All") && (
          <button
            onClick={() => { setSelectedMonth("All"); setSelectedYear("All"); setCurrentPage(1); }}
            className="text-xs text-red-400 hover:text-red-600 underline transition"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── Cards Grid ── */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20
        text-gray-400 dark:text-gray-500">
          {isEvents
            ? <FiCalendar size={40} className="mb-3 opacity-30" />
            : <FiBell size={40} className="mb-3 opacity-30" />
          }
          <p className="text-sm font-medium">
            {isEvents ? "No events found" : "No notices found"}
          </p>
          <p className="text-xs mt-1">
            Try chnaging filters or add a new  {isEvents ? "event" : "notice"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginated.map((notice) => (
            <NoticeCard
              key={notice._id}
              notice={notice}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Page {currentPage} of {totalPages} &nbsp;·&nbsp; {filtered.length} total
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

export default NoticeList;