import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Layout
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import SubAdminLayout from "./layouts/SubAdminLayout";
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import AdminHome from "./pages/dashboards/admin/AdminHome";
import ManageUsers from "./pages/dashboards/admin/ManageUsers";
import ManageCourses from "./pages/dashboards/admin/ManageCourses";
import ManageNotes from "./pages/dashboards/admin/ManageNotes";
import Analytics from "./pages/dashboards/admin/Analytics";
import Settings from "./pages/dashboards/admin/Settings";

// Student Pages
import StudentDashboard from "./pages/dashboards/student/StudentDashboard";
import StudentNotes from "./pages/dashboards/student/StudentNotes";
import StudentProfile from "./pages/dashboards/student/StudentProfile";

// Subadmin Pages
import SubAdminHome from "./pages/dashboards/subadmin/SubAdminHome";
import SubAdminUsers from "./pages/dashboards/subadmin/SubAdminUsers";
import SubAdminNotes from "./pages/dashboards/subadmin/SubAdminNotes";
import SubAdminProfile from "./pages/dashboards/subadmin/SubAdminProfile";

// User Pages
import UserDashboard from "./pages/dashboards/user/UserDashboard";
import UserProfile from "./pages/dashboards/user/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= STUDENT ROUTES ================= */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="notes" element={<StudentNotes />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="notes" element={<ManageNotes />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ================= SUBADMIN ROUTE ================= */}
          <Route
            path="/subadmin"
            element={
              <ProtectedRoute allowedRoles={["subadmin"]}>
                <SubAdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SubAdminHome />} />
            <Route path="users" element={<SubAdminUsers />} />
            <Route path="notes" element={<SubAdminNotes />} />
            <Route path="profile" element={<SubAdminProfile />} />
          </Route>

          {/* ================= USER ROUTES ================= */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          {/* Keep old subadmin path working */}
          <Route path="/subadmin-dashboard" element={<Navigate to="/subadmin" replace />} />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Home />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;