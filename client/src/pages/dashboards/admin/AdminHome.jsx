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
  PlusCircle,
  FileText,
  Plus,
  Book
} from "lucide-react";

const AdminHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    notes: 0,
    revenue: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [materials, setMaterials] = useState({
    school: 0,
    college: 0,
    total: 0,
    subjects: 0,
    attachments: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      setIsSyncing(true);
      const res = await API.get("/admin/dashboard");

      setStats({
        users: res.data.users || 0,
        notes: res.data.notes || 0,
        revenue: res.data.revenue || 0,
      });

      setRecentUsers(res.data.recentUsers || []);
      setRecentNotes(res.data.recentNotes || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await API.get("/notes");
      const notes = res.data || [];

      // Calculate material statistics from notes
      let schoolCount = 0;
      let collegeCount = 0;
      const subjects = new Set();
      let attachmentsCount = 0;

      notes.forEach((note) => {
        // Count by level/category
        const level = note.level || note.category || "";
        if (
          level.toLowerCase().includes("school") ||
          level.toLowerCase().includes("8-12") ||
          level.toLowerCase().includes("8–12")
        ) {
          schoolCount++;
        } else if (
          level.toLowerCase().includes("college") ||
          level.toLowerCase().includes("1-8") ||
          level.toLowerCase().includes("1–8")
        ) {
          collegeCount++;
        }

        // Count subjects
        if (note.subject) {
          subjects.add(note.subject);
        }

        // Count attachments
        if (note.attachments && Array.isArray(note.attachments)) {
          attachmentsCount += note.attachments.length;
        } else if (note.file || note.fileUrl) {
          attachmentsCount++;
        }
      });

      setMaterials({
        school: schoolCount,
        college: collegeCount,
        total: notes.length,
        subjects: subjects.size,
        attachments: attachmentsCount,
      });
    } catch (err) {
      console.log("Failed to fetch materials data");
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchMaterials();
    // Set up real-time updates - refresh every 2 seconds for live data
    const interval = setInterval(() => {
      fetchDashboardStats();
      fetchMaterials();
    }, 2000);
    return () => clearInterval(interval);
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

        {/* Notes */}
        <StatCard
          title="Total Notes"
          value={stats.notes}
          icon={FileText}
          gradient="from-blue-400 to-cyan-500"
          growth="+8%"
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

      {/* Study Materials Management */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow p-6 md:p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Book size={28} className="text-blue-600" />
            <h3 className="text-2xl md:text-3xl font-bold text-blue-900">Study Materials Management</h3>
          </div>
          <p className="text-blue-700 mt-1 text-sm">Organize School & College study materials</p>
        </div>

        {/* Materials Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* School Materials */}
          <div className="bg-white rounded-xl border border-blue-200 p-4 hover:shadow-md transition">
            <p className="text-xs text-blue-700 font-semibold mb-1">School (8–12)</p>
            <p className="text-2xl md:text-3xl font-bold text-blue-900">{materials.school}</p>
            <div className="mt-2 h-1 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{width: `${Math.min((materials.school / Math.max(materials.college, 1)) * 50, 100)}%`}}></div>
            </div>
          </div>

          {/* College Materials */}
          <div className="bg-white rounded-xl border border-indigo-200 p-4 hover:shadow-md transition">
            <p className="text-xs text-indigo-700 font-semibold mb-1">College (1–8)</p>
            <p className="text-2xl md:text-3xl font-bold text-indigo-900">{materials.college}</p>
            <div className="mt-2 h-1 bg-indigo-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{width: `${Math.min((materials.college / Math.max(materials.school, 1)) * 50, 100)}%`}}></div>
            </div>
          </div>

          {/* Total Materials */}
          <div className="bg-white rounded-xl border border-purple-200 p-4 hover:shadow-md transition">
            <p className="text-xs text-purple-700 font-semibold mb-1">Total Materials</p>
            <p className="text-2xl md:text-3xl font-bold text-purple-900">{materials.total}</p>
            <p className="text-xs text-purple-600 mt-2">All materials</p>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-xl border border-green-200 p-4 hover:shadow-md transition">
            <p className="text-xs text-green-700 font-semibold mb-1">Subjects</p>
            <p className="text-2xl md:text-3xl font-bold text-green-900">{materials.subjects}</p>
            <p className="text-xs text-green-600 mt-2">Categories</p>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-xl border border-orange-200 p-4 hover:shadow-md transition">
            <p className="text-xs text-orange-700 font-semibold mb-1">Attachments</p>
            <p className="text-2xl md:text-3xl font-bold text-orange-900">{materials.attachments}</p>
            <p className="text-xs text-orange-600 mt-2">Files</p>
          </div>
        </div>
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