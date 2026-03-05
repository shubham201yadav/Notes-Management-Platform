import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100/60">
      {/* sidebar: off-canvas on mobile, static on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar close={() => setSidebarOpen(false)} />
      </aside>
      {/* overlay when sidebar open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-amber-900/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <AdminTopbar toggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-8 bg-gradient-to-br from-amber-50/70 to-yellow-50/40 min-h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;