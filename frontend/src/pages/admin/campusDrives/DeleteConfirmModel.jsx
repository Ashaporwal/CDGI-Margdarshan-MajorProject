import { FiTrash2 } from "react-icons/fi";

export default function DeleteModal({ drive, onCancel, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm">

        <div className="flex items-center justify-center w-12 h-12 bg-red-100
        dark:bg-red-900/30 rounded-full mb-4 mx-auto">
          <FiTrash2 className="text-red-500" size={20} />
        </div>

        <h3 className="text-lg font-bold text-center text-gray-800 dark:text-gray-100 mb-1">
          Delete Drive?
        </h3>

        <p className="text-sm text-center text-gray-400 mb-6">
          <span className="font-semibold text-gray-600 dark:text-gray-300">
            {drive?.companyName}
          </span>{" "}
          ka campus drive permanently delete ho jaayega.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600
            text-gray-600 dark:text-gray-300 text-sm font-semibold
            hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600
            text-white text-sm font-semibold transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}