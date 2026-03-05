import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await API.post("/auth/reset-password", { email, otp, password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700">

      {/* LEFT INFO PANEL */}
      <div className="hidden md:flex flex-1 items-center justify-center text-white p-10 bg-white/10 backdrop-blur-xl">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-4">
            Secure Account Recovery 🔐
          </h2>
          <p className="text-gray-200">
            Enter your registered email address. We'll send you a One-Time Password (OTP)
            to securely reset your account password.
          </p>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">

        <form
          onSubmit={step === 1 ? handleSendOtp : handleReset}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 md:p-10 w-full max-w-md text-white space-y-4"
        >
          <h2 className="text-3xl font-bold text-center">
            Reset Password
          </h2>

          {/* STEP INDICATOR */}
          <div className="text-center text-sm text-gray-300">
            Step {step} of 2
          </div>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={step !== 1}
            className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          {/* STEP 2 FIELDS */}
          {step > 1 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </>
          )}

          {/* MESSAGE */}
          {message && (
            <p className="text-green-300 text-sm text-center">
              {message}
            </p>
          )}

          {error && (
            <p className="text-red-300 text-sm text-center">
              {error}
            </p>
          )}

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition duration-300 shadow-lg font-semibold">
            {step === 1 ? "Send OTP" : "Reset Password"}
          </button>

          {/* BACK TO LOGIN */}
          <p
            onClick={() => navigate("/login")}
            className="text-center text-sm text-gray-200 hover:text-white cursor-pointer mt-2"
          >
            ← Back to Login
          </p>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;