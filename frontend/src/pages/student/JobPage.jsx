import { useState, useEffect, useMemo } from "react";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiBriefcase, FiMapPin, FiClock, FiDollarSign,
  FiCalendar, FiUser, FiChevronLeft, FiChevronRight,
  FiChevronUp, FiChevronDown,
  FiAward, FiUsers, FiCheckCircle, FiAlertCircle, FiXCircle
} from "react-icons/fi";

// ── Constants ─────────────────────────────────────────────
const ITEMS_PER_PAGE = 9;

// ── Helpers ───────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function DeadlineBadge({ deadline }) {
  if (!deadline) return null;
  const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  if (days < 0)
    return (
      <span className="flex items-center gap-1 text-xs text-gray-400">
        <FiXCircle size={11} /> Closed
      </span>
    );
  if (days <= 3)
    return (
      <span className="flex items-center gap-1 text-xs text-red-500 font-semibold animate-pulse">
        <FiAlertCircle size={11} /> {days}d left
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-xs text-gray-400">
      <FiCalendar size={11} /> {formatDate(deadline)}
    </span>
  );
}

// ── Job Card ──────────────────────────────────────────────
function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);
  const isInternship = job.jobType === "Internship";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100
    dark:border-gray-700 p-5 flex flex-col gap-3 hover:shadow-md
    transition-all duration-200 hover:-translate-y-0.5">

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base leading-snug truncate">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">
            {job.company}
          </p>
        </div>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full
        ${isInternship
          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
        }`}>
          {job.jobType}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1">
          <FiMapPin size={11} /> {job.location}
        </span>
        {job.salary && (
          <span className="flex items-center gap-1">
            <FiDollarSign size={11} /> {job.salary}
          </span>
        )}
        {job.minCGPA && (
          <span className="flex items-center gap-1">
            <FiAward size={11} /> Min CGPA: {job.minCGPA}
          </span>
        )}
      </div>

      {/* Skills */}
      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map((s, i) => (
            <span key={i} className="text-xs bg-violet-50 dark:bg-violet-900/20
            text-violet-600 dark:text-violet-300 px-2 py-0.5 rounded-full">
              {s}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-xs text-gray-400">+{job.skills.length - 4}</span>
          )}
        </div>
      )}

      {/* Description */}
      {job.description && (
        <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          <p>
            {expanded
              ? job.description
              : job.description.slice(0, 100) + (job.description.length > 100 ? "..." : "")}
          </p>
          {job.description.length > 100 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-violet-500 hover:text-violet-700 mt-1 font-medium"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 mt-auto
      border-t border-gray-100 dark:border-gray-700">
        <DeadlineBadge deadline={job.deadline} />
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <FiUser size={11} />
          {job.postedBy?.name || "Admin"}
          {job.postedBy?.role === "alumni" && (
            <span className="ml-1 text-xs bg-blue-100 text-blue-600
            dark:bg-blue-900/30 dark:text-blue-300 px-1.5 rounded-full">
              Alumni
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

// ── Campus Drive Card ─────────────────────────────────────
function DriveCard({ drive }) {
  const [showDesc, setShowDesc]   = useState(false);
  const [showElig, setShowElig]   = useState(false);

  const STATUS_STYLES = {
    upcoming:  { badge: "bg-blue-50 text-blue-600 border border-blue-200",    icon: <FiClock size={11} />,       label: "Upcoming"  },
    completed: { badge: "bg-green-50 text-green-600 border border-green-200", icon: <FiCheckCircle size={11} />, label: "Completed" },
    cancelled: { badge: "bg-red-50 text-red-500 border border-red-200",       icon: <FiXCircle size={11} />,     label: "Cancelled" },
  };
  const s = STATUS_STYLES[drive.status] || STATUS_STYLES.upcoming;

  const isLongDesc = drive.description?.length > 100;
  const isLongElig = drive.eligibilityCriteria?.length > 80;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100
    dark:border-gray-700 border-l-4 border-l-violet-400 p-5 flex flex-col gap-4
    hover:shadow-md transition-all duration-200">

      {/* ── Row 1: Company + Status ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-base leading-snug">
            {drive.companyName}
          </h3>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <FiMapPin size={11} /> {drive.location}
          </p>
        </div>
        <span className={`shrink-0 flex items-center gap-1 text-xs font-semibold
        px-2.5 py-1 rounded-full ${s.badge}`}>
          {s.icon} {s.label}
        </span>
      </div>

      {/* ── Row 2: Job Roles ── */}
      {drive.jobRoles?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {drive.jobRoles.map((role, i) => (
            <span key={i} className="text-xs font-medium bg-violet-50 dark:bg-violet-900/20
            text-violet-600 dark:text-violet-300 px-2.5 py-1 rounded-full border
            border-violet-100 dark:border-violet-800">
              {role}
            </span>
          ))}
        </div>
      )}

      {/* ── Row 3: Date + Package ── */}
      <div className="flex flex-wrap gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400
        bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1.5 rounded-lg">
          <FiCalendar size={11} className="text-violet-400" />
          {formatDate(drive.driveDate)}
          {drive.time && (
            <span className="text-gray-400"> · {drive.time}</span>
          )}
        </span>
        {drive.packageOffered && (
          <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400
          bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1.5 rounded-lg">
            <FiDollarSign size={11} className="text-green-400" />
            {drive.packageOffered}
          </span>
        )}
      </div>

      {/* ── Row 4: Eligibility (collapsible) ── */}
      {drive.eligibilityCriteria && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100
        dark:border-amber-800/30 rounded-xl px-3 py-2.5">
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            📋 {showElig
              ? drive.eligibilityCriteria
              : drive.eligibilityCriteria.slice(0, 190) + (isLongElig ? "..." : "")}
          </p>
          {isLongElig && (
            <button
              onClick={() => setShowElig(!showElig)}
              className="text-xs text-amber-600 hover:text-amber-800 font-semibold mt-1"
            >
              {showElig ? "Show Less ↑" : "Show More ↓"}
            </button>
          )}
        </div>
      )}

      {/* ── Row 5: Description (collapsible) ── */}
      {drive.description && (
        <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          <p>
            {showDesc
              ? drive.description
              : drive.description.slice(0, 100) + (isLongDesc ? "..." : "")}
          </p>
          {isLongDesc && (
            <button
              onClick={() => setShowDesc(!showDesc)}
              className="flex items-center gap-1 mt-1.5 text-xs font-semibold
              text-violet-500 hover:text-violet-700 transition"
            >
              {showDesc
                ? <><FiChevronUp size={13} /> Read Less</>
                : <><FiChevronDown size={13} /> Read More</>
              }
            </button>
          )}
        </div>
      )}

      {/* ── Row 6: Footer ── */}
      <div className="flex items-center justify-between pt-2
      border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {drive.totalRegistrations > 0 && (
            <span className="flex items-center gap-1">
              <FiUsers size={11} /> {drive.totalRegistrations} registered
            </span>
          )}
          {drive.studentsPlaced > 0 && (
            <span className="flex items-center gap-1 text-green-500 font-medium">
              <FiCheckCircle size={11} /> {drive.studentsPlaced} placed
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <FiUser size={11} /> {drive.createdBy?.name || "Admin"}
        </span>
      </div>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────
function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1 pt-4">
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
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function JobPage() {
  const [activeTab, setActiveTab]     = useState("jobs");
  const [jobs, setJobs]               = useState([]);
  const [drives, setDrives]           = useState([]);
  const [loadingJobs, setLoadingJobs]     = useState(true);
  const [loadingDrives, setLoadingDrives] = useState(true);

  // Jobs filters
  const [jobSearch, setJobSearch] = useState("");
  const [jobType, setJobType]     = useState("All");
  const [jobPage, setJobPage]     = useState(1);

  // Drives filters
  const [driveSearch, setDriveSearch]   = useState("");
  const [driveStatus, setDriveStatus]   = useState("All");
  const [drivePage, setDrivePage]       = useState(1);

  // ── Fetch ──────────────────────────────────────────────
  useEffect(() => {
    API.get("/api/jobs")
      .then(({ data }) => setJobs(data.jobs || []))
      .catch(() => toast.error("Failed to fetch jobs"))
      .finally(() => setLoadingJobs(false));
  }, []);

  useEffect(() => {
    API.get("/api/campus-drives")
      .then(({ data }) => setDrives(data.drives || []))
      .catch(() => toast.error("Failed to fetch campus drives"))
      .finally(() => setLoadingDrives(false));
  }, []);

  // ── Filter ─────────────────────────────────────────────
  const filteredJobs = useMemo(() => jobs.filter(j => {
    const q = jobSearch.toLowerCase();
    const matchSearch = !q ||
      j.title?.toLowerCase().includes(q) ||
      j.company?.toLowerCase().includes(q) ||
      j.location?.toLowerCase().includes(q);
    const matchType = jobType === "All" || j.jobType === jobType;
    return matchSearch && matchType;
  }), [jobs, jobSearch, jobType]);

  const filteredDrives = useMemo(() => drives.filter(d => {
    const q = driveSearch.toLowerCase();
    const matchSearch = !q ||
      d.companyName?.toLowerCase().includes(q) ||
      d.location?.toLowerCase().includes(q) ||
      d.jobRoles?.some(r => r.toLowerCase().includes(q));
    const matchStatus = driveStatus === "All" || d.status === driveStatus;
    return matchSearch && matchStatus;
  }), [drives, driveSearch, driveStatus]);

  const paginatedJobs   = filteredJobs.slice((jobPage - 1) * ITEMS_PER_PAGE, jobPage * ITEMS_PER_PAGE);
  const paginatedDrives = filteredDrives.slice((drivePage - 1) * ITEMS_PER_PAGE, drivePage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <FiBriefcase className="text-violet-500" />
          Job Opportunities
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Jobs posted by alumni & official campus drives from placement cell
        </p>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl w-fit">
        {[
          { key: "jobs",   label: "All Jobs",      icon: <FiBriefcase size={14} />, count: jobs.length   },
          { key: "drives", label: "Campus Drives",  icon: <FiAward size={14} />,    count: drives.length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition
            ${activeTab === tab.key
              ? "bg-white dark:bg-gray-800 text-violet-600 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full
            ${activeTab === tab.key
              ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
              : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Jobs Tab ── */}
      {activeTab === "jobs" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border
          border-gray-100 dark:border-gray-700 shadow-sm p-4 space-y-3">
            <input
              type="text"
              value={jobSearch}
              onChange={(e) => { setJobSearch(e.target.value); setJobPage(1); }}
              placeholder="🔍 Search by title, company, location..."
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl
              px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100
              focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
            />
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Full-time", "Internship"].map(t => (
                <button
                  key={t}
                  onClick={() => { setJobType(t); setJobPage(1); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition
                  ${jobType === t
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >{t}</button>
              ))}
              <span className="ml-auto text-xs text-gray-400">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {loadingJobs ? (
            <p className="text-center py-20 text-gray-400 text-sm">Loading jobs...</p>
          ) : paginatedJobs.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-gray-400">
              <FiBriefcase size={40} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">No jobs found</p>
              <p className="text-xs mt-1">Try changing filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
              {paginatedJobs.map(job => <JobCard key={job._id} job={job} />)}
            </div>
          )}

          <Pagination
            currentPage={jobPage}
            totalPages={Math.ceil(filteredJobs.length / ITEMS_PER_PAGE)}
            setCurrentPage={setJobPage}
          />
        </div>
      )}

      {/* ── Campus Drives Tab ── */}
      {activeTab === "drives" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border
          border-gray-100 dark:border-gray-700 shadow-sm p-4 space-y-3">
            <input
              type="text"
              value={driveSearch}
              onChange={(e) => { setDriveSearch(e.target.value); setDrivePage(1); }}
              placeholder="🔍 Search by company, role, location..."
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl
              px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100
              focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
            />
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "upcoming", "completed", "cancelled"].map(s => (
                <button
                  key={s}
                  onClick={() => { setDriveStatus(s); setDrivePage(1); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition capitalize
                  ${driveStatus === s
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
                  }`}
                >
                  {s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
              <span className="ml-auto text-xs text-gray-400">
                {filteredDrives.length} drive{filteredDrives.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {loadingDrives ? (
            <p className="text-center py-20 text-gray-400 text-sm">Loading campus drives...</p>
          ) : paginatedDrives.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-gray-400">
              <FiAward size={40} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">No campus drives found</p>
              <p className="text-xs mt-1">Try changing filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
              {paginatedDrives.map(drive => <DriveCard key={drive._id} drive={drive} />)}
            </div>
          )}

          <Pagination
            currentPage={drivePage}
            totalPages={Math.ceil(filteredDrives.length / ITEMS_PER_PAGE)}
            setCurrentPage={setDrivePage}
          />
        </div>
      )}
    </div>
  );
}