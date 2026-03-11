import { useEffect, useState } from "react";
import API from "../../../services/api";
import { BookOpen, Users, Clock } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const StudentDashboard = () => {
  const [stats, setStats] = useState({ totalNotes: 0, subjects: 0, studyHours: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const savedName = localStorage.getItem("name");
  const savedEmail = localStorage.getItem("email");
  const fallbackNameFromEmail = (user?.email || savedEmail || "")
    .split("@")[0]
    ?.replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
  const displayName = user?.name || savedName || fallbackNameFromEmail || "Student";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/notes");
      const notes = res.data || [];
      const uniqueSubjects = new Set(notes.map((n) => n.subject)).size;
      setStats({
        totalNotes: notes.length,
        subjects: uniqueSubjects,
        studyHours: Math.floor(Math.random() * 50) + 10, // Mock data
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
          Welcome back, {displayName}! 👋
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Keep learning and make progress towards your goals.
        </p>
      </div>

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Notes</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  {stats.totalNotes}
                </p>
              </div>
              <div className="p-2.5 sm:p-3 bg-indigo-100 rounded-lg">
                <BookOpen className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Subjects</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  {stats.subjects}
                </p>
              </div>
              <div className="p-2.5 sm:p-3 bg-purple-100 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Study Hours</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  {stats.studyHours}h
                </p>
              </div>
              <div className="p-2.5 sm:p-3 bg-green-100 rounded-lg">
                <Clock className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 sm:p-8 text-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-3">Ready to Learn?</h3>
        <p className="mb-6 text-sm sm:text-base text-indigo-100 max-w-2xl">
          Explore class notes, assignments, and resources below.
        </p>
        <a
          href="/student/notes"
          className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-slate-100 transition"
        >
          View Class Notes →
        </a>
      </div>
    </div>
  );
};

export default StudentDashboard;
