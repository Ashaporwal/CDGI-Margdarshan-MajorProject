import { FiAlertTriangle, FiX } from "react-icons/fi";

 function DeleteConfirmModal({ isOpen, onClose, onConfirm, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <FiAlertTriangle size={26} className="text-red-500" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Notice?</h3>
        <p className="text-sm text-gray-500 mb-6">
          This notice will be permanently deleted. Are you sure?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600
            hover:bg-gray-50 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
            text-white text-sm font-semibold transition disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmModal;