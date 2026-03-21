// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiPlus, FiBell } from "react-icons/fi";

// import API from "../../../services/api";
// import NoticeList          from "../notices/NoticeList";
// import NoticeFormModal     from "./Noticeformmodel";
// import DeleteConfirmModal  from "./DeleteConfirmModal";

//  function AdminNotices() {
//   const [notices, setNotices]         = useState([]);
//   const [fetching, setFetching]       = useState(true);


//   const [showForm, setShowForm]       = useState(false);
//   const [editData, setEditData]       = useState(null);   // null = add mode
//   const [deleteId, setDeleteId]       = useState(null);   // null = closed

//   // Loading states
//   const [formLoading, setFormLoading]     = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // Filter + Search
//   const [filter, setFilter]   = useState("All");
//   const [search, setSearch]   = useState("");

//   // ── Fetch all notices ───────────────────────────────────
//   const fetchNotices = async () => {
//     try {
//       const res = await API.get("/api/notice");
//       setNotices(res.data.notices || []);
//     } catch (err) {
//       toast.error("Notices load nahi hue");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => { fetchNotices(); }, []);

//   // ── Open Add Modal ──────────────────────────────────────
//   const handleOpenAdd = () => {
//     setEditData(null);
//     setShowForm(true);
//   };

//   // ── Open Edit Modal ─────────────────────────────────────
//   const handleEdit = (notice) => {
//     setEditData(notice);
//     setShowForm(true);
//   };

//   // ── Submit (Add or Edit) ────────────────────────────────
//   const handleFormSubmit = async (form) => {
//     if (!form.title || !form.description) {
//       toast.error("Title aur Description required hain!");
//       return;
//     }

//     setFormLoading(true);
//     try {
//       if (editData) {

//         await API.put(`/api/notice/${editData._id}`, form);
//         toast.success("Notice update done! ✅");
//       } else {
        
//         await API.post("/api/notice", form);
//         toast.success("Notice posted ! 🎉");
//       }
//       setShowForm(false);
//       fetchNotices();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Kuch gadbad ho gayi");
//     } finally {
//       setFormLoading(false);
//     }
//   };


//   const handleDeleteConfirm = async () => {
//     setDeleteLoading(true);
//     try {
//       await API.delete(`/api/notice/${deleteId}`);
//       toast.success("Notice deleted succesfully ! 🗑️");
//       setDeleteId(null);
//       fetchNotices();
//     } catch (err) {
//       toast.error(" Not deleted , try again");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   // ── Stats counts ────────────────────────────────────────
//   const counts = {
//     total:    notices.length,
//     deadline: notices.filter((n) => n.noticeType === "Deadline").length,
//     drive:    notices.filter((n) => n.noticeType === "Campus Drive").length,
//   };

//   return (
//     <div className="space-y-6">

//       {/* ── Page Header ── */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800  dark:text-gray-200 flex items-center gap-2">
//             <FiBell className="text-violet-500" />
//             Manage Notices
//           </h1>
//         </div>

//         {/* Post Notice Button */}
//         <button
//           onClick={handleOpenAdd}
//           className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700
//           text-white text-sm font-semibold rounded-xl shadow-md transition"
//         >
//           <FiPlus size={16} />
//           Post Notice
//         </button>
//       </div>

//       {/* ── Stats Row ── */}
//       <div className="grid grid-cols-3 gap-4">
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//           <p className="text-2xl font-bold text-violet-600">{counts.total}</p>
//           <p className="text-xs text-gray-400 mt-1">Total Notices</p>
//         </div>
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//           <p className="text-2xl font-bold text-red-500">{counts.deadline}</p>
//           <p className="text-xs text-gray-400 mt-1">Deadlines</p>
//         </div>
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
//           <p className="text-2xl font-bold text-green-500">{counts.drive}</p>
//           <p className="text-xs text-gray-400 mt-1">Campus Drives</p>
//         </div>
//       </div>

//       {/* ── Notice List ── */}
//       {fetching ? (
//         <div className="text-center py-20 text-gray-400 text-sm">Loading notices...</div>
//       ) : (
//         <NoticeList
//           notices={notices}
//           onEdit={handleEdit}
//           onDelete={(id) => setDeleteId(id)}
//           filter={filter}
//           onFilterChange={setFilter}
//           search={search}
//           onSearchChange={setSearch}
//         />
//       )}

//       {/* ── Add / Edit Modal ── */}
//       <NoticeFormModal
//         isOpen={showForm}
//         onClose={() => setShowForm(false)}
//         onSubmit={handleFormSubmit}
//         editData={editData}
//         loading={formLoading}
//       />

//       {/* ── Delete Confirm Modal ── */}
//       <DeleteConfirmModal
//         isOpen={!!deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={handleDeleteConfirm}
//         loading={deleteLoading}
//       />

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default AdminNotices;

// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiPlus, FiBell } from "react-icons/fi";

// import API from "../../../services/api";
// import NoticeList          from "../notices/NoticeList";
// import NoticeFormModal     from "./Noticeformmodel";
// import DeleteConfirmModal  from "./DeleteConfirmModal";

// function AdminNotices() {
//   const [notices, setNotices]         = useState([]);
//   const [fetching, setFetching]       = useState(true);
//   const [showForm, setShowForm]       = useState(false);
//   const [editData, setEditData]       = useState(null);
//   const [deleteId, setDeleteId]       = useState(null);
//   const [formLoading, setFormLoading]     = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [filter, setFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   const fetchNotices = async () => {
//     try {
//       const res = await API.get("/api/notice");
//       setNotices(res.data.notices || []);
//     } catch {
//       toast.error("Notices load nahi hue");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => { fetchNotices(); }, []);

//   const handleOpenAdd = () => { setEditData(null); setShowForm(true); };
//   const handleEdit    = (notice) => { setEditData(notice); setShowForm(true); };

//   // ── Submit — FormData support for image upload ─────────
//   const handleFormSubmit = async (formData) => {
//     if (!formData.get("title") || !formData.get("description")) {
//       toast.error("Title aur Description required hain!");
//       return;
//     }
//     setFormLoading(true);
//     try {
//       const config = {
//         headers: { "Content-Type": "multipart/form-data" }
//       };
//       if (editData) {
//         await API.put(`/api/notice/${editData._id}`, formData, config);
//         toast.success("Notice updated! ✅");
//       } else {
//         await API.post("/api/notice", formData, config);
//         toast.success("Notice posted! 🎉");
//       }
//       setShowForm(false);
//       fetchNotices();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Kuch gadbad ho gayi");
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     setDeleteLoading(true);
//     try {
//       await API.delete(`/api/notice/${deleteId}`);
//       toast.success("Notice deleted! 🗑️");
//       setDeleteId(null);
//       fetchNotices();
//     } catch {
//       toast.error("Delete failed, try again");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const counts = {
//     total:    notices.length,
//     deadline: notices.filter(n => n.noticeType === "Deadline").length,
//     drive:    notices.filter(n => n.noticeType === "Campus Drive").length,
//     event:    notices.filter(n => n.noticeType === "Event").length,
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
//           <FiBell className="text-violet-500" />
//           Manage Notices
//         </h1>
//         <button onClick={handleOpenAdd}
//           className="flex items-center gap-2 px-4 py-2.5 bg-violet-600
//           hover:bg-violet-700 text-white text-sm font-semibold rounded-xl shadow-md transition">
//           <FiPlus size={16} /> Post Notice
//         </button>
//       </div>

//       <div className="grid grid-cols-4 gap-4">
//         {[
//           { label: "Total Notices", value: counts.total,    color: "text-violet-600" },
//           { label: "Deadlines",     value: counts.deadline, color: "text-red-500"    },
//           { label: "Campus Drives", value: counts.drive,    color: "text-green-500"  },
//           { label: "Events",        value: counts.event,    color: "text-pink-500"   },
//         ].map(s => (
//           <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border
//           border-gray-100 dark:border-gray-700 shadow-sm p-4 text-center">
//             <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//             <p className="text-xs text-gray-400 mt-1">{s.label}</p>
//           </div>
//         ))}
//       </div>

//       {fetching ? (
//         <div className="text-center py-20 text-gray-400 text-sm">Loading notices...</div>
//       ) : (
//         <NoticeList
//           notices={notices}
//           onEdit={handleEdit}
//           onDelete={(id) => setDeleteId(id)}
//           filter={filter}
//           onFilterChange={setFilter}
//           search={search}
//           onSearchChange={setSearch}
//         />
//       )}

//       <NoticeFormModal
//         isOpen={showForm}
//         onClose={() => setShowForm(false)}
//         onSubmit={handleFormSubmit}
//         editData={editData}
//         loading={formLoading}
//       />
//       <DeleteConfirmModal
//         isOpen={!!deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={handleDeleteConfirm}
//         loading={deleteLoading}
//       />
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default AdminNotices;

import { useState, useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiPlus, FiBell, FiCalendar } from "react-icons/fi";

import API from "../../../services/api";
import NoticeList         from "../notices/NoticeList";
import NoticeFormModal    from "./Noticeformmodel";
import DeleteConfirmModal from "./DeleteConfirmModal";

function AdminNotices() {
  const [notices, setNotices]             = useState([]);
  const [fetching, setFetching]           = useState(true);
  const [activeTab, setActiveTab]         = useState("notices"); // "notices" | "events"
  const [showForm, setShowForm]           = useState(false);
  const [editData, setEditData]           = useState(null);
  const [deleteId, setDeleteId]           = useState(null);
  const [formLoading, setFormLoading]     = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filter, setFilter]               = useState("All");
  const [search, setSearch]               = useState("");

  // ── Fetch ──────────────────────────────────────────────
  const fetchNotices = async () => {
    try {
      const res = await API.get("/api/notice");
      setNotices(res.data.notices || []);
    } catch {
      toast.error("Failed to load notices. Please try again.");

    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  // ── Tab switch → reset filter ──────────────────────────
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setFilter("All");
    setSearch("");
  };

  // ── Split notices by tab ───────────────────────────────
  const noticesList = useMemo(
    () => notices.filter(n => n.noticeType !== "Event"),
    [notices]
  );
  const eventsList = useMemo(
    () => notices.filter(n => n.noticeType === "Event"),
    [notices]
  );

  const currentList = activeTab === "notices" ? noticesList : eventsList;

  // ── Open Add Modal ─────────────────────────────────────
  const handleOpenAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (notice) => {
    setEditData(notice);
    setShowForm(true);
  };

  // ── Submit ─────────────────────────────────────────────
  const handleFormSubmit = async (formData) => {
    if (!formData.get("title") || !formData.get("description")) {
      toast.error("Title aur Description rare required.");
      return;
    }

    // Auto-set noticeType if Events tab
    if (activeTab === "events" && !formData.get("noticeType")) {
      formData.set("noticeType", "Event");
    }

    setFormLoading(true);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (editData) {
        await API.put(`/api/notice/${editData._id}`, formData, config);
        toast.success(activeTab === "events" ? "Event updated! ✅" : "Notice updated! ✅");
      } else {
        await API.post("/api/notice", formData, config);
        toast.success(activeTab === "events" ? "Event posted! 🎉" : "Notice posted! 🎉");
      }
      setShowForm(false);
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await API.delete(`/api/notice/${deleteId}`);
      toast.success("Deleted! 🗑️");
      setDeleteId(null);
      fetchNotices();
    } catch {
      toast.error("Failed to delete, try again");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Stats ──────────────────────────────────────────────
  const noticeStats = {
    total:    noticesList.length,
    deadline: noticesList.filter(n => n.noticeType === "Deadline").length,
    drive:    noticesList.filter(n => n.noticeType === "Campus Drive").length,
  };

  const eventStats = {
    total:    eventsList.length,
    upcoming: eventsList.filter(n => n.eventDate && new Date(n.eventDate) >= new Date()).length,
    past:     eventsList.filter(n => n.eventDate && new Date(n.eventDate) < new Date()).length,
  };

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200
        flex items-center gap-2">
          {activeTab === "notices"
            ? <><FiBell className="text-violet-500" /> Manage Notices</>
            : <><FiCalendar className="text-pink-500" /> Manage Events</>
          }
        </h1>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600
          hover:bg-violet-700 text-white text-sm font-semibold rounded-xl
          shadow-md transition"
        >
          <FiPlus size={16} />
          {activeTab === "notices" ? "Post Notice" : "Post Event 🎉"}
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl w-fit">
        <button
          onClick={() => handleTabSwitch("notices")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm
          font-semibold transition
          ${activeTab === "notices"
            ? "bg-white dark:bg-gray-800 text-violet-600 shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
          }`}
        >
          <FiBell size={14} />
          Notices
          <span className={`text-xs px-1.5 py-0.5 rounded-full
          ${activeTab === "notices"
            ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600"
            : "bg-gray-200 dark:bg-gray-600 text-gray-500"
          }`}>
            {noticesList.length}
          </span>
        </button>

        <button
          onClick={() => handleTabSwitch("events")}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm
          font-semibold transition
          ${activeTab === "events"
            ? "bg-white dark:bg-gray-800 text-pink-500 shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700"
          }`}
        >
          <FiCalendar size={14} />
          Events
          <span className={`text-xs px-1.5 py-0.5 rounded-full
          ${activeTab === "events"
            ? "bg-pink-100 dark:bg-pink-900/30 text-pink-500"
            : "bg-gray-200 dark:bg-gray-600 text-gray-500"
          }`}>
            {eventsList.length}
          </span>
        </button>
      </div>

      {/* ── Stats ── */}
      {activeTab === "notices" ? (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Notices", value: noticeStats.total,    color: "text-violet-600" },
            { label: "Deadlines",     value: noticeStats.deadline, color: "text-red-500"    },
            { label: "Campus Drives", value: noticeStats.drive,    color: "text-green-500"  },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl
            border border-gray-100 dark:border-gray-700 shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Events",    value: eventStats.total,    color: "text-pink-500"   },
            { label: "Upcoming Events", value: eventStats.upcoming, color: "text-violet-600" },
            { label: "Past Events",     value: eventStats.past,     color: "text-gray-400"   },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl
            border border-gray-100 dark:border-gray-700 shadow-sm p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── List ── */}
      {fetching ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          Loading...
        </div>
      ) : (
        <NoticeList
          notices={currentList}
          onEdit={handleEdit}
          onDelete={(id) => setDeleteId(id)}
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
          mode={activeTab}
        />
      )}

      {/* ── Modals ── */}
      <NoticeFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        editData={editData}
        loading={formLoading}
        defaultType={activeTab === "events" ? "Event" : "General"}
        // mode={activeTab}
      />
      <DeleteConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}

export default AdminNotices;