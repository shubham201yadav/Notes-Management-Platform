import { useEffect, useState } from "react";
import API from "../../../services/api";

const SubAdminHome = () => {
  const [stats, setStats] = useState({
    users: 0,
    notes: 0,
    courses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async ({ initial = false } = {}) => {
    try {
      if (initial) {
        setLoading(true);
      }
      setError("");

      const [usersRes, notesRes, adminRes] = await Promise.all([
        API.get("/users"),
        API.get("/notes"),
        API.get("/admin/dashboard"),
      ]);

      setStats({
        users: (usersRes.data || []).length,
        notes: (notesRes.data || []).length,
        courses: adminRes.data?.courses || 0,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load live dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats({ initial: true });

    // Keep dashboard counts live.
    const interval = setInterval(() => {
      fetchStats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div>
          <h2 className="text-3xl font-bold text-amber-950 mb-2">Subadmin Dashboard</h2>
          <p className="text-amber-800">Live overview of users, notes, and courses.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-orange-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-orange-700">Total Users</p>
          <p className="text-3xl font-bold text-orange-900 mt-1">
            {loading ? "..." : stats.users}
          </p>
        </div>
        <div className="bg-white border border-orange-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-orange-700">Total Notes</p>
          <p className="text-3xl font-bold text-orange-900 mt-1">
            {loading ? "..." : stats.notes}
          </p>
        </div>
        <div className="bg-white border border-orange-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-orange-700">Total Courses</p>
          <p className="text-3xl font-bold text-orange-900 mt-1">
            {loading ? "..." : stats.courses}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubAdminHome;
