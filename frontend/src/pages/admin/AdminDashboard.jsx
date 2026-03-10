import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  
  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">
        Welcome Admin
      </h1>

      <p className="text-gray-600">
        Here you can manage students, alumni, jobs and campus notices.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-6">

  <div className="p-6 bg-blue-500 text-white rounded-xl">
    Total Students
  </div>

  <div className="p-6 bg-green-500 text-white rounded-xl">
    Total Alumni
  </div>

  <div className="p-6 bg-purple-500 text-white rounded-xl">
    Total Notices
  </div>

</div>

    </div>
  );
}

export default AdminDashboard;