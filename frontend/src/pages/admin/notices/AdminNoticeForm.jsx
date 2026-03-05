import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import API from "../../../services/api";

function AdminNoticeForm() {
  const [form, setForm] = useState({
    title: "",
    noticeType: "General",
    description: "",
    deadline: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.error("Title and Description are required!");
      return;
    }

    setLoading(true);

    try {
         console.log("POST URL:", "/notice")
        //  const res = await API.post("http://localhost:5000/notice/notice", form);
    //   const res = await API.post("/notice", form);
    const res = await API.post("../notice/notice", form);
    //    const res = await API.post("/notice/notice", form);
    // await API.post("http://localhost:5000/notice", form);
      toast.success("Notice posted successfully!");
      setForm({
        title: "",
        noticeType: "General",
        description: "",
        deadline: "",
        link: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post notice");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Post a Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Notice title"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Type</label>
          <select
            name="noticeType"
            value={form.noticeType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="General">General</option>
            <option value="Campus Drive">Campus Drive</option>
            <option value="Deadline">Deadline</option>
            <option value="Update">Update</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write notice details..."
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">External Link</label>
          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="Optional: link for more info"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold 
            bg-gradient-to-r from-indigo-500 to-indigo-700
            hover:from-indigo-600 hover:to-indigo-800
            shadow-md transition duration-300"
        >
          {loading ? "Posting..." : "Post Notice"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AdminNoticeForm;