import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      setLoading(true);
      await API.post("/auth/register", formData);
      setFormData({ name: "", email: "", password: "" });
      setConfirmPassword("");
      alert("Registration Successful ✅");
      navigate("/login");

    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* LEFT SIDE - REGISTER FORM */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 md:p-10 w-full max-w-md text-white">

          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account ✨
          </h2>

          <p className="text-center text-gray-200 mb-6">
            Join us and explore all platform features
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
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
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-sm mt-4 text-gray-200">
              Already have an account?{" "}
              <span
                className="text-white font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>

          </form>
        </div>
      </div>

      {/* RIGHT SIDE - INFO PANEL */}
      <div className="hidden md:flex flex-1 items-center justify-center text-white p-10 bg-white/10 backdrop-blur-xl">

        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to Our Platform 🚀
          </h2>
          <p className="text-gray-200">
            Create your account to access dashboards, manage documents,
            and explore powerful system features built for you.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;