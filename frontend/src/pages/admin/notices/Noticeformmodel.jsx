// // import { useEffect, useState } from "react";
// // import { FiX } from "react-icons/fi";

// // const EMPTY_FORM = {
// //   title: "",
// //   noticeType: "General",
// //   description: "",
// //   deadline: "",
// //   link: "",
// // };

// //  function NoticeFormModal({ isOpen, onClose, onSubmit, editData, loading }) {
// //   const [form, setForm] = useState(EMPTY_FORM);

// //   // When editData changes, prefill form
// //   useEffect(() => {
// //     if (editData) {
// //       setForm({
// //         title:       editData.title || "",
// //         noticeType:  editData.noticeType || "General",
// //         description: editData.description || "",
// //         deadline:    editData.deadline ? editData.deadline.split("T")[0] : "",
// //         link:        editData.link || "",
// //       });
// //     } else {
// //       setForm(EMPTY_FORM);
// //     }
// //   }, [editData, isOpen]);

// //   if (!isOpen) return null;

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(form);
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
// //       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in">

// //         {/* Header */}
// //         <div className="flex items-center justify-between mb-5">
// //           <h2 className="text-xl font-bold text-gray-800">
// //             {editData ? "✏️ Edit Notice" : "📢 Post New Notice"}
// //           </h2>
// //           <button
// //             onClick={onClose}
// //             className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
// //           >
// //             <FiX size={18} />
// //           </button>
// //         </div>

// //         {/* Form */}
// //         <form onSubmit={handleSubmit} className="space-y-4">

// //           {/* Title */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-600 mb-1">
// //               Title <span className="text-red-500">*</span>
// //             </label>
// //             <input
// //               type="text"
// //               name="title"
// //               value={form.title}
// //               onChange={handleChange}
// //               placeholder="Enter notice title"
// //               required
// //               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
// //               focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition"
// //             />
// //           </div>

// //           {/* Type */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-600 mb-1">Type</label>
// //             <select
// //               name="noticeType"
// //               value={form.noticeType}
// //               onChange={handleChange}
// //               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
// //               focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition bg-white"
// //             >
// //               <option value="General">📌 General</option>
// //               <option value="Campus Drive">🏢 Campus Drive</option>
// //               <option value="Deadline">⏰ Deadline</option>
// //               <option value="Update">🔔 Update</option>
// //             </select>
// //           </div>

// //           {/* Description */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-600 mb-1">
// //               Description <span className="text-red-500">*</span>
// //             </label>
// //             <textarea
// //               name="description"
// //               value={form.description}
// //               onChange={handleChange}
// //               placeholder="Write notice details..."
// //               rows={4}
// //               required
// //               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
// //               focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition resize-none"
// //             />
// //           </div>

// //           {/* Deadline + Link — side by side */}
// //           <div className="grid grid-cols-2 gap-3">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-600 mb-1">Deadline</label>
// //               <input
// //                 type="date"
// //                 name="deadline"
// //                 value={form.deadline}
// //                 onChange={handleChange}
// //                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
// //                 focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition"
// //               />
// //             </div>
// //             <div>
// //               <label className="block text-sm font-medium text-gray-600 mb-1">External Link</label>
// //               <input
// //                 type="url"
// //                 name="link"
// //                 value={form.link}
// //                 onChange={handleChange}
// //                 placeholder="https://..."
// //                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
// //                 focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition"
// //               />
// //             </div>
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex gap-3 pt-1">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600
// //               hover:bg-gray-50 text-sm font-medium transition"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700
// //               text-white text-sm font-semibold transition shadow-md disabled:opacity-60"
// //             >
// //               {loading ? "Saving..." : editData ? "Update Notice" : "Post Notice"}
// //             </button>
// //           </div>

// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default NoticeFormModal;

// import { useEffect, useState } from "react";
// import { FiX, FiImage } from "react-icons/fi";

// const EMPTY_FORM = {
//   title: "",
//   noticeType: "General",
//   description: "",
//   deadline: "",
//   link: "",
//   // Event specific
//   eventDate: "",
//   venue: "",
// };

// function NoticeFormModal({ isOpen, onClose, onSubmit, editData, loading }) {
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [posterFile, setPosterFile] = useState(null);   // file object
//   const [posterPreview, setPosterPreview] = useState(null); // preview URL

//   // ── Prefill on edit ───────────────────────────────────
//   useEffect(() => {
//     if (editData) {
//       setForm({
//         title: editData.title || "",
//         noticeType: editData.noticeType || "General",
//         description: editData.description || "",
//         deadline: editData.deadline ? editData.deadline.split("T")[0] : "",
//         link: editData.link || "",
//         eventDate: editData.eventDate ? editData.eventDate.split("T")[0] : "",
//         venue: editData.venue || "",
//       });
//       // Show existing poster if any
//       setPosterPreview(editData.posterImage || null);
//     } else {
//       setForm(EMPTY_FORM);
//       setPosterFile(null);
//       setPosterPreview(null);
//     }
//   }, [editData, isOpen]);

//   if (!isOpen) return null;

//   const isEvent = form.noticeType === "Event";

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ── Poster file select ────────────────────────────────
//   const handlePosterChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setPosterFile(file);
//     setPosterPreview(URL.createObjectURL(file)); // local preview
//   };

//   // ── Submit — FormData (for file upload) ───────────────
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     // Append all text fields
//     Object.entries(form).forEach(([key, value]) => {
//       if (value) formData.append(key, value);
//     });

//     // Append poster only if new file selected
//     if (posterFile) {
//       formData.append("posterImage", posterFile);
//     }

//     onSubmit(formData); // ← FormData pass karo
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center
//     bg-black/40 backdrop-blur-sm px-4 overflow-y-auto py-6">

//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
//       w-full max-w-lg p-6 relative">

//         {/* ── Header ── */}
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             {editData ? "✏️ Edit Notice" : "📢 Post New Notice"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
//             text-gray-500 transition"
//           >
//             <FiX size={18} />
//           </button>
//         </div>

//         {/* ── Form ── */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600
//             dark:text-gray-400 mb-1">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               placeholder="Enter notice title"
//               required
//               className="w-full border border-gray-200 dark:border-gray-600
//               rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
//               dark:text-gray-100 focus:ring-2 focus:ring-violet-400
//               focus:outline-none transition"
//             />
//           </div>

//           {/* Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600
//             dark:text-gray-400 mb-1">Type</label>
//             <select
//               name="noticeType"
//               value={form.noticeType}
//               onChange={handleChange}
//               className="w-full border border-gray-200 dark:border-gray-600
//               rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
//               dark:text-gray-100 focus:ring-2 focus:ring-violet-400
//               focus:outline-none transition"
//             >
//               <option value="General">📌 General</option>
//               <option value="Campus Drive">🏢 Campus Drive</option>
//               <option value="Deadline">⏰ Deadline</option>
//               <option value="Update">🔔 Update</option>
//               <option value="Event">🎉 Event</option>
//             </select>
//           </div>

//           {/* ── Event specific fields (conditional) ── */}
//           {isEvent && (
//             <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100
//             dark:border-violet-800/30 rounded-xl p-4 space-y-3">
//               <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
//                 🎉 Event Details
//               </p>

//               {/* Event Date + Venue */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600
//                   dark:text-gray-400 mb-1">
//                     Event Date <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="eventDate"
//                     value={form.eventDate}
//                     onChange={handleChange}
//                     // required={isEvent}
//                     className="w-full border border-gray-200 dark:border-gray-600
//                     rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-700
//                     dark:text-gray-100 focus:ring-2 focus:ring-violet-400
//                     focus:outline-none transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-600
//                   dark:text-gray-400 mb-1">Venue</label>
//                   <input
//                     type="text"
//                     name="venue"
//                     value={form.venue}
//                     onChange={handleChange}
//                     placeholder="e.g. Seminar Hall 1"
//                     className="w-full border border-gray-200 dark:border-gray-600
//                     rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-700
//                     dark:text-gray-100 focus:ring-2 focus:ring-violet-400
//                     focus:outline-none transition"
//                   />
//                 </div>
//               </div>

//               {/* Poster Image Upload */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-600
//                 dark:text-gray-400 mb-1">
//                   Event Poster (optional)
//                 </label>

//                 {/* Preview */}
//                 {posterPreview && (
//                   <div className="relative mb-2">
//                     <img
//                       src={posterPreview}
//                       alt="poster preview"
//                       className="w-full h-36 object-cover rounded-xl border
//                       border-violet-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => { setPosterFile(null); setPosterPreview(null); }}
//                       className="absolute top-2 right-2 bg-red-500 text-white
//                       rounded-full p-1 hover:bg-red-600 transition"
//                     >
//                       <FiX size={12} />
//                     </button>
//                   </div>
//                 )}

//                 {/* Upload button */}
//                 {!posterPreview && (
//                   <label className="flex items-center justify-center gap-2
//                   w-full h-20 border-2 border-dashed border-violet-200
//                   dark:border-violet-700 rounded-xl cursor-pointer
//                   hover:bg-violet-50 dark:hover:bg-violet-900/10 transition">
//                     <FiImage className="text-violet-400" size={20} />
//                     <span className="text-xs text-violet-500 font-medium">
//                       Click to upload poster
//                     </span>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handlePosterChange}
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600
//             dark:text-gray-400 mb-1">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Write details..."
//               rows={4}
//               required
//               className="w-full border border-gray-200 dark:border-gray-600
//               rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
//               dark:text-gray-100 focus:ring-2 focus:ring-violet-400
//               focus:outline-none transition resize-none"
//             />
//           </div>

//           {/* Deadline + Link */}
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm font-medium text-gray-600
//               dark:text-gray-400 mb-1">
//                 {isEvent ? "Registration Deadline" : "Deadline"}
//               </label>
//               <input
//                 type="date"
//                 name="deadline"
//                 value={form.deadline}
//                 onChange={handleChange}
//                 className="w-full border border-gray-200 dark:border-gray-600
//                 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
//                 dark:text-gray-100 focus:ring-2 focus:ring-violet-400
//                 focus:outline-none transition"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600
//               dark:text-gray-400 mb-1">
//                 {isEvent ? "Registration Link" : "External Link"}
//               </label>
//               <input
//                 type="url"
//                 name="link"
//                 value={form.link}
//                 onChange={handleChange}
//                 placeholder="https://..."
//                 className="w-full border border-gray-200 dark:border-gray-600
//                 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
//                 dark:text-gray-100 focus:ring-2 focus:ring-violet-400
//                 focus:outline-none transition"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-1">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 py-2.5 rounded-xl border border-gray-200
//               dark:border-gray-600 text-gray-600 dark:text-gray-300
//               hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700
//               text-white text-sm font-semibold transition shadow-md disabled:opacity-60"
//             >
//               {/* {loading ? "Saving..." : editData ? "Update" : "Post Notice"} */}
//               {loading
//                 ? "Saving..."
//                 : editData
//                   ? `Update ${form.noticeType === "Event" ? "Event" : "Notice"}`
//                   : `Post ${form.noticeType === "Event" ? "Event 🎉" : "Notice"}`
//               }
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default NoticeFormModal;

import { useEffect, useState } from "react";
import { FiX, FiImage } from "react-icons/fi";

const EMPTY_FORM = {
  title:       "",
  noticeType:  "General",
  description: "",
  deadline:    "",
  link:        "",
  // Event specific
  eventDate:   "",
  venue:       "",
};

function NoticeFormModal({ isOpen, onClose, onSubmit, editData, loading, defaultType = "General" }) {
  const [form, setForm]             = useState(EMPTY_FORM);
  const [posterFile, setPosterFile] = useState(null);   // file object
  const [posterPreview, setPosterPreview] = useState(null); // preview URL

  // ── Prefill on edit ───────────────────────────────────
  useEffect(() => {
    if (editData) {
      setForm({
        title:       editData.title       || "",
        noticeType:  editData.noticeType  || defaultType,
        description: editData.description || "",
        deadline:    editData.deadline    ? editData.deadline.split("T")[0] : "",
        link:        editData.link        || "",
        eventDate:   editData.eventDate   ? editData.eventDate.split("T")[0] : "",
        venue:       editData.venue       || "",
      });
      // Show existing poster if any
      setPosterPreview(editData.posterImage || null);
    } else {
      setForm({ ...EMPTY_FORM, noticeType: defaultType });
      setPosterFile(null);
      setPosterPreview(null);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const isEvent = form.noticeType === "Event";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Poster file select ────────────────────────────────
  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file)); // local preview
  };

  // ── Submit — FormData (for file upload) ───────────────
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all text fields
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    // Append poster only if new file selected
    if (posterFile) {
      formData.append("posterImage", posterFile);
    }

    onSubmit(formData); // ← FormData pass karo
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
    bg-black/40 backdrop-blur-sm px-4 overflow-y-auto py-6">

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl
      w-full max-w-lg p-6 relative">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {editData ? "✏️ Edit Notice" : "📢 Post New Notice"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
            text-gray-500 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600
            dark:text-gray-400 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              required
              className="w-full border border-gray-200 dark:border-gray-600
              rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
              dark:text-gray-100 focus:ring-2 focus:ring-violet-400
              focus:outline-none transition"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600
            dark:text-gray-400 mb-1">Type</label>
            <select
              name="noticeType"
              value={form.noticeType}
              onChange={handleChange}
              className="w-full border border-gray-200 dark:border-gray-600
              rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
              dark:text-gray-100 focus:ring-2 focus:ring-violet-400
              focus:outline-none transition"
            >
              <option value="General">📌 General</option>
              <option value="Campus Drive">🏢 Campus Drive</option>
              <option value="Deadline">⏰ Deadline</option>
              <option value="Update">🔔 Update</option>
              <option value="Event">🎉 Event</option>
            </select>
          </div>

          {/* ── Event specific fields (conditional) ── */}
          {isEvent && (
            <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100
            dark:border-violet-800/30 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                🎉 Event Details
              </p>

              {/* Event Date + Venue */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600
                  dark:text-gray-400 mb-1">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={form.eventDate}
                    onChange={handleChange}
                    required={isEvent}
                    className="w-full border border-gray-200 dark:border-gray-600
                    rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-700
                    dark:text-gray-100 focus:ring-2 focus:ring-violet-400
                    focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600
                  dark:text-gray-400 mb-1">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    placeholder="e.g. Seminar Hall 1"
                    className="w-full border border-gray-200 dark:border-gray-600
                    rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-700
                    dark:text-gray-100 focus:ring-2 focus:ring-violet-400
                    focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Poster Image Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-600
                dark:text-gray-400 mb-1">
                  Event Poster (optional)
                </label>

                {/* Preview */}
                {posterPreview && (
                  <div className="relative mb-2">
                    <img
                      src={posterPreview}
                      alt="poster preview"
                      className="w-full h-36 object-cover rounded-xl border
                      border-violet-200"
                    />
                    <button
                      type="button"
                      onClick={() => { setPosterFile(null); setPosterPreview(null); }}
                      className="absolute top-2 right-2 bg-red-500 text-white
                      rounded-full p-1 hover:bg-red-600 transition"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                )}

                {/* Upload button */}
                {!posterPreview && (
                  <label className="flex items-center justify-center gap-2
                  w-full h-20 border-2 border-dashed border-violet-200
                  dark:border-violet-700 rounded-xl cursor-pointer
                  hover:bg-violet-50 dark:hover:bg-violet-900/10 transition">
                    <FiImage className="text-violet-400" size={20} />
                    <span className="text-xs text-violet-500 font-medium">
                      Click to upload poster
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePosterChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600
            dark:text-gray-400 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write details..."
              rows={4}
              required
              className="w-full border border-gray-200 dark:border-gray-600
              rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
              dark:text-gray-100 focus:ring-2 focus:ring-violet-400
              focus:outline-none transition resize-none"
            />
          </div>

          {/* Deadline + Link */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600
              dark:text-gray-400 mb-1">
                {isEvent ? "Registration Deadline" : "Deadline"}
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full border border-gray-200 dark:border-gray-600
                rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
                dark:text-gray-100 focus:ring-2 focus:ring-violet-400
                focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600
              dark:text-gray-400 mb-1">
                {isEvent ? "Registration Link" : "External Link"}
              </label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-200 dark:border-gray-600
                rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-gray-700
                dark:text-gray-100 focus:ring-2 focus:ring-violet-400
                focus:outline-none transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200
              dark:border-gray-600 text-gray-600 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700
              text-white text-sm font-semibold transition shadow-md disabled:opacity-60"
            >
              {loading ? "Saving..." : editData ? "Update" : "Post Notice"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default NoticeFormModal;