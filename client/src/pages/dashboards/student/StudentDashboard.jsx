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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {displayName}! 👋
        </h2>
        <p className="text-slate-600">
          Keep learning and make progress towards your goals.
        </p>
      </div>

      {/* Stats Cards */}
      {!loading && (
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Notes</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.totalNotes}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <BookOpen className="text-indigo-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Subjects</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.subjects}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="text-purple-600" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Study Hours</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.studyHours}h
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="text-green-600" size={28} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-3">Ready to Learn?</h3>
        <p className="mb-6 text-indigo-100">
          Explore class notes, assignments, and resources below.
        </p>
        <a
          href="/student/notes"
          className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-slate-100 transition"
        >
          View Class Notes →
        </a>
      </div>
    </div>
  );
};

export default StudentDashboard;
