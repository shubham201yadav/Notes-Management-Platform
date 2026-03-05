import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Other Dashboards
import SubAdminDashboard from "./pages/dashboards/SubAdminDashboard";

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
            path="/subadmin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["subadmin"]}>
                <SubAdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Home />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;