import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  FiCalendar, FiExternalLink, FiSearch,
  FiMapPin, FiClock, FiAlertCircle,
  FiCheckCircle
} from "react-icons/fi";

// ── Status Badge ─────────────────────────────────────────
function StatusBadge({ deadline }) {
  if (!deadline) return (
    <span className="text-xs bg-green-100 dark:bg-green-900/30
    text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full font-semibold">
      ✅ Open
    </span>
  );

  const now      = new Date();
  const end      = new Date(deadline);
  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return (
      <span className="text-xs bg-gray-100 dark:bg-gray-700
      text-gray-400 px-2.5 py-1 rounded-full font-semibold">
        Ended
      </span>
    );
  if (diffDays === 0)
    return (
      <span className="text-xs bg-red-100 dark:bg-red-900/30
      text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full
      font-semibold animate-pulse">
        🔴 Last Day!
      </span>
    );
  if (diffDays <= 3)
    return (
      <span className="text-xs bg-orange-100 dark:bg-orange-900/30
      text-orange-500 px-2.5 py-1 rounded-full font-semibold">
        ⏰ {diffDays} day{diffDays > 1 ? "s" : ""} left
      </span>
    );
  return (
    <span className="text-xs bg-green-100 dark:bg-green-900/30
    text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full font-semibold">
      ✅ Open
    </span>
  );
}

// ── Gradient for banner ───────────────────────────────────
const GRADIENTS = [
  "from-violet-500 to-indigo-500",
  "from-pink-500 to-rose-500",
  "from-orange-400 to-amber-500",
  "from-teal-500 to-cyan-500",
  "from-blue-500 to-violet-500",
  "from-green-500 to-teal-500",
];
const getGradient = (title) =>
  GRADIENTS[(title?.charCodeAt(0) || 0) % GRADIENTS.length];

// ── Format date + time ────────────────────────────────────
const formatDateTime = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const date = d.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true
  });
  return `${date} · ${time}`;
};

// ── Horizontal Event Row ──────────────────────────────────
function EventRow({ event }) {
  const [expanded, setExpanded] = useState(false);
  const hasLongDesc = event.description?.length > 150;
  const isEnded     = event.deadline && new Date(event.deadline) < new Date();
  const gradient    = getGradient(event.title);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border
    border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden
    hover:shadow-md transition-all duration-300
    ${isEnded ? "opacity-65" : ""}`}>

      <div className="flex">

        {/* ── Left: Image / Gradient ── */}
        <div className="flex-shrink-0 w-36 sm:w-48">
          {event.posterImage ? (
            <img
              src={event.posterImage}
              alt={event.title}
              className="w-full h-full object-cover"
              style={{ minHeight: "140px" }}
              onError={(e) => e.target.style.display = "none"}
            />
          ) : (
            <div className={`w-full h-full min-h-[140px] bg-gradient-to-br
            ${gradient} flex items-center justify-center`}>
              <span className="text-4xl">🎉</span>
            </div>
          )}
        </div>

        {/* ── Right: Content ── */}
        <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">

          {/* Top row: Status + Date */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <StatusBadge deadline={event.deadline} />
            {event.eventDate && (
              <div className="flex items-center gap-1 text-xs
              text-gray-400 dark:text-gray-500">
                <FiCalendar size={11} />
                {new Date(event.eventDate).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100
          leading-snug">
            {event.title}
          </h3>

          {/* Venue */}
          {event.venue && (
            <div className="flex items-center gap-1 text-xs
            text-gray-400 dark:text-gray-500">
              <FiMapPin size={10} />
              <span>{event.venue}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-xs text-gray-500 dark:text-gray-400
          leading-relaxed whitespace-pre-line">
            {hasLongDesc && !expanded
              ? event.description.slice(0, 150) + "..."
              : event.description}
            {hasLongDesc && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-violet-500 ml-1 hover:underline
                text-xs font-semibold"
              >
                {expanded ? " Show less" : " Read more"}
              </button>
            )}
          </p>

          {/* Bottom row: deadline + button */}
          <div className="flex items-center justify-between gap-2
          flex-wrap mt-auto pt-1">

            {/* Posted time */}
            {event.createdAt && (
              <div className="flex items-center gap-1 text-xs
              text-gray-400 dark:text-gray-500">
                <FiClock size={10} />
                <span>Posted: {formatDateTime(event.createdAt)}</span>
              </div>
            )}

            {/* Register / Closed */}
            {event.link ? (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-4 py-1.5
                rounded-xl text-xs font-semibold transition flex-shrink-0
                ${isEnded
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none"
                  : `bg-gradient-to-r ${gradient} text-white hover:opacity-90 shadow-sm`
                }`}
              >
                <FiExternalLink size={12} />
                {isEnded ? "Closed" : "Register"}
              </a>
            ) : null}
          </div>

          {/* Registration deadline */}
          {event.deadline && !isEnded && (
            <div className="flex items-center gap-1 text-xs
            text-gray-400 dark:text-gray-500">
              <FiClock size={10} />
              <span>
                Deadline:{" "}
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                  {formatDateTime(event.deadline)}
                </span>
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border
    border-gray-100 dark:border-gray-700 shadow-sm p-5
    flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center
      justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
export default function StudentEvents() {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/api/notice");
        const all = res.data.notices || res.data || [];
        setEvents(all.filter((n) => n.noticeType === "Event"));
      } catch (err) {
        console.error("Events fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const now = new Date();

  const filtered = events.filter((e) =>
    e.title?.toLowerCase().includes(search.toLowerCase()) ||
    e.description?.toLowerCase().includes(search.toLowerCase())
  );

  const active = filtered.filter(
    (e) => !e.deadline || new Date(e.deadline) >= now
  );
  const ended = filtered.filter(
    (e) => e.deadline && new Date(e.deadline) < now
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-violet-200
          border-t-violet-600 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Loading events...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          🎉 College Events
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          Participate, showcase your talent and be part of the celebration!
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<FiCalendar size={18} className="text-violet-600" />}
          label="Total Events"
          value={events.length}
          color="bg-violet-50 dark:bg-violet-900/20"
        />
        <StatCard
          icon={<FiCheckCircle size={18} className="text-green-600" />}
          label="Active Now"
          value={events.filter(
            (e) => !e.deadline || new Date(e.deadline) >= now
          ).length}
          color="bg-green-50 dark:bg-green-900/20"
        />
      </div>

      {/* ── Search ── */}
      <div className="relative">
        <FiSearch size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-200
          dark:border-gray-600 rounded-2xl text-sm
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100 placeholder-gray-400
          focus:ring-2 focus:ring-violet-400 focus:outline-none
          shadow-sm transition"
        />
      </div>

      {/* ── No events ── */}
      {filtered.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 p-16 text-center">
          <FiAlertCircle size={36}
            className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400 font-semibold">
            No events found
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Check back later for upcoming events!
          </p>
        </div>
      )}

      {/* ── Active Events ── */}
      {active.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500
            animate-pulse" />
            <h2 className="text-sm font-bold text-gray-600
            dark:text-gray-300 uppercase tracking-widest">
              Upcoming & Active — {active.length}
            </h2>
          </div>
          <div className="space-y-3">
            {active.map((event) => (
              <EventRow key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* ── Past Events ── */}
      {ended.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <h2 className="text-sm font-bold text-gray-400
            dark:text-gray-500 uppercase tracking-widest">
              Past Events — {ended.length}
            </h2>
          </div>
          <div className="space-y-3">
            {ended.map((event) => (
              <EventRow key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import {
//   FiCalendar, FiExternalLink, FiSearch,
//   FiMapPin, FiClock, FiAlertCircle,
//   FiCheckCircle, FiX, FiArrowRight
// } from "react-icons/fi";

// // ── Helpers ───────────────────────────────────────────────
// const GRADIENTS = [
//   ["from-violet-500 to-indigo-500", "#7c3aed"],
//   ["from-pink-500 to-rose-400",     "#ec4899"],
//   ["from-orange-400 to-amber-400",  "#f59e0b"],
//   ["from-teal-500 to-cyan-400",     "#14b8a6"],
//   ["from-blue-500 to-violet-400",   "#3b82f6"],
//   ["from-green-500 to-emerald-400", "#22c55e"],
// ];
// const getGradient = (title) =>
//   GRADIENTS[(title?.charCodeAt(0) || 0) % GRADIENTS.length];

// const formatDateTime = (dateStr) => {
//   if (!dateStr) return null;
//   const d = new Date(dateStr);
//   return `${d.toLocaleDateString("en-IN", {
//     day: "numeric", month: "short", year: "numeric"
//   })} · ${d.toLocaleTimeString("en-IN", {
//     hour: "2-digit", minute: "2-digit", hour12: true
//   })}`;
// };

// // ── Status Badge ─────────────────────────────────────────
// function StatusBadge({ deadline }) {
//   if (!deadline) return (
//     <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30
//     text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
//       Open
//     </span>
//   );
//   const now = new Date();
//   const end = new Date(deadline);
//   const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

//   if (diffDays < 0)
//     return <span className="text-xs bg-gray-100 dark:bg-gray-700
//     text-gray-400 px-2 py-0.5 rounded-full font-semibold">Ended</span>;
//   if (diffDays === 0)
//     return <span className="text-xs bg-red-50 dark:bg-red-900/30
//     text-red-500 px-2 py-0.5 rounded-full font-semibold animate-pulse">
//       Last Day!</span>;
//   if (diffDays <= 3)
//     return <span className="text-xs bg-amber-50 dark:bg-amber-900/30
//     text-amber-600 px-2 py-0.5 rounded-full font-semibold">
//       {diffDays}d left</span>;
//   return <span className="text-xs bg-emerald-50 dark:bg-emerald-900/30
//   text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
//     Open</span>;
// }

// // ── Event Modal ───────────────────────────────────────────
// function EventModal({ event, onClose }) {
//   if (!event) return null;
//   const isEnded    = event.deadline && new Date(event.deadline) < new Date();
//   const [grad]     = getGradient(event.title);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center
//     bg-black/60 backdrop-blur-sm px-4"
//       onClick={onClose}>
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
//       w-full max-w-md flex flex-col overflow-hidden"
//         style={{ maxHeight: "88vh" }}
//         onClick={(e) => e.stopPropagation()}>

//         {/* Poster */}
//         {event.posterImage ? (
//           <div className="w-full h-52 flex-shrink-0">
//             <img src={event.posterImage} alt={event.title}
//               className="w-full h-full object-cover" />
//           </div>
//         ) : (
//           <div className={`w-full h-28 flex-shrink-0 bg-gradient-to-br
//           ${grad} flex items-center justify-center`}>
//             <span className="text-4xl">🎉</span>
//           </div>
//         )}

//         {/* Content */}
//         <div className="overflow-y-auto flex-1 p-5 space-y-3">
//           <div className="flex items-start justify-between">
//             <StatusBadge deadline={event.deadline} />
//             <button onClick={onClose}
//               className="p-1 rounded-lg hover:bg-gray-100
//               dark:hover:bg-gray-700 text-gray-400 transition">
//               <FiX size={16} />
//             </button>
//           </div>

//           <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100
//           leading-snug">
//             {event.title}
//           </h2>

//           <div className="space-y-2 text-sm">
//             {event.eventDate && (
//               <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//                 <FiCalendar size={13} className="text-violet-500 flex-shrink-0" />
//                 <span>{new Date(event.eventDate).toLocaleDateString("en-IN", {
//                   weekday: "long", day: "numeric", month: "long", year: "numeric"
//                 })}</span>
//               </div>
//             )}
//             {event.venue && (
//               <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//                 <FiMapPin size={13} className="text-pink-500 flex-shrink-0" />
//                 <span>{event.venue}</span>
//               </div>
//             )}
//             {event.deadline && (
//               <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//                 <FiClock size={13} className="text-amber-500 flex-shrink-0" />
//                 <span>Deadline: <span className="font-semibold text-gray-700
//                 dark:text-gray-300">{formatDateTime(event.deadline)}</span></span>
//               </div>
//             )}
//             {event.createdAt && (
//               <div className="flex items-center gap-2 text-xs
//               text-gray-400 dark:text-gray-500">
//                 <FiClock size={11} className="flex-shrink-0" />
//                 <span>Posted: {formatDateTime(event.createdAt)}</span>
//               </div>
//             )}
//           </div>

//           <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
//             <p className="text-sm text-gray-600 dark:text-gray-300
//             leading-relaxed whitespace-pre-line">
//               {event.description}
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
//           {event.link ? (
//             <a href={event.link} target="_blank" rel="noopener noreferrer"
//               className={`flex items-center justify-center gap-2 w-full py-2.5
//               rounded-xl text-sm font-semibold transition
//               ${isEnded
//                 ? "bg-gray-100 dark:bg-gray-700 text-gray-400 pointer-events-none"
//                 : `bg-gradient-to-r ${grad} text-white hover:opacity-90 shadow-sm`
//               }`}>
//               <FiExternalLink size={14} />
//               {isEnded ? "Registration Closed" : "Register Now"}
//             </a>
//           ) : (
//             <button onClick={onClose}
//               className="w-full py-2.5 rounded-xl border border-gray-200
//               dark:border-gray-600 text-gray-600 dark:text-gray-300
//               text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
//               Close
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Event Card ────────────────────────────────────────────
// function EventCard({ event, onClick }) {
//   const isEnded   = event.deadline && new Date(event.deadline) < new Date();
//   const [grad, accent] = getGradient(event.title);

//   return (
//     <div onClick={onClick}
//       className={`bg-white dark:bg-gray-800 rounded-2xl border
//       border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden
//       cursor-pointer hover:shadow-lg hover:-translate-y-0.5
//       transition-all duration-200 flex flex-col
//       ${isEnded ? "opacity-60" : ""}`}>

//       {/* Image — fixed h-36 always */}
//       <div className="w-full h-36 flex-shrink-0 overflow-hidden relative">
//         {event.posterImage ? (
//           <img src={event.posterImage} alt={event.title}
//             className="w-full h-full object-cover" />
//         ) : (
//           <div className={`w-full h-full bg-gradient-to-br ${grad}
//           flex items-center justify-center`}>
//             <span className="text-4xl">🎉</span>
//           </div>
//         )}
//         {/* Status overlay top-right */}
//         <div className="absolute top-2.5 right-2.5">
//           <StatusBadge deadline={event.deadline} />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4 flex flex-col gap-1.5 flex-1">

//         {/* Title — always 2 lines max */}
//         <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100
//         line-clamp-2 leading-snug">
//           {event.title}
//         </h3>

//         {/* Meta row */}
//         <div className="flex items-center gap-3 text-xs text-gray-400
//         dark:text-gray-500">
//           {event.eventDate && (
//             <div className="flex items-center gap-1">
//               <FiCalendar size={10} />
//               {new Date(event.eventDate).toLocaleDateString("en-IN", {
//                 day: "numeric", month: "short"
//               })}
//             </div>
//           )}
//           {event.venue && (
//             <div className="flex items-center gap-1 truncate">
//               <FiMapPin size={10} />
//               <span className="truncate">{event.venue}</span>
//             </div>
//           )}
//         </div>

//         {/* Description — 2 lines max */}
//         <p className="text-xs text-gray-500 dark:text-gray-400
//         line-clamp-2 leading-relaxed">
//           {event.description}
//         </p>

//         {/* Footer */}
//         <div className="flex items-center justify-between mt-auto pt-2
//         border-t border-gray-50 dark:border-gray-700/50">
//           <span className="text-xs text-gray-400 dark:text-gray-500">
//             {event.createdAt
//               ? new Date(event.createdAt).toLocaleDateString("en-IN", {
//                   day: "numeric", month: "short"
//                 })
//               : ""}
//           </span>
//           <span className="text-xs font-semibold flex items-center gap-1"
//             style={{ color: accent }}>
//             {isEnded ? "View Details" : "Details & Register"}
//             <FiArrowRight size={11} />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ════════════════════════════════════════════════════════
// export default function StudentEvents() {
//   const [events,      setEvents]      = useState([]);
//   const [loading,     setLoading]     = useState(true);
//   const [search,      setSearch]      = useState("");
//   const [activeEvent, setActiveEvent] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await API.get("/api/notice");
//         const all = res.data.notices || res.data || [];
//         setEvents(all.filter((n) => n.noticeType === "Event"));
//       } catch (err) {
//         console.error("Events fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const now = new Date();

//   const filtered = events.filter((e) =>
//     e.title?.toLowerCase().includes(search.toLowerCase()) ||
//     e.description?.toLowerCase().includes(search.toLowerCase())
//   );

//   const active = filtered.filter(
//     (e) => !e.deadline || new Date(e.deadline) >= now
//   );
//   const ended = filtered.filter(
//     (e) => e.deadline && new Date(e.deadline) < now
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="w-10 h-10 border-4 border-violet-200
//         border-t-violet-600 rounded-full animate-spin mx-auto" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5">

//       {/* ── Header + Stats inline ── */}
//       <div className="flex items-start justify-between gap-4 flex-wrap">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//             🎉 College Events
//           </h1>
//           <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
//             Participate, showcase your talent and win!
//           </p>
//         </div>

//         {/* Compact stat pills */}
//         <div className="flex items-center gap-3">
//           <div className="bg-white dark:bg-gray-800 border border-gray-100
//           dark:border-gray-700 rounded-xl px-4 py-2.5 text-center shadow-sm">
//             <p className="text-xl font-bold text-violet-600">{events.length}</p>
//             <p className="text-xs text-gray-400 dark:text-gray-500">Total</p>
//           </div>
//           <div className="bg-white dark:bg-gray-800 border border-gray-100
//           dark:border-gray-700 rounded-xl px-4 py-2.5 text-center shadow-sm">
//             <p className="text-xl font-bold text-emerald-500">
//               {events.filter((e) => !e.deadline || new Date(e.deadline) >= now).length}
//             </p>
//             <p className="text-xs text-gray-400 dark:text-gray-500">Active</p>
//           </div>
//         </div>
//       </div>

//       {/* ── Search ── */}
//       <div className="relative">
//         <FiSearch size={14}
//           className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//         <input type="text" placeholder="Search events..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-10 pr-4 py-2.5 border border-gray-200
//           dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800
//           text-gray-800 dark:text-gray-100 placeholder-gray-400
//           focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
//         />
//       </div>

//       {/* ── No events ── */}
//       {filtered.length === 0 && (
//         <div className="bg-white dark:bg-gray-800 rounded-2xl border
//         border-gray-100 dark:border-gray-700 p-14 text-center">
//           <FiAlertCircle size={32}
//             className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
//           <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
//             No events found
//           </p>
//           <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
//             Check back later for upcoming events!
//           </p>
//         </div>
//       )}

//       {/* ── Active ── */}
//       {active.length > 0 && (
//         <div className="space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <p className="text-xs font-bold text-gray-500 dark:text-gray-400
//             uppercase tracking-widest">
//               Upcoming & Active — {active.length}
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {active.map((event) => (
//               <EventCard key={event._id} event={event}
//                 onClick={() => setActiveEvent(event)} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── Past ── */}
//       {ended.length > 0 && (
//         <div className="space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
//             <p className="text-xs font-bold text-gray-400 dark:text-gray-500
//             uppercase tracking-widest">
//               Past Events — {ended.length}
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {ended.map((event) => (
//               <EventCard key={event._id} event={event}
//                 onClick={() => setActiveEvent(event)} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── Modal ── */}
//       <EventModal event={activeEvent}
//         onClose={() => setActiveEvent(null)} />

//     </div>
//   );
// }