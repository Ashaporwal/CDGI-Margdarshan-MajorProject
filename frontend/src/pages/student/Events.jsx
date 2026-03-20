import { useEffect, useState } from "react";
import API from "../../services/api";
import { FiCalendar, FiExternalLink, FiSearch, FiTag } from "react-icons/fi";

// ── Event type config ────────────────────────────────────
const EVENT_TYPES = ["All", "Cultural", "eSports", "Technical", "Sports", "Other"];

const eventTypeStyle = (type) => {
  const map = {
    Cultural:  "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
    eSports:   "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    Technical: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    Sports:    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    Other:     "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  };
  return map[type] || map["Other"];
};

const eventTypeEmoji = (type) => {
  const map = {
    Cultural:  "🎭",
    eSports:   "🎮",
    Technical: "💻",
    Sports:    "🏆",
    Other:     "📌",
  };
  return map[type] || "📌";
};

// ── Status badge ─────────────────────────────────────────
function StatusBadge({ deadline }) {
  if (!deadline) return null;
  const now      = new Date();
  const end      = new Date(deadline);
  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return (
      <span className="text-xs bg-gray-100 dark:bg-gray-700
      text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full font-medium">
        Ended
      </span>
    );
  if (diffDays === 0)
    return (
      <span className="text-xs bg-red-100 dark:bg-red-900/30
      text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-medium animate-pulse">
        🔴 Last Day!
      </span>
    );
  if (diffDays <= 3)
    return (
      <span className="text-xs bg-orange-100 dark:bg-orange-900/30
      text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full font-medium">
        ⏰ {diffDays} day{diffDays > 1 ? "s" : ""} left
      </span>
    );
  return (
    <span className="text-xs bg-green-100 dark:bg-green-900/30
    text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-medium">
      ✅ Open
    </span>
  );
}

// ── Event Card ───────────────────────────────────────────
function EventCard({ event }) {
  const [expanded, setExpanded] = useState(false);
  const hasLongDesc = event.description?.length > 200;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border
    border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden
    hover:shadow-md transition-all duration-300">

      {/* Poster Image */}
      {event.posterImage && (
        <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${event.posterImage}`}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => e.target.style.display = "none"}
          />
        </div>
      )}

      {/* No poster — colorful banner */}
      {!event.posterImage && (
        <div className={`w-full h-12 ${
          event.eventType === "Cultural"  ? "bg-gradient-to-r from-pink-400 to-orange-400" :
          event.eventType === "eSports"   ? "bg-gradient-to-r from-blue-500 to-violet-500" :
          event.eventType === "Technical" ? "bg-gradient-to-r from-violet-500 to-indigo-500" :
          event.eventType === "Sports"    ? "bg-gradient-to-r from-green-400 to-teal-400" :
                                            "bg-gradient-to-r from-gray-400 to-gray-500"
        }`} />
      )}

      <div className="p-5">

        {/* Tags row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {event.eventType && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
              ${eventTypeStyle(event.eventType)}`}>
                {eventTypeEmoji(event.eventType)} {event.eventType}
              </span>
            )}
          </div>
          <StatusBadge deadline={event.deadline} />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2 leading-snug">
          {event.title}
        </h3>

        {/* Description */}
        <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3
        whitespace-pre-line">
          {hasLongDesc && !expanded
            ? event.description.slice(0, 200) + "..."
            : event.description}
          {hasLongDesc && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-violet-500 dark:text-violet-400 ml-1
              hover:underline text-xs font-medium"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Date */}
        {event.deadline && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400
          dark:text-gray-500 mb-4">
            <FiCalendar size={12} />
            <span>
              {new Date(event.deadline).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric"
              })}
            </span>
          </div>
        )}

        {/* Register Button */}
        {event.link ? (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-2.5
            rounded-xl text-sm font-semibold transition
            ${new Date(event.deadline) < new Date()
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed pointer-events-none"
              : event.eventType === "Cultural"  ? "bg-pink-500 hover:bg-pink-600 text-white" :
                event.eventType === "eSports"   ? "bg-blue-500 hover:bg-blue-600 text-white" :
                event.eventType === "Technical" ? "bg-violet-600 hover:bg-violet-700 text-white" :
                event.eventType === "Sports"    ? "bg-green-500 hover:bg-green-600 text-white" :
                                                  "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            <FiExternalLink size={14} />
            {new Date(event.deadline) < new Date() ? "Registration Closed" : "Register Now"}
          </a>
        ) : (
          <div className="text-xs text-center text-gray-400 dark:text-gray-500 py-2">
            No registration link available
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
export default function StudentEvents() {
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/api/notice");
        const all = res.data.notices || res.data || [];
        // Filter only Event type notices
        setEvents(all.filter((n) => n.noticeType === "Event"));
      } catch (err) {
        console.error("Events fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ── Filter + Search ──────────────────────────────────
  const filtered = events.filter((e) => {
    const matchType   = filter === "All" || e.eventType === filter;
    const matchSearch = e.title?.toLowerCase().includes(search.toLowerCase()) ||
                        e.description?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  // ── Separate active vs ended ─────────────────────────
  const now     = new Date();
  const active  = filtered.filter((e) => !e.deadline || new Date(e.deadline) >= now);
  const ended   = filtered.filter((e) => e.deadline && new Date(e.deadline) < now);

  // ── Loading ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600
          rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 dark:text-gray-500">Loading events...</p>
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
          Participate, showcase your talent and win!
        </p>
      </div>

      {/* ── Search + Filter ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <FiSearch size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200
              dark:border-gray-600 rounded-xl text-sm
              bg-white dark:bg-gray-700
              text-gray-800 dark:text-gray-100
              placeholder-gray-400 focus:ring-2 focus:ring-violet-400
              focus:outline-none transition"
            />
          </div>

          {/* Event Type Filter */}
          <div className="flex gap-2 flex-wrap">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold
                transition border
                ${filter === type
                  ? "bg-violet-600 text-white border-violet-600"
                  : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                }`}
              >
                {type === "All" ? "All Events" : `${eventTypeEmoji(type)} ${type}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── No events ── */}
      {filtered.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 p-16 text-center">
          <p className="text-4xl mb-3">🎭</p>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            No events found
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Check back later for upcoming events!
          </p>
        </div>
      )}

      {/* ── Active Events ── */}
      {active.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400
          uppercase tracking-wide mb-3">
            🟢 Upcoming & Active ({active.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {active.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* ── Ended Events ── */}
      {ended.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500
          uppercase tracking-wide mb-3">
            ⚫ Past Events ({ended.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 opacity-60">
            {ended.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}