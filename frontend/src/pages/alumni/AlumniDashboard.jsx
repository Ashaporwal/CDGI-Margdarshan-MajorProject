import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaComments,
  FaChartLine,
  FaUser,
  FaPlus,
  FaList,
  FaHandsHelping
} from "react-icons/fa";

function AlumniDashboard() {

  const navigate = useNavigate();

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, Alumni! 👋
          </h1>

          <p className="text-green-100">
            Manage jobs, mentorship and your professional profile
          </p>
        </div>

        <button
          onClick={() => navigate("/alumni/post-job")}
          className="bg-white text-green-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-100"
        >
          + Post New Job
        </button>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Jobs Posted</p>
            <h2 className="text-3xl font-bold">2</h2>
          </div>

          <FaBriefcase className="text-3xl text-blue-500" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Total Applicants</p>
            <h2 className="text-3xl font-bold">567</h2>
          </div>

          <FaUsers className="text-3xl text-blue-500" />
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Mentorship Requests</p>
            <h2 className="text-3xl font-bold">2</h2>
          </div>

          <FaComments className="text-3xl text-blue-500" />
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm">Profile Views</p>
            <h2 className="text-3xl font-bold">142</h2>
          </div>

          <FaChartLine className="text-3xl" />
        </div>

      </div>


      {/* My Job Postings */}
      <div>

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-semibold">
            My Job Postings
          </h2>

          <span
            onClick={() => navigate("/alumni/my-jobs")}
            className="text-blue-600 cursor-pointer"
          >
            View All
          </span>

        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Job Card */}
          <div className="bg-white p-6 rounded-xl shadow space-y-3">

            <div className="flex justify-between items-center">

              <h3 className="text-xl font-semibold">
                Software Engineer
              </h3>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full">
                Full-time
              </span>

            </div>

            <p className="text-gray-500">
              Google
            </p>

            <div className="text-sm text-gray-600 space-y-1">
              <p>Applicants: 245</p>
              <p>Posted: 15 Jan 2026</p>
              <p>Deadline: 15 Feb 2026</p>
            </div>

            <button className="mt-3 w-full border rounded-lg py-2 hover:bg-gray-50">
              View Applicants
            </button>

          </div>


          {/* Job Card */}
          <div className="bg-white p-6 rounded-xl shadow space-y-3">

            <div className="flex justify-between items-center">

              <h3 className="text-xl font-semibold">
                Data Analyst Intern
              </h3>

              <span className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full">
                Internship
              </span>

            </div>

            <p className="text-gray-500">
              Amazon
            </p>

            <div className="text-sm text-gray-600 space-y-1">
              <p>Applicants: 189</p>
              <p>Posted: 18 Jan 2026</p>
              <p>Deadline: 20 Feb 2026</p>
            </div>

            <button className="mt-3 w-full border rounded-lg py-2 hover:bg-gray-50">
              View Applicants
            </button>

          </div>

        </div>

      </div>



      {/* QUICK ACTIONS SECTION */}
      <div>

        <h2 className="text-2xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-4 gap-6">

          {/* Profile */}
          <div
            onClick={() => navigate("/alumni/profile")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <FaUser className="text-3xl text-violet-600 mx-auto mb-2" />
            <p className="font-semibold">Profile</p>
          </div>


          {/* Post Job */}
          <div
            onClick={() => navigate("/alumni/post-job")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <FaPlus className="text-3xl text-green-600 mx-auto mb-2" />
            <p className="font-semibold">Post Job</p>
          </div>


          {/* My Jobs */}
          <div
            onClick={() => navigate("/alumni/my-jobs")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <FaList className="text-3xl text-blue-600 mx-auto mb-2" />
            <p className="font-semibold">My Jobs</p>
          </div>


          {/* Mentorship */}
          <div
            onClick={() => navigate("/alumni/mentorship")}
            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <FaHandsHelping className="text-3xl text-orange-500 mx-auto mb-2" />
            <p className="font-semibold">Mentorship</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AlumniDashboard;