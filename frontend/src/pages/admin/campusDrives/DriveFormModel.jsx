import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import API from "../../../services/api";
import { toast } from "react-toastify";

// ── Constants ─────────────────────────────────────────────
const STATUS_OPTIONS = ["upcoming", "completed", "cancelled"];

export const EMPTY_FORM = {
  companyName:          "",
  jobRoles:             "",
  driveDate:            "",
  time:                 "",
  location:             "",
  eligibilityCriteria:  "",
  packageOffered:       "",
  description:          "",
  registrationLink:     "",
  registrationDeadline: "",
  totalRegistrations:   "",
  studentsPlaced:       "",
  status:               "upcoming",
};

// ── Helper ────────────────────────────────────────────────
function toDateInput(d) {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

// ── FormField — OUTSIDE modal (fixes focus/cursor bug!) ──
// ⚠️ KEY RULE: Never define a component inside another component
// Defining here means React treats it as STABLE across re-renders
// → no unmount/remount → no focus loss on every keystroke!
function FormField({
  label, name, type = "text",
  placeholder = "", required = false,
  textarea = false, value, onChange
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
          text-sm bg-white dark:bg-gray-700 dark:text-gray-100
          focus:ring-2 focus:ring-violet-400 focus:outline-none resize-none transition"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
          text-sm bg-white dark:bg-gray-700 dark:text-gray-100
          focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
        />
      )}
    </div>
  );
}

// ── DriveFormModal ────────────────────────────────────────
export default function DriveFormModal({ editData, onClose, onSaved }) {
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const isEdit = !!editData;

  // Populate form on edit
  useEffect(() => {
    if (editData) {
      setForm({
        companyName:          editData.companyName || "",
        jobRoles:             (editData.jobRoles || []).join(", "),
        driveDate:            toDateInput(editData.driveDate),
        time:                 editData.time || "",
        location:             editData.location || "",
        eligibilityCriteria:  editData.eligibilityCriteria || "",
        packageOffered:       editData.packageOffered || "",
        description:          editData.description || "",
        registrationLink:     editData.registrationLink || "",
        registrationDeadline: toDateInput(editData.registrationDeadline),
        totalRegistrations:   editData.totalRegistrations ?? "",
        studentsPlaced:       editData.studentsPlaced ?? "",
        status:               editData.status || "upcoming",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        jobRoles:             form.jobRoles.split(",").map(r => r.trim()).filter(Boolean),
        totalRegistrations:   form.totalRegistrations !== "" ? Number(form.totalRegistrations) : 0,
        studentsPlaced:       form.studentsPlaced !== ""     ? Number(form.studentsPlaced)     : 0,
        driveDate:            form.driveDate || null,
        registrationDeadline: form.registrationDeadline || null,
      };

      if (isEdit) {
        await API.put(`/api/campus-drives/${editData._id}`, payload);
        toast.success("Campus Drive updated!");
      } else {
        await API.post("/api/campus-drives", payload);
        toast.success("Campus Drive scheduled!");
      }
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start
    justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl
      w-full max-w-2xl my-8">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b
        border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {isEdit ? "✏️ Edit Campus Drive" : "📅 Schedule Campus Drive"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
            text-gray-400 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Company Name */}
          <div className="md:col-span-2">
            <FormField
              label="Company Name" name="companyName" required
              placeholder="e.g. TCS, Infosys, BNY"
              value={form.companyName} onChange={handleChange}
            />
          </div>

          {/* Job Roles */}
          <div className="md:col-span-2">
            <FormField
              label="Job Roles (comma separated)" name="jobRoles" required
              placeholder="e.g. Software Engineer, Data Analyst"
              value={form.jobRoles} onChange={handleChange}
            />
          </div>

          {/* Drive Date + Time */}
          <FormField
            label="Drive Date (if confirmed)" name="driveDate" type="date"
            value={form.driveDate} onChange={handleChange}
          />
          <FormField
            label="Reporting Time" name="time"
            placeholder="e.g. 09:30 AM"
            value={form.time} onChange={handleChange}
          />

          {/* Location */}
          <div className="md:col-span-2">
            <FormField
              label="Location / Venue" name="location" required
              placeholder="e.g. Seminar Hall 1, CDGI Indore"
              value={form.location} onChange={handleChange}
            />
          </div>

          {/* Package + Status */}
          <FormField
            label="Package Offered" name="packageOffered"
            placeholder="e.g. 5 LPA, 22 LPA"
            value={form.packageOffered} onChange={handleChange}
          />

          {/* Status Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Status <span className="text-red-400">*</span>
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2
              text-sm bg-white dark:bg-gray-700 dark:text-gray-100
              focus:ring-2 focus:ring-violet-400 focus:outline-none transition"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Registration Link */}
          <div className="md:col-span-2">
            <FormField
              label="Registration Link" name="registrationLink"
              placeholder="https://forms.gle/..."
              value={form.registrationLink} onChange={handleChange}
            />
          </div>

          {/* Registration Deadline */}
          <FormField
            label="Registration Deadline" name="registrationDeadline" type="date"
            value={form.registrationDeadline} onChange={handleChange}
          />

          {/* Stats */}
          <FormField
            label="Total Registrations" name="totalRegistrations" type="number"
            placeholder="0"
            value={form.totalRegistrations} onChange={handleChange}
          />
          <FormField
            label="Students Placed" name="studentsPlaced" type="number"
            placeholder="0"
            value={form.studentsPlaced} onChange={handleChange}
          />

          {/* Eligibility */}
          <div className="md:col-span-2">
            <FormField
              label="Eligibility Criteria" name="eligibilityCriteria"
              textarea
              placeholder="e.g. BTech CS/IT | Batch 2026 | Min CGPA 7.0 | No backlogs"
              value={form.eligibilityCriteria} onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <FormField
              label="Description / Drive Schedule" name="description"
              textarea
              placeholder="e.g. 09:30 AM - Arrival | 10:00 AM - PPT | 11:30 AM - GD Round..."
              value={form.description} onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600
              rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700
              text-white rounded-xl text-sm font-semibold transition disabled:opacity-50"
            >
              {loading
                ? (isEdit ? "Updating..." : "Scheduling...")
                : (isEdit ? "Update Drive" : "Schedule Drive")
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}