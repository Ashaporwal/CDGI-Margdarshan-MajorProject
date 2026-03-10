import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const EMPTY_FORM = {
  title: "",
  noticeType: "General",
  description: "",
  deadline: "",
  link: "",
};

 function NoticeFormModal({ isOpen, onClose, onSubmit, editData, loading }) {
  const [form, setForm] = useState(EMPTY_FORM);

  // When editData changes, prefill form
  useEffect(() => {
    if (editData) {
      setForm({
        title:       editData.title || "",
        noticeType:  editData.noticeType || "General",
        description: editData.description || "",
        deadline:    editData.deadline ? editData.deadline.split("T")[0] : "",
        link:        editData.link || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {editData ? "✏️ Edit Notice" : "📢 Post New Notice"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
              focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Type</label>
            <select
              name="noticeType"
              value={form.noticeType}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
              focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition bg-white"
            >
              <option value="General">📌 General</option>
              <option value="Campus Drive">🏢 Campus Drive</option>
              <option value="Deadline">⏰ Deadline</option>
              <option value="Update">🔔 Update</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write notice details..."
              rows={4}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
              focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition resize-none"
            />
          </div>

          {/* Deadline + Link — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">External Link</label>
              <input
                type="url"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                focus:ring-2 focus:ring-violet-400 focus:outline-none focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600
              hover:bg-gray-50 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700
              text-white text-sm font-semibold transition shadow-md disabled:opacity-60"
            >
              {loading ? "Saving..." : editData ? "Update Notice" : "Post Notice"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default NoticeFormModal;