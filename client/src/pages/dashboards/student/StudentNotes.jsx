import { useEffect, useState } from "react";
import API from "../../../services/api";
import {
  FileText,
  Download,
  Search,
  AlertCircle,
  File,
} from "lucide-react";

const StudentNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [activeTab, setActiveTab] = useState("school"); // school | college
  const [level, setLevel] = useState("all");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get("/notes");
      setNotes(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const levels =
    activeTab === "school"
      ? ["8", "9", "10", "11", "12"]
      : ["1", "2", "3", "4", "5", "6", "7", "8"];

  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      note.title?.toLowerCase().includes(term) ||
      note.subject?.toLowerCase().includes(term);

    const matchesCategory = note.category === activeTab;

    const matchesLevel =
      level === "all" || note.classLevel === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Academic Notes Library
        </h2>
        <p className="text-slate-500 mt-1">
          Structured notes for School & College students
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
        {["school", "college"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setLevel("all");
            }}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? "bg-white shadow text-indigo-600"
                : "text-slate-600 hover:text-indigo-600"
            }`}
          >
            {tab === "school"
              ? "School (Class 8–12)"
              : "College (Semester 1–8)"}
          </button>
        ))}
      </div>

      {/* Modern Search + Filter */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        
        {/* Modern Search */}
        <div className="relative w-full max-w-md group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600"
          />
          <input
            type="text"
            placeholder="Search notes by title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all"
          />
        </div>

        {/* Level Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setLevel("all")}
            className={`px-4 py-2 text-sm rounded-full border transition ${
              level === "all"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600"
            }`}
          >
            All
          </button>

          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-4 py-2 text-sm rounded-full border transition ${
                level === lvl
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600"
              }`}
            >
              {activeTab === "school"
                ? `Class ${lvl}`
                : `Sem ${lvl}`}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Notes Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 py-20 text-center">
          <FileText size={48} className="mx-auto mb-4 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900">
            No notes found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col"
            >
              <div className="p-5 border-b bg-slate-50">
                <h3 className="font-semibold text-lg text-slate-900 line-clamp-2">
                  {note.title}
                </h3>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {note.subject}
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                    {activeTab === "school"
                      ? `Class ${note.classLevel}`
                      : `Semester ${note.classLevel}`}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1">
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {note.content}
                </p>

                {note.attachments?.length > 0 &&
                  note.attachments.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 border p-2.5 rounded-lg text-sm mb-2"
                    >
                      <File size={14} />
                      <span className="truncate flex-1">
                        {file.originalName}
                      </span>
                      <Download size={14} />
                    </a>
                  ))}
              </div>

              <div className="px-5 py-3 bg-slate-50 text-xs text-slate-500">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotes;