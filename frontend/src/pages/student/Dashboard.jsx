import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import {
  FiUser, FiCalendar, FiBriefcase, FiBell,
  FiArrowRight, FiCheckCircle, FiClock,
  FiAlertCircle, FiAward, FiTrendingUp
} from "react-icons/fi";

// ── Profile Completion Calculator ────────────────────────
function calcProfileCompletion(user, profile) {
  const fields = [
    user?.name,
    user?.email,
    user?.department,
    user?.graduationYear,
    user?.photo,
    profile?.enrollmentNumber,
    profile?.cgpa,
    profile?.skills?.length > 0,
    profile?.linkedIn,
    profile?.bio,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

// ── Stat Card ─────────────────────────────────────────────
function StatCard({ icon, label, value, color, sub, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-5
      flex items-center gap-4 transition-all duration-200
      ${onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5" : ""}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center
      justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value ?? "—"}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
        {sub && (
          <p className="text-xs text-violet-500 dark:text-violet-400 mt-0.5 font-medium">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Profile Completion Bar ────────────────────────────────
function ProfileCompletion({ percent, navigate }) {
  const color =
    percent >= 80 ? "bg-green-500" :
    percent >= 50 ? "bg-violet-500" :
                    "bg-orange-400";

  const message =
    percent === 100 ? "Profile is complete! 🎉" :
    percent >= 80   ? "Almost there! Fill remaining fields." :
    percent >= 50   ? "Good progress! Keep updating." :
                      "Complete your profile to get noticed.";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border
    border-gray-100 dark:border-gray-700 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiUser size={16} className="text-violet-500" />
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200">
            Profile Completion
          </h2>
        </div>
        <span className={`text-lg font-bold
        ${percent >= 80 ? "text-green-500" :
          percent >= 50 ? "text-violet-500" : "text-orange-400"}`}>
          {percent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-400 dark:text-gray-500">{message}</p>
        {percent < 100 && (
          <button
            onClick={() => navigate("/student/profile")}
            className="text-xs text-violet-500 hover:text-violet-700
            font-semibold flex items-center gap-1 transition"
          >
            Complete <FiArrowRight size={11} />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Quick Nav Card ────────────────────────────────────────
function QuickNavCard({ icon, label, desc, color, path, navigate }) {
  return (
    <button
      onClick={() => navigate(path)}
      className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-4
      flex items-center gap-3 w-full text-left
      hover:shadow-md hover:border-violet-200 dark:hover:border-violet-700
      transition-all duration-200 group"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center
      justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{desc}</p>
      </div>
      <FiArrowRight size={14}
        className="text-gray-300 dark:text-gray-600
        group-hover:text-violet-500 group-hover:translate-x-1
        transition-all duration-200 flex-shrink-0" />
    </button>
  );
}

// ── Notice type color ─────────────────────────────────────
const noticeTypeColor = (type) => {
  const map = {
    General:      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    "Campus Drive":"bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    Deadline:     "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    Update:       "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    Event:        "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  };
  return map[type] || map["General"];
};

// ════════════════════════════════════════════════════════
export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user,     setUser]     = useState(null);
  const [profile,  setProfile]  = useState(null);
  const [notices,  setNotices]  = useState([]);
  const [drives,   setDrives]   = useState([]);
  const [jobs,     setJobs]     = useState([]);
  const [events,   setEvents]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [uRes, nRes, dRes, jRes] = await Promise.allSettled([
          API.get("/api/student/full-profile"),
          API.get("/api/notice"),
          API.get("/api/campus-drives"),
          API.get("/api/jobs"),
        ]);

        if (uRes.status === "fulfilled") {
          setUser(uRes.value.data.user);
          setProfile(uRes.value.data.profile || null);
        }
        if (nRes.status === "fulfilled") {
          const all = nRes.value.data.notices || nRes.value.data || [];
          setNotices(all.filter(n => n.noticeType !== "Event"));
          setEvents(all.filter(n => n.noticeType === "Event"));
        }
        if (dRes.status === "fulfilled")
          setDrives(dRes.value.data.drives || dRes.value.data || []);
        if (jRes.status === "fulfilled")
          setJobs(jRes.value.data.jobs || jRes.value.data || []);

      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── Derived data ──────────────────────────────────────
  const now              = new Date();
  const profilePercent   = calcProfileCompletion(user, profile);

  const upcomingDrives   = drives.filter(
    d => new Date(d.driveDate || d.date) >= now
  );
  const activeEvents     = events.filter(
    e => !e.deadline || new Date(e.deadline) >= now
  );
  const recentNotices    = [...notices]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  const recentDrives     = [...upcomingDrives]
    .sort((a, b) => new Date(a.driveDate || a.date) - new Date(b.driveDate || b.date))
    .slice(0, 3);

  // ── Loading ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-violet-200
          border-t-violet-600 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Welcome Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            👋 Welcome back, {user?.name?.split(" ")[0] || "Student"}!
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
            {user?.department} · Batch {user?.graduationYear}
          </p>
        </div>

        {/* Placement Status pill */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl
        text-sm font-semibold border
        ${profile?.placementStatus === "Placed"
          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
          : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600"
        }`}>
          {profile?.placementStatus === "Placed"
            ? <><FiCheckCircle size={14} /> Placed</>
            : <><FiClock size={14} /> Seeking Placement</>
          }
        </div>
      </div>

      {/* ── Profile Completion ── */}
      <ProfileCompletion percent={profilePercent} navigate={navigate} />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FiBriefcase size={18} className="text-blue-600" />}
          label="Total Jobs"
          value={jobs.length}
          color="bg-blue-50 dark:bg-blue-900/20"
          onClick={() => navigate("/student/jobs")}
        />
        <StatCard
          icon={<FiAward size={18} className="text-violet-600" />}
          label="Campus Drives"
          value={drives.length}
          sub={`${upcomingDrives.length} upcoming`}
          color="bg-violet-50 dark:bg-violet-900/20"
          onClick={() => navigate("/student/jobs")}
        />
        <StatCard
          icon={<FiCalendar size={18} className="text-pink-500" />}
          label="Active Events"
          value={activeEvents.length}
          color="bg-pink-50 dark:bg-pink-900/20"
          onClick={() => navigate("/student/events")}
        />
        <StatCard
          icon={<FiBell size={18} className="text-orange-500" />}
          label="Notices"
          value={notices.length}
          color="bg-orange-50 dark:bg-orange-900/20"
          onClick={() => navigate("/student/notice")}
        />
      </div>

      {/* ── Recent Notices + Upcoming Drives ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Notices */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiBell size={14} className="text-orange-500" />
              Recent Notices
            </h2>
            <button onClick={() => navigate("/student/notice")}
              className="text-xs text-violet-500 hover:text-violet-700
              font-medium flex items-center gap-1 transition">
              View All <FiArrowRight size={11} />
            </button>
          </div>

          {recentNotices.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-gray-400
            dark:text-gray-500">
              <FiAlertCircle size={28} className="opacity-40 mb-2" />
              <p className="text-sm">No notices yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentNotices.map((n) => (
                <div key={n._id} className="flex items-start gap-3 p-3
                rounded-xl bg-gray-50 dark:bg-gray-700/50
                hover:bg-violet-50 dark:hover:bg-violet-900/10 transition">
                  <span className={`text-xs font-semibold px-2 py-0.5
                  rounded-md flex-shrink-0 mt-0.5
                  ${noticeTypeColor(n.noticeType)}`}>
                    {n.noticeType || "General"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800
                    dark:text-gray-100 truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {n.createdAt
                        ? new Date(n.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        }) : "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Drives */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <FiAward size={14} className="text-violet-500" />
              Upcoming Campus Drives
            </h2>
            <button onClick={() => navigate("/student/jobs")}
              className="text-xs text-violet-500 hover:text-violet-700
              font-medium flex items-center gap-1 transition">
              View All <FiArrowRight size={11} />
            </button>
          </div>

          {recentDrives.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-gray-400
            dark:text-gray-500">
              <FiAlertCircle size={28} className="opacity-40 mb-2" />
              <p className="text-sm">No upcoming drives</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentDrives.map((d) => (
                <div key={d._id} className="flex items-center gap-3 p-3
                rounded-xl bg-gray-50 dark:bg-gray-700/50
                hover:bg-violet-50 dark:hover:bg-violet-900/10 transition">
                  <div className="w-10 h-10 rounded-xl bg-violet-100
                  dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                    <FiBriefcase size={15} className="text-violet-600
                    dark:text-violet-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800
                    dark:text-gray-100 truncate">
                      {d.companyName || d.title || "Drive"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {(d.driveDate || d.date)
                        ? new Date(d.driveDate || d.date).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        }) : "Date TBA"}
                    </p>
                  </div>
                  <span className="text-xs bg-violet-100 dark:bg-violet-900/30
                  text-violet-600 dark:text-violet-400 px-2 py-1 rounded-lg
                  font-semibold flex-shrink-0">
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Active Events ── */}
      {activeEvents.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200
            flex items-center gap-2">
              <FiCalendar size={14} className="text-pink-500" />
              Active Events
            </h2>
            <button onClick={() => navigate("/student/events")}
              className="text-xs text-violet-500 hover:text-violet-700
              font-medium flex items-center gap-1 transition">
              View All <FiArrowRight size={11} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {activeEvents.slice(0, 3).map((e) => (
              <div key={e._id}
                onClick={() => navigate("/student/events")}
                className="p-3 rounded-xl bg-gradient-to-br from-pink-50
                to-violet-50 dark:from-pink-900/10 dark:to-violet-900/10
                border border-pink-100 dark:border-pink-800/20
                cursor-pointer hover:shadow-sm transition">
                <p className="text-sm font-semibold text-gray-800
                dark:text-gray-100 line-clamp-1">
                  {e.title}
                </p>
                {e.deadline && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1
                  flex items-center gap-1">
                    <FiClock size={10} />
                    {new Date(e.deadline).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short"
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Quick Navigation ── */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400
        uppercase tracking-widest mb-3">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          <QuickNavCard
            icon={<FiBriefcase size={16} className="text-blue-600" />}
            label="Browse Jobs"
            desc={`${jobs.length} jobs available`}
            color="bg-blue-50 dark:bg-blue-900/20"
            path="/student/jobs"
            navigate={navigate}
          />
          <QuickNavCard
            icon={<FiCalendar size={16} className="text-pink-500" />}
            label="College Events"
            desc={`${activeEvents.length} active events`}
            color="bg-pink-50 dark:bg-pink-900/20"
            path="/student/events"
            navigate={navigate}
          />
          <QuickNavCard
            icon={<FiBell size={16} className="text-orange-500" />}
            label="Notices"
            desc={`${notices.length} notices`}
            color="bg-orange-50 dark:bg-orange-900/20"
            path="/student/notice"
            navigate={navigate}
          />
          <QuickNavCard
            icon={<FiUser size={16} className="text-violet-600" />}
            label="My Profile"
            desc={`${profilePercent}% complete`}
            color="bg-violet-50 dark:bg-violet-900/20"
            path="/student/profile"
            navigate={navigate}
          />
        </div>
      </div>

    </div>
  );
}