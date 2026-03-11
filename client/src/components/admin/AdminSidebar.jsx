import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  FileText
} from "lucide-react";
import { useState } from "react";

const AdminSidebar = ({ close }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Manage Users", path: "/admin/users", icon: Users },
    { name: "Manage Notes", path: "/admin/notes", icon: FileText },
    { name: "Manage Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Profile", path: "/admin/profile", icon: UserCircle },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-72 md:w-20" : "w-72"
      } sticky top-0 h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-yellow-100 text-amber-900 p-3 md:p-4 flex flex-col border-r border-amber-200 transition-all duration-300 overflow-y-auto`}
    >
      
      {/* Top Section */}
      <div className="flex items-center justify-between mb-6 md:mb-10">
        {!collapsed && (
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Admin Panel
            </h2>
            <p className="text-xs text-amber-700 mt-1">
              Manage your platform
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-2 rounded-lg hover:bg-amber-200/60 transition min-h-[44px] min-w-[44px] items-center justify-center"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              onClick={close}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 md:px-4 py-3 md:py-3 rounded-xl transition-all duration-300 group min-h-[48px]
                ${
                  isActive
                    ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 shadow-lg shadow-amber-300/60"
                    : "text-amber-800 hover:bg-amber-200/60 hover:text-amber-900"
                }`
              }
            >
              {/* Active Indicator */}
              <span className="absolute left-0 top-0 h-full w-1 bg-amber-300 rounded-r-full opacity-0 group-[.active]:opacity-100"></span>

              <Icon size={20} />

              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}

              {/* Tooltip when collapsed */}
              {collapsed && (
                <span className="absolute left-16 bg-amber-100 text-amber-900 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-amber-300">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto pt-8 border-t border-amber-200 text-center">
        {!collapsed ? (
          <p className="text-xs text-amber-700/80">
            © 2026 Your Platform
          </p>
        ) : (
          <p className="text-xs text-amber-700/80">©</p>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;