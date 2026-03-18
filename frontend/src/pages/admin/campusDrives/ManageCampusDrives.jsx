import { useEffect, useState, useMemo } from "react";
import API from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiPlus, FiSearch, FiAward,
  FiChevronLeft, FiChevronRight
} from "react-icons/fi";

import DriveList       from "./DriveList";
import DriveFormModal from "./DriveFormModel";
import DeleteModal    from "./DeleteConfirmModel";

// ── Constants ─────────────────────────────────────────────
const ITEMS_PER_PAGE = 8;

// ── Main Page ─────────────────────────────────────────────
export default function ManageCampusDrives() {
  const [drives, setDrives]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage]   = useState(1);

  // Modal states
  const [showModal, setShowModal]         = useState(false);
  const [editData, setEditData]           = useState(null);
  const [deleteTarget, setDeleteTarget]   = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Fetch ──────────────────────────────────────────────
  const fetchDrives = async () => {
    try {
      const { data } = await API.get("/api/campus-drives");
      setDrives(data.drives || []);
    } catch {
      toast.error("Failed to fetch campus drives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDrives(); }, []);

  // ── Filter ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    return drives.filter(d => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        d.companyName?.toLowerCase().includes(q) ||
        d.location?.toLowerCase().includes(q) ||
        d.jobRoles?.some(r => r.toLowerCase().includes(q));
      const matchStatus = statusFilter === "All" || d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [drives, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ── Stats ──────────────────────────────────────────────
  const stats = {
    total:     drives.length,
    upcoming:  drives.filter(d => d.status === "upcoming").length,
    completed: drives.filter(d => d.status === "completed").length,
    cancelled: drives.filter(d => d.status === "cancelled").length,
    placed:    drives.reduce((sum, d) => sum + (d.studentsPlaced || 0), 0),
  };

  // ── Handlers ───────────────────────────────────────────
  const handleEdit   = (drive) => { setEditData(drive); setShowModal(true); };
  const handleDelete = (drive) => setDeleteTarget(drive);

  const handleModalClose = () => { setShowModal(false); setEditData(null); };

  const handleSaved = () => { handleModalClose(); fetchDrives(); };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await API.delete(`/api/campus-drives/${deleteTarget._id}`);
      toast.success("Campus Drive deleted!");
      setDeleteTarget(null);
      fetchDrives();
    } catch {
      toast.error("Failed to delete drive");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── Modals ── */}
      {showModal && (
        <DriveFormModal
          editData={editData}
          onClose={handleModalClose}
          onSaved={handleSaved}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          drive={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          loading={deleteLoading}
        />
      )}

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100
          flex items-center gap-2">
            <FiAward className="text-violet-500" />
            Campus Drives
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage all campus placement drives
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600
          hover:bg-violet-700 text-white text-sm font-semibold rounded-xl
          shadow-sm transition"
        >
          <FiPlus size={16} />
          Schedule Drive
        </button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total Drives",    value: stats.total,     color: "text-violet-600",  bg: "bg-violet-50 dark:bg-violet-900/20"   },
          { label: "Upcoming",        value: stats.upcoming,  color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-900/20"       },
          { label: "Completed",       value: stats.completed, color: "text-green-600",   bg: "bg-green-50 dark:bg-green-900/20"     },
          { label: "Cancelled",       value: stats.cancelled, color: "text-red-500",     bg: "bg-red-50 dark:bg-red-900/20"         },
          { label: "Students Placed", value: stats.placed,    color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
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
          placeholder="🔍 Search by company, role, location..."
          className="w-full border border-gray-200 dark:border-gray-600 rounded-xl
          px-4 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100
          focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {["All", "upcoming", "completed", "cancelled"].map(s => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition
              ${statusFilter === s
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              {s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} drive{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Drive List ── */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          Loading campus drives...
        </div>
      ) : paginated.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-gray-400">
          <FiAward size={40} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">No campus drives found</p>
          <p className="text-xs mt-1">Schedule a new drive to get started</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {paginated.map(drive => (
            <DriveList
              key={drive._id}
              drive={drive}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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