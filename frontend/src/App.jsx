import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Landing from "./pages/public/Landing";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import StudentLayout from "./pages/student/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import ProfilePage from "./pages/student/ProfilePage";
// import Notices from "./pages/student/Notice";
import Stories from "./pages/student/Stories";
import Jobs from "./pages/student/JobPage";
import StudentNotices from "./pages/student/StudentNotices";
import Events from "../src/pages/student/Events";

import AlumniLayout from "./pages/alumni/AlumniLayout";
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import AlumniProfile from "./pages/alumni/AlumniProfile";
import PostJob from "./pages/alumni/jobs/PostJob";
import MyJobs from "./pages/alumni/jobs/MyJobs";
import EditJob from "./pages/alumni/jobs/EditJob";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageAlumni from "./pages/admin/ManageAlumni";
import AdminNotices from "./pages/admin/notices/AdminNotices";
    import ManageCampusDrives from "./pages/admin/campusDrives/ManageCampusDrives";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*------- Student Routes--------- */}
        <Route path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="jobs" element={<Jobs />} />
          {/* <Route path="applications" element={<Applications />} /> */}
          <Route path="events" element={<Events />} />
          <Route path="notice" element={<StudentNotices />} />
          <Route path="stories" element={<Stories />} />

        </Route>


        {/*----------- Alumni Layout Route (Parent)-------- */}
        <Route
          path="/alumni"
          element={
            <ProtectedRoute role="alumni">
              <AlumniLayout />
            </ProtectedRoute>
          }
        >
          {/*  CHILD ROUTES */}
          <Route path="dashboard" element={<AlumniDashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="edit-job/:id" element={<EditJob />} />
          <Route path="profile" element={<AlumniProfile />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="alumni" element={<ManageAlumni />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="/admin/campus-drives" element={<ManageCampusDrives />} />


        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App;