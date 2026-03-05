import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import {
  Users,
  BookOpen,
  IndianRupee,
  TrendingUp,
  AlertCircle,
  UserPlus,
  PlusCircle
} from "lucide-react";

const AdminHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    revenue: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/dashboard");

      setStats({
        users: res.data.users || 0,
        courses: res.data.courses || 0,
        revenue: res.data.revenue || 0,
      });

      setRecentUsers(res.data.recentUsers || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (loading)
    return (
      <div className="min-h-[300px] flex items-center justify-center text-amber-700 animate-pulse">
        Loading dashboard...
      </div>
    );

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900">
            Dashboard Overview
          </h2>
          <p className="text-amber-700 mt-1 text-sm md:text-base">
            Monitor performance & manage your platform.
          </p>
        </div>

        {/* Quick Action */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center justify-center gap-2 bg-amber-500 text-white px-4 py-2.5 rounded-xl hover:bg-amber-600 transition text-sm md:text-base min-h-[44px]"
          >
            <UserPlus size={16} />
            <span className="hidden sm:inline">Add User</span>
            <span className="sm:hidden">User</span>
          </button>
          <button
            onClick={() => navigate("/admin/notes")}
            className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2.5 rounded-xl hover:bg-yellow-600 transition text-sm md:text-base min-h-[44px]"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">Add Notes</span>
            <span className="sm:hidden">Notes</span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Users */}
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={Users}
          gradient="from-amber-400 to-yellow-500"
          growth="+12%"
        />

        {/* Courses */}
        <StatCard
          title="Courses"
          value={stats.courses}
          icon={BookOpen}
          gradient="from-yellow-400 to-amber-500"
          growth="+5%"
        />

        {/* Revenue */}
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toLocaleString()}`}
          icon={IndianRupee}
          gradient="from-amber-500 to-orange-500"
          growth="+18%"
        />
      </div>

      {/* Recent Users */}
      <div className="bg-white/90 rounded-2xl shadow border border-amber-200 p-6">
        <h4 className="font-semibold text-amber-900 mb-4">
          Recent Users
        </h4>

        {recentUsers.length === 0 ? (
          <p className="text-sm text-amber-700">No recent users.</p>
        ) : (
          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-amber-50 px-4 py-3 rounded-xl"
              >
                <div>
                  <p className="font-medium text-amber-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-amber-700">
                    {user.email}
                  </p>
                </div>
                <span className="text-xs text-amber-700/80">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Growth Section */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-6 rounded-2xl shadow-lg shadow-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} />
          <h4 className="font-semibold">Platform Growth</h4>
        </div>
        <p className="text-sm opacity-80">
          Your platform engagement is increasing steadily. Focus on expanding courses and improving student retention.
        </p>
      </div>

    </div>
  );
};

export default AdminHome;


/* Reusable Stat Card */
const StatCard = ({ title, value, icon: Icon, gradient, growth }) => {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-2xl shadow-lg`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full mt-2 inline-block">
            {growth}
          </span>
        </div>
        <Icon size={36} className="opacity-80" />
      </div>
    </div>
  );
};