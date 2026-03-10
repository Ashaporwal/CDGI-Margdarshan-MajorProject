import { FiEdit2, FiTrash2, FiCalendar, FiLink, FiClock } from "react-icons/fi";

const TYPE_STYLES = {
  General:        { bg: "bg-blue-50",   badge: "bg-blue-100 text-blue-700",   dot: "bg-blue-400"   },
  "Campus Drive": { bg: "bg-green-50",  badge: "bg-green-100 text-green-700", dot: "bg-green-400"  },
  Deadline:       { bg: "bg-red-50",    badge: "bg-red-100 text-red-700",     dot: "bg-red-400"    },
  Update:         { bg: "bg-yellow-50", badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function isExpiringSoon(deadline) {
  if (!deadline) return false;
  const diff = new Date(deadline) - new Date();
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000; // within 3 days
}

function isExpired(deadline) {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
}

function NoticeCard({ notice, onEdit, onDelete }) {
  const style = TYPE_STYLES[notice.noticeType] || TYPE_STYLES["General"];
  const expiringSoon = isExpiringSoon(notice.deadline);
  const expired = isExpired(notice.deadline);

  return (
    <div
      className={`relative rounded-2xl border border-gray-100 shadow-sm hover:shadow-md 
      transition-all duration-200 p-5 flex flex-col gap-3 ${style.bg} group`}
    >
      {/* Top Row — Type Badge + Actions */}
      <div className="flex items-start justify-between gap-2">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${style.badge} flex items-center gap-1`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
          {notice.noticeType}
        </span>

        {/* Edit / Delete buttons — visible on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit(notice)}
            className="p-1.5 rounded-lg bg-white shadow-sm hover:bg-violet-50 hover:text-violet-600 transition text-gray-500"
            title="Edit"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(notice._id)}
            className="p-1.5 rounded-lg bg-white shadow-sm hover:bg-red-50 hover:text-red-600 transition text-gray-500"
            title="Delete"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 text-base leading-snug line-clamp-2">
        {notice.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
        {notice.description}
      </p>

      {/* Footer — Deadline + Link + Date */}
      <div className="flex flex-wrap items-center gap-3 mt-auto pt-2 border-t border-gray-200 border-opacity-60">

        {/* Posted date */}
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <FiClock size={11} />
          {formatDate(notice.createdAt)}
        </span>

        {/* Deadline */}
        {notice.deadline && (
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full
            ${expired
              ? "bg-gray-100 text-gray-400 line-through"
              : expiringSoon
              ? "bg-red-100 text-red-600 animate-pulse"
              : "bg-orange-50 text-orange-600"
            }`}
          >
            <FiCalendar size={11} />
            {expired ? "Expired: " : expiringSoon ? "⚠️ Due: " : "Deadline: "}
            {formatDate(notice.deadline)}
          </span>
        )}

        {/* External link */}
        {notice.link && (
          <a
            href={notice.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-violet-500 hover:text-violet-700 hover:underline ml-auto"
          >
            <FiLink size={11} />
            View Link
          </a>
        )}
      </div>
    </div>
  );
}


export default NoticeCard;