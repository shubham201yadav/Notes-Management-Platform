import { Outlet } from "react-router-dom";
import { useState } from "react";
import SubAdminSidebar from "../components/subadmin/SubAdminSidebar";
import SubAdminTopbar from "../components/subadmin/SubAdminTopbar";

const SubAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((o) => !o);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50/60">
      <aside
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SubAdminSidebar close={() => setSidebarOpen(false)} />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-amber-950/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <SubAdminTopbar toggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-8 min-h-[calc(100vh-72px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SubAdminLayout;
