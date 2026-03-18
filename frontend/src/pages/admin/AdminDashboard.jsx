import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  FiUsers, FiCheckCircle, FiClock, FiAward,
  FiBriefcase, FiCalendar, FiBell, FiUserCheck,
  FiTrendingUp, FiAlertCircle, FiArrowRight,
} from "react-icons/fi";

import {
  FaUser, FaUsers, FaClipboardList, FaCalendarAlt
} from "react-icons/fa";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

// ── Stat Card ────────────────────────────────────────────
function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border
    border-gray-100 dark:border-gray-700 shadow-sm p-5 flex items-center gap-4
    transition-colors duration-300 hover:shadow-md">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value ?? "—"}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-violet-500 dark:text-violet-400 mt-0.5 font-medium">{sub}</p>}
      </div>
    </div>
  );
}

// ── Section Title ────────────────────────────────────────
function SectionTitle({ title }) {
  return (
    <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 mb-4">
      {title}
    </h2>
  );
}

// ── Colors ───────────────────────────────────────────────
const DEPT_COLORS = [
  "#7c3aed", "#6d28d9", "#4f46e5", "#0ea5e9",
  "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6"
];
const PLACEMENT_COLORS = ["#7c3aed", "#e5e7eb"];

// ════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Raw data
  const [students, setStudents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [drives, setDrives] = useState([]);
  const [notices, setNotices] = useState([]);

  // ── Fetch all data ─────────────────────────────────────
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [sRes, aRes, dRes, nRes] = await Promise.allSettled([
          API.get("/api/admin/students"),
          API.get("/api/admin/pending-alumni"),
          API.get("/api/campus-drives"),
          API.get("/api/notice"),
        ]);

        if (sRes.status === "fulfilled")
          setStudents(sRes.value.data.profiles || []);
        if (aRes.status === "fulfilled")
          setAlumni(aRes.value.data.alumni || aRes.value.data || []);
        if (dRes.status === "fulfilled")
          setDrives(dRes.value.data.drives || dRes.value.data || []);
        if (nRes.status === "fulfilled")
          setNotices(nRes.value.data.notices || nRes.value.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── Student Stats ──────────────────────────────────────
  const totalStudents = students.length;
  const placed = students.filter((s) => s.placementStatus === "Placed").length;
  const active = totalStudents - placed;
  const placementPercent = totalStudents > 0
    ? ((placed / totalStudents) * 100).toFixed(1)
    : 0;
  const cgpas = students.map((s) => s.cgpa).filter(Boolean);
  const avgCgpa = cgpas.length
    ? (cgpas.reduce((a, b) => a + b, 0) / cgpas.length).toFixed(2)
    : "N/A";

  // ── Campus Drive Stats ─────────────────────────────────
  const today = new Date();
  const upcomingDrives = drives.filter(
    (d) => new Date(d.driveDate || d.date) >= today
  ).length;
  const pastDrives = drives.length - upcomingDrives;

  // ── Department-wise students chart data ───────────────
  const deptMap = {};
  students.forEach((s) => {
    const dept = s.userId?.department;
    if (!dept) return;
    // Shorten dept name for chart
    const short = dept.replace(/\(.*?\)/g, "").trim().split(" ").slice(-2).join(" ");
    deptMap[short] = (deptMap[short] || 0) + 1;
  });
  const deptChartData = Object.entries(deptMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // ── Placement Pie Chart data ───────────────────────────
  const placementPieData = [
    { name: "Placed", value: placed },
    { name: "Active", value: active },
  ];

  // ── Recent Notices (last 4) ────────────────────────────
  const recentNotices = [...notices]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  // ── Upcoming Drives (next 4) ───────────────────────────
  const upcomingDrivesList = [...drives]
    .filter((d) => new Date(d.driveDate || d.date) >= today)
    .sort((a, b) => new Date(a.driveDate || a.date) - new Date(b.driveDate || b.date))
    .slice(0, 4);

  // ── Notice type color ──────────────────────────────────
  const noticeColor = (type) => {
    const map = {
      General: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      Urgent: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
      Event: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      Placement: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
    };
    return map[type] || map["General"];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600
          rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          Overview of all placement and campus activity
        </p>
      </div>

      {/* ── Stat Cards Row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FiUsers size={20} className="text-blue-600" />}
          label="Total Students"
          value={totalStudents}
          color="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          icon={<FiUserCheck size={20} className="text-violet-600" />}
          label="Total Alumni"
          value={alumni.length}
          color="bg-violet-50 dark:bg-violet-900/20"
        />
        <StatCard
          icon={<FiCalendar size={20} className="text-green-600" />}
          label="Campus Drives"
          value={drives.length}
          sub={`${upcomingDrives} upcoming`}
          color="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard
          icon={<FiBell size={20} className="text-orange-500" />}
          label="Total Notices"
          value={notices.length}
          color="bg-orange-50 dark:bg-orange-900/20"
        />
      </div>

      {/* ── Placement Stats Row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={<FiCheckCircle size={20} className="text-green-600" />}
          label="Placed Students"
          value={placed}
          color="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard
          icon={<FiClock size={20} className="text-yellow-500" />}
          label="Seeking Placement"
          value={active}
          color="bg-yellow-50 dark:bg-yellow-900/20"
        />
        <StatCard
          icon={<FiTrendingUp size={20} className="text-violet-600" />}
          label="Placement %"
          value={`${placementPercent}%`}
          color="bg-violet-50 dark:bg-violet-900/20"
        />
        <StatCard
          icon={<FiAward size={20} className="text-blue-600" />}
          label="Avg. CGPA"
          value={avgCgpa}
          color="bg-blue-50 dark:bg-blue-900/20"
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Placement Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors duration-300">
          <SectionTitle title="Placement Overview" />

          {totalStudents === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400
            dark:text-gray-500 text-sm">
              No student data available
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={placementPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {placementPieData.map((_, i) => (
                      <Cell key={i} fill={PLACEMENT_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--tooltip-bg, #fff)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px",
                      fontSize: "12px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="space-y-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Placed
                  </span>
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-100 ml-1">
                    {placed}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Active
                  </span>
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-100 ml-1">
                    {active}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Placement Rate
                  </p>
                  <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
                    {placementPercent}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Department-wise Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors duration-300">
          <SectionTitle title="Students by Department" />

          {deptChartData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400
            dark:text-gray-500 text-sm">
              No department data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={deptChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "12px"
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {deptChartData.map((_, i) => (
                    <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Bottom Row: Recent Notices + Upcoming Drives ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Notices */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors duration-300">
          <SectionTitle title="Recent Notices" />

          {recentNotices.length === 0 ? (
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm py-8 justify-center">
              <FiAlertCircle size={16} />
              No notices yet
            </div>
          ) : (
            <div className="space-y-3">
              {recentNotices.map((n) => (
                <div key={n._id}
                  className="flex items-start gap-3 p-3 rounded-xl
                  bg-gray-50 dark:bg-gray-700/50 hover:bg-violet-50
                  dark:hover:bg-violet-900/10 transition">
                  <div className={`px-2 py-0.5 rounded-md text-xs font-semibold
                  flex-shrink-0 mt-0.5 ${noticeColor(n.type)}`}>
                    {n.type || "General"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {n.createdAt
                        ? new Date(n.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })
                        : "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Campus Drives */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border
        border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors duration-300">
          <SectionTitle title="Upcoming Campus Drives" />

          {upcomingDrivesList.length === 0 ? (
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm py-8 justify-center">
              <FiAlertCircle size={16} />
              No upcoming drives
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingDrivesList.map((d) => (
                <div key={d._id}
                  className="flex items-center gap-3 p-3 rounded-xl
                  bg-gray-50 dark:bg-gray-700/50 hover:bg-green-50
                  dark:hover:bg-green-900/10 transition">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30
                  flex items-center justify-center flex-shrink-0">
                    <FiBriefcase size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {d.companyName || d.title || "Drive"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {d.driveDate || d.date
                        ? new Date(d.driveDate || d.date).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })
                        : "Date TBA"}
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 dark:bg-green-900/30
                  text-green-600 dark:text-green-400 px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                    Upcoming
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Navigation ── */}
      <div>
        <h2 className="text-base font-bold text-gray-700 dark:text-gray-200 mb-4">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* Manage Students */}
          <button onClick={() => navigate("/admin/students")}
            className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-5
      flex items-center gap-4 w-full text-left
      hover:shadow-md hover:border-violet-200 dark:hover:border-violet-700
      transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20
      flex items-center justify-center flex-shrink-0">
              <FaUser className="text-blue-600" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Manage Students</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{totalStudents} students enrolled</p>
            </div>
            <FiArrowRight size={16} className="text-gray-300 group-hover:text-violet-500
      group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
          </button>

          {/* Manage Alumni */}
          <button onClick={() => navigate("/admin/alumni")}
            className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-5
      flex items-center gap-4 w-full text-left
      hover:shadow-md hover:border-violet-200 dark:hover:border-violet-700
      transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-900/20
      flex items-center justify-center flex-shrink-0">
              <FaUsers className="text-violet-600" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Manage Alumni</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{alumni.length} alumni registered</p>
            </div>
            <FiArrowRight size={16} className="text-gray-300 group-hover:text-violet-500
      group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
          </button>

          {/* Manage Notices */}
          <button onClick={() => navigate("/admin/notices")}
            className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-5
      flex items-center gap-4 w-full text-left
      hover:shadow-md hover:border-violet-200 dark:hover:border-violet-700
      transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20
      flex items-center justify-center flex-shrink-0">
              <FaClipboardList className="text-orange-500" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Manage Notices</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{notices.length} notices posted</p>
            </div>
            <FiArrowRight size={16} className="text-gray-300 group-hover:text-violet-500
      group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
          </button>

          {/* Campus Drives */}
          <button onClick={() => navigate("/admin/campus-drives")}
            className="bg-white dark:bg-gray-800 rounded-2xl border
      border-gray-100 dark:border-gray-700 shadow-sm p-5
      flex items-center gap-4 w-full text-left
      hover:shadow-md hover:border-violet-200 dark:hover:border-violet-700
      transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20
      flex items-center justify-center flex-shrink-0">
              <FaCalendarAlt className="text-green-600" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Campus Drives</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{upcomingDrives} upcoming drives</p>
            </div>
            <FiArrowRight size={16} className="text-gray-300 group-hover:text-violet-500
      group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
          </button>

        </div>
      </div>

    </div>
  );
}