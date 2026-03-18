import {
  FiEdit2, FiTrash2, FiMapPin, FiCalendar,
  FiDollarSign, FiUsers, FiCheckCircle, FiClock, FiLink
} from "react-icons/fi";

// ── Constants ─────────────────────────────────────────────
export const STATUS_STYLES = {
  upcoming:  { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",     dot: "bg-blue-400",   label: "Upcoming"  },
  completed: { badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", dot: "bg-green-400",  label: "Completed" },
  cancelled: { badge: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",         dot: "bg-red-400",    label: "Cancelled" },
};

// ── Helper ────────────────────────────────────────────────
function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
}

// ── DriveRow ──────────────────────────────────────────────
export default function DriveList({ drive, onEdit, onDelete }) {
  const s = STATUS_STYLES[drive.status] || STATUS_STYLES.upcoming;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100
    dark:border-gray-700 p-5 flex flex-col gap-3 hover:shadow-sm transition">

      {/* ── Company + Status + Actions ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base">
              {drive.companyName}
            </h3>
            <span className={`flex items-center gap-1 text-xs font-semibold
            px-2.5 py-0.5 rounded-full ${s.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
              {s.label}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <FiMapPin size={11} /> {drive.location}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(drive)}
            title="Edit"
            className="p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20
            text-gray-400 hover:text-violet-600 transition"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(drive)}
            title="Delete"
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20
            text-gray-400 hover:text-red-500 transition"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>

      {/* ── Job Roles ── */}
      {drive.jobRoles?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {drive.jobRoles.map((r, i) => (
            <span key={i} className="text-xs bg-violet-50 dark:bg-violet-900/20
            text-violet-600 dark:text-violet-300 px-2.5 py-0.5 rounded-full
            border border-violet-100 dark:border-violet-800">
              {r}
            </span>
          ))}
        </div>
      )}

      {/* ── Meta Row ── */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-400">
        {drive.driveDate && (
          <span className="flex items-center gap-1">
            <FiCalendar size={11} className="text-violet-400" />
            {formatDate(drive.driveDate)}
            {drive.time && ` · ${drive.time}`}
          </span>
        )}
        {drive.packageOffered && (
          <span className="flex items-center gap-1">
            <FiDollarSign size={11} className="text-green-400" />
            {drive.packageOffered}
          </span>
        )}
        {drive.registrationDeadline && (
          <span className="flex items-center gap-1 text-orange-400">
            <FiClock size={11} />
            Reg. Deadline: {formatDate(drive.registrationDeadline)}
          </span>
        )}
        {drive.registrationLink && (
          <a
            href={drive.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-violet-500 hover:underline"
          >
            <FiLink size={11} /> Registration Link
          </a>
        )}
      </div>

      {/* ── Stats (for completed drives) ── */}
      {(drive.totalRegistrations > 0 || drive.studentsPlaced > 0) && (
        <div className="flex gap-4 text-xs">
          {drive.totalRegistrations > 0 && (
            <span className="flex items-center gap-1 text-gray-500">
              <FiUsers size={11} /> {drive.totalRegistrations} registered
            </span>
          )}
          {drive.studentsPlaced > 0 && (
            <span className="flex items-center gap-1 text-green-500 font-medium">
              <FiCheckCircle size={11} /> {drive.studentsPlaced} placed
            </span>
          )}
        </div>
      )}

    </div>
  );
}