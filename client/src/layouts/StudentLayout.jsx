import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentSidebar from "../components/student/StudentSidebar";
import StudentTopbar from "../components/student/StudentTopbar";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* sidebar: off-canvas on mobile, fixed on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StudentSidebar close={() => setSidebarOpen(false)} />
      </aside>
      {/* overlay when sidebar open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <StudentTopbar toggleSidebar={toggleSidebar} />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
