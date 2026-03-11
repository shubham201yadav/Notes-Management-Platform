import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentSidebar = ({ close }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/student", icon: LayoutDashboard },
    { name: "My Notes", path: "/student/notes", icon: BookOpen },
    { name: "Profile", path: "/student/profile", icon: UserCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-72 md:w-20" : "w-72"
      } sticky top-0 h-screen bg-slate-950/95 backdrop-blur-md text-white p-4 flex flex-col border-r border-white/10 transition-all duration-300`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between mb-10">
        {!collapsed && (
          <div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Student Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Learn & grow
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:inline-flex p-2 rounded-lg hover:bg-white/10 transition"
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
              end={item.path === "/student"}
              onClick={close}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-amber-400 rounded-r-full opacity-0 group-[.active]:opacity-100"></span>
              <Icon size={20} />
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
              {collapsed && (
                <span className="absolute left-16 bg-slate-900 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Logout */}
      <div className="mt-auto pt-8 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
