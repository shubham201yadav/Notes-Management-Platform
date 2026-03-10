import { Menu, LogOut, Bell, ChevronDown, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const UserTopbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const savedName = localStorage.getItem("name");
  const savedEmail = localStorage.getItem("email");
  const displayName = user?.name || savedName || "User";
  const displayEmail = user?.email || savedEmail || "user@example.com";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-cyan-50/80 backdrop-blur-xl border-b border-cyan-200 shadow-sm px-4 md:px-8 py-3 flex justify-between items-center transition-all">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-cyan-700 hover:bg-cyan-100 rounded-xl transition"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-xs font-medium text-cyan-700 uppercase tracking-widest hidden md:block">
            User Panel
          </h2>
          <p className="text-base md:text-lg font-bold text-cyan-900 leading-tight">
            {displayName} 👋
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative p-2 text-cyan-700 hover:bg-cyan-100 rounded-full transition group">
          <Bell size={20} className="transition-transform group-hover:rotate-12" />
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-cyan-500 rounded-full border-2 border-white animate-pulse" />
        </button>

        <div className="h-8 w-[1px] bg-cyan-200" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 hover:bg-cyan-100/60 rounded-xl transition border border-transparent hover:border-cyan-300"
          >
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <User size={18} />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
            </div>

            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-cyan-900 leading-none">
                {displayName}
              </p>
              <p className="text-[11px] text-cyan-700 mt-1 uppercase tracking-wide">User</p>
            </div>

            <ChevronDown
              size={16}
              className={`text-cyan-700 transition-transform duration-200 ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`absolute right-0 mt-3 w-60 bg-white border border-cyan-200 rounded-2xl shadow-xl shadow-cyan-200/60 py-2 transition-all duration-200 origin-top z-50 ${
              isProfileOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
            }`}
          >
            <div className="px-4 py-3 border-b border-cyan-100">
              <p className="text-xs text-cyan-700">Signed in as</p>
              <p className="text-sm font-semibold text-cyan-900 truncate">
                {displayEmail}
              </p>
            </div>

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

export default UserTopbar;
