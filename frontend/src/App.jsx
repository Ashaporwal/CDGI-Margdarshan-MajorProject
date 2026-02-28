import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Landing from "./pages/public/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/student/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/student/ProfilePage";

import AlumniLayout from "./pages/alumni/AlumniLayout";
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import AlumniProfile from "./pages/alumni/AlumniProfile";

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
          <Route path="profile" element={<AlumniProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;