import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await API.post("/auth/login", formData);
      const { token, role, user } = res.data;
      const name = user?.name;
      const email = user?.email || formData.email;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      if (name) {
        localStorage.setItem("name", name);
      } else {
        localStorage.removeItem("name");
      }
      localStorage.setItem("email", email);

      // update auth context so ProtectedRoute can read the role immediately
      setUser({ token, role, name, email });

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "subadmin") {
        navigate("/subadmin");
      } else {
        navigate("/user");
      }

    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* LEFT SIDE - REGISTER PANEL */}
      <div className="flex md:flex-1 items-center justify-center p-8 text-white bg-white/10 backdrop-blur-xl">

        <div className="text-center max-w-sm">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            New Here? 🚀
          </h2>

          <p className="mb-6 text-gray-200 text-sm md:text-base">
            Create an account to access dashboard,
            manage students, and explore all features.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Create Account
          </button>

        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex md:flex-1 items-center justify-center p-6 md:p-10">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 md:p-10 w-full max-w-md text-white">

          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-200 mb-6">
            Login to continue to your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            {error && (
              <p className="text-red-300 text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:scale-105 transition duration-300 shadow-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p
              onClick={() => navigate("/forgot-password")}
              className="text-center text-sm text-gray-200 hover:text-white cursor-pointer"
            >
              Forgot Password?
            </p>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;