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
import StudentLayout from "./pages/student/StudentLayout";
import Notices from "./pages/student/Notice";
import 

function App(){
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}

        <Route path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* <Route path="jobs" element={<Jobs />} /> */}
          {/* <Route path="applications" element={<Applications />} /> */}
          {/* <Route path="events" element={<Events />} /> */}
          <Route path="notice" element={<Notices/>}/>
          <Route path="stories" element={<Stories/>}/>

        </Route>


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