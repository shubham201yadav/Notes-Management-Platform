import { useAuth } from "../../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const savedName = localStorage.getItem("name");
  const displayName = user?.name || savedName || "User";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-white to-blue-50" />
        <div className="relative p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan-700 uppercase">
            User Dashboard
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 break-words">
            Welcome, {displayName}!
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            This is your personal dashboard. You can view your profile and manage your account information.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Role Request</h3>
        <p className="mt-2 text-slate-700">
          Need a role change? Please send a role request to the admin.
        </p>
      </section>
    </div>
  );
};

export default UserDashboard;
