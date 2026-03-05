// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./pages/public/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Student
import StudentLayout from "./pages/student/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import ProfilePage from "./pages/student/ProfilePage";
import JobPage from "./pages/student/JobPage";
import Notice from "./pages/student/Notice";
import Stories from "./pages/student/Stories";

// Alumni
import AlumniLayout from "./pages/alumni/AlumniLayout";
import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import AlumniProfile from "./pages/alumni/AlumniProfile";
import PostJob from "./pages/alumni/jobs/PostJob";
import MyJobs from "./pages/alumni/jobs/MyJobs";
import EditJob from "./pages/alumni/jobs/EditJob";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNoticeForm from "./pages/admin/notices/AdminNoticeForm";

import ProtectedRoute from "./components/ProtectedRoute";
import StudentNotices from "./pages/student/StudentNotices";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="jobs" element={<JobPage />} />
          <Route path="notice" element={<StudentNotices />} />
          <Route path="stories" element={<Stories />} />
        </Route>

        {/* Alumni Routes */}
        <Route
          path="/alumni"
          element={
            <ProtectedRoute role="alumni">
              <AlumniLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AlumniDashboard />} />
          <Route path="profile" element={<AlumniProfile />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="edit-job/:id" element={<EditJob />} />
        </Route>

        {/* Admin Routes */}
        {/* Login page is public */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="notices" element={<AdminNoticeForm />} />
          {/* Add other admin routes like Manage Students/Alumni if needed */}
        </Route>

        {/* Catch-all 404 */}
        <Route path="*" element={<div className="p-10 text-center text-red-600 font-bold text-xl">404 | Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Landing from "./pages/public/Landing";
// import Register from "./pages/Register";
// import Login from "./pages/Login";

// import Dashboard from "./pages/student/Dashboard";
// import ProfilePage from "./pages/student/ProfilePage";
// import ProtectedRoute from "./components/ProtectedRoute";

// import AlumniLayout from "./pages/alumni/AlumniLayout";
// import AlumniDashboard from "./pages/alumni/AlumniDashboard";
// import AlumniProfile from "./pages/alumni/AlumniProfile";
// import PostJob from "./pages/alumni/jobs/PostJob";
// import MyJobs from "./pages/alumni/jobs/MyJobs";
// import EditJob from "./pages/alumni/jobs/EditJob";
// import StudentLayout from "./pages/student/StudentLayout";
// import JobPage from "./pages/student/JobPage";
// import Notice from "./pages/student/Notice";
// import Stories from "./pages/student/Stories";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminLogin from "./pages/admin/AdminLogin";
// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminNoticeForm from "./pages/admin/notices/AdminNoticeForm";

// function App() {
//   return (
//     <BrowserRouter>
//       {/* ToastContainer outside of <Routes> */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Student */}
//         <Route
//           path="/student"
//           element={
//             <ProtectedRoute role="student">
//               <StudentLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="notice" element={<Notice/>} />
//           <Route path="stories" element={<Stories/>} />
//           <Route path="jobs" element={<JobPage />} />
//         </Route>

//         {/* Alumni */}
//         <Route
//           path="/alumni"
//           element={
//             <ProtectedRoute role="alumni">
//               <AlumniLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<AlumniDashboard />} />
//           <Route path="profile" element={<AlumniProfile />} />
//           <Route path="post-job" element={<PostJob />} />
//           <Route path="my-jobs" element={<MyJobs />} />
//           <Route path="edit-job/:id" element={<EditJob />} />
//         </Route>

// <Route path="/admin/login" element={< AdminLogin/>} />
// <Route path="/admin/dashboard" element={<AdminLayout />}>
//   <Route path="dashboard" element={<AdminDashboard />} />
//   <Route path="/admin/notices" element={<AdminNoticeForm />} />
// </Route>

//         {/* <Route path="/admin/dashboard" element={<AdminDashboard />}/>  */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// // import "react-toastify/dist/ReactToastify.css";
// import Landing from "./pages/public/Landing";
// import Register from "./pages/Register";
// import Login from "./pages/Login";

// import Dashboard from "./pages/student/Dashboard";
// import ProfilePage from "./pages/student/ProfilePage";
// import ProtectedRoute from "./components/ProtectedRoute";

// import AlumniLayout from "./pages/alumni/AlumniLayout";
// import AlumniDashboard from "./pages/alumni/AlumniDashboard";
// import AlumniProfile from "./pages/alumni/AlumniProfile";
// import PostJob from "./pages/alumni/jobs/PostJob";
// import MyJobs from "./pages/alumni/jobs/MyJobs";
// import EditJob from "./pages/alumni/jobs/EditJob";
// import StudentLayout from "./pages/student/StudentLayout";

// function App() {
//   return (
//     <>
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Student */}
//         <Route
//           path="/student"
//           // path="/dashboard"
//           element={
//             <ProtectedRoute role="student">
//               {/* <Dashboard /> */}
//               <StudentLayout />
//             </ProtectedRoute>
//           }
//         >
//           {/* <Route index element={<Dashboard />} /> */}
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="profile" element={<ProfilePage />} />
//         </Route>

//         {/* Alumni */}
//         <Route
//           path="/alumni"
//           element={
//             <ProtectedRoute role="alumni">
//               <AlumniLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<AlumniDashboard />} />
//           <Route path="profile" element={<AlumniProfile />} />
//           <Route path="post-job" element={<PostJob />} />
//           <Route path="my-jobs" element={<MyJobs />} />
//           <Route path="edit-job/:id" element={<EditJob />} />
//         </Route>


// <Route
//           path="toast"
//           element={
//             <ToastContainer
//               position="top-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//             />
//           }
//           />
//   </Routes>
//     </BrowserRouter>


//         {/* Optional: Not Found */}
//         {/* <Route path="*" element={<NotFound />} /> */}
    
//  {/* <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       /> */}
//     </>
//   );
// }

// export default App;


{/* // import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// // import Profile from "./pages/Profile";
// import Dashboard from "./pages/student/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProfilePage from "./pages/student/ProfilePage";
// import Landing from "./pages/public/Landing";
// import JobPage from "./pages/student/JobPage";
// import AlumniDashboard from "./pages/alumni/AlumniDashboard";
// import AlumniLayout from "./pages/alumni/AlumniLayout";
// import AlumniProfile from "./pages/alumni/AlumniProfile";
// // import JobPage from "./pages/alumni/JobPage";

// function App() { */}
{/* //   const user = JSON.parse(localStorage.getItem("user")); */}
//   return (
//     <BrowserRouter>
//       <Routes>

//   <Route path="/" element={<Landing />} />
//   <Route path="/register" element={<Register />} />
//   <Route path="/login" element={<Login />} />


//   {/* <Route path="/student/dashboard" element={<Dashboard />} /> */}
//   <Route path="/profile" element={<ProfilePage />} />
//   <Route path="/editprofile" element={<ProfilePage/>} />
//    <Route path="/jobs" element={<JobPage/>} />

   
//   <Route path="/alumni-dashboard" element={<AlumniLayout />} />
//   <Route path="alumni/dashboard" element={<AlumniDashboard/>} />
//   <Route path="/alumni/profile" element={<AlumniProfile />} />
//   {/* <Route path="/alumni-profile" element={<AlumniProfile/>}/> */}

// <Route path="/student/dashboard"
//           element={
//             <ProtectedRoute role="student">
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         ></Route>


//   <Route
//           path="/alumni"
//           element={
//             <ProtectedRoute role="alumni">
//               <AlumniLayout />
//             </ProtectedRoute>
//           }
//         ></Route>

        
    




//   {/* <Route path="dashboard" element={<AlumniDashboard />} /> */}


//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;