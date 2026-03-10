import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Handle dashboard navigation based on user role
  const handleDashboardClick = () => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "subadmin") {
      navigate("/subadmin");
    } else {
      navigate("/user");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-6 py-4`}
    >
      <div className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-2xl shadow-2xl border border-white/30 py-2.5 px-6"
          : "bg-slate-900/80 backdrop-blur-xl border border-white/40 py-3 px-6 shadow-lg"
      }`}>
        <div className="flex justify-between items-center">
        
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300 shadow-lg hover:shadow-xl">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <span
            className={`text-xl font-black tracking-tight transition-colors duration-300 text-white drop-shadow-lg`}
          >
            Newtan's Unity
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-semibold text-sm uppercase tracking-wider transition-colors duration-300 group ${
                  isActive
                    ? "text-amber-400"
                    : "text-white/90 hover:text-amber-300"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <button
              onClick={handleDashboardClick}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold hover:from-amber-600 hover:to-orange-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-2 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <LogIn size={16} />
                Login
              </button>

              {/* Register */}
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold hover:from-amber-600 hover:to-orange-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <UserPlus size={16} />
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-4 right-4 md:hidden mt-2 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/30 transition-all duration-300 overflow-hidden z-50 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-5 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-bold text-white hover:text-amber-300 transition-colors duration-300 py-2"
            >
              {link.name}
            </Link>
          ))}

          <hr className="border-white/20 my-2" />

          {token ? (
            <button
              onClick={handleDashboardClick}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold shadow-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 border-2 border-amber-400 text-amber-300 rounded-2xl font-semibold hover:bg-amber-400/20 transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-bold shadow-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
              >
                Register
              </button>
            </>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;