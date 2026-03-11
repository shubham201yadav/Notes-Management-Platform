import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Menu,
  Bell,
  ChevronDown,
  User
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const AdminTopbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-amber-50/80 backdrop-blur-xl border-b border-amber-200 shadow-sm px-4 md:px-8 py-3 flex justify-between items-center transition-all">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-amber-700 hover:bg-amber-100 rounded-xl transition md:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-xs font-medium text-amber-700 uppercase tracking-widest hidden md:block">
            Admin Panel
          </h2>
          <p className="text-base md:text-lg font-bold text-amber-900 leading-tight">
            {user?.name?.split(" ")[0] || "Admin"} 👋
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* Notifications */}
        <button className="relative p-2 text-amber-700 hover:bg-amber-100 rounded-full transition group">
          <Bell size={20} className="transition-transform group-hover:rotate-12" />
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-amber-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>

        <div className="h-8 w-[1px] bg-amber-200"></div>

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 hover:bg-amber-100/60 rounded-xl transition border border-transparent hover:border-amber-300"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-md">
                <User size={18} />
              </div>
              {/* Online dot */}
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-amber-900 leading-none">
                {user?.name || "Admin User"}
              </p>
              <p className="text-[11px] text-amber-700 mt-1 uppercase tracking-wide">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`text-amber-700 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN MENU */}
          <div
            className={`absolute right-0 mt-3 w-60 bg-white border border-amber-200 rounded-2xl shadow-xl shadow-amber-200/60 py-2 transition-all duration-200 origin-top z-50 ${
              isProfileOpen
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
            }`}
          >
            <div className="px-4 py-3 border-b border-amber-100">
              <p className="text-xs text-amber-700">Signed in as</p>
              <p className="text-sm font-semibold text-amber-900 truncate">
                {user?.email}
              </p>
            </div>

            <button
              onClick={() => {
                setIsProfileOpen(false);
                navigate("/admin/profile");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-amber-900 hover:bg-amber-50 transition min-h-[48px]"
            >
              <User size={16} /> Profile
            </button>

            <div className="h-[1px] bg-amber-100 my-2 mx-3"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium transition min-h-[48px]"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;