import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const SubAdminSidebar = ({ close }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/subadmin", icon: LayoutDashboard },
    { name: "Manage Users", path: "/subadmin/users", icon: Users },
    { name: "Manage Notes", path: "/subadmin/notes", icon: FileText },
    { name: "Profile", path: "/subadmin/profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-72 md:w-20" : "w-72"
      } sticky top-0 h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-orange-50 text-amber-950 p-3 md:p-4 flex flex-col border-r border-orange-200 transition-all duration-300 overflow-y-auto`}
    >
      <div className="flex items-center justify-between mb-6 md:mb-10">
        {!collapsed && (
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
              Subadmin Panel
            </h2>
            <p className="text-xs text-amber-700 mt-1">Team operations</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-2 rounded-lg hover:bg-orange-200/60 transition min-h-[44px] min-w-[44px] items-center justify-center"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/subadmin"}
              onClick={close}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl transition-all duration-300 group min-h-[48px] ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                    : "text-amber-900 hover:bg-orange-200/60"
                }`
              }
            >
              <Icon size={20} />
              {!collapsed && <span className="font-medium">{item.name}</span>}
              {collapsed && (
                <span className="absolute left-16 bg-white text-amber-900 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-orange-200">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-orange-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-amber-900 hover:bg-red-100 hover:text-red-700 transition-all duration-300"
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default SubAdminSidebar;
