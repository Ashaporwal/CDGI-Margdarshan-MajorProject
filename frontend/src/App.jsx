import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Landing from "./pages/public/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/student/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/student/ProfilePage";
import AlumniLayout from "./pages/alumni/AlumniLayout";
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import AlumniProfile from "./pages/alumni/AlumniProfile";
import PostJob from "./pages/alumni/jobs/PostJob";
import MyJobs from "./pages/alumni/jobs/MyJobs";
import EditJob from "./pages/alumni/jobs/EditJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <ProfilePage />
            </ProtectedRoute>
          }
        />



        {/* Alumni Layout Route (Parent) */}
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

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;