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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-sky-50/40 to-indigo-100/60 p-3 sm:p-4 md:p-6 rounded-2xl border border-indigo-100">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          Academic Notes Library
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Structured notes for School & College students
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-indigo-100 p-1 rounded-xl w-full sm:w-fit overflow-x-auto">
        {["school", "college"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setLevel("all");
            }}
            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap min-h-[44px] ${
              activeTab === tab
                ? "bg-white shadow text-indigo-700"
                : "text-indigo-700 hover:text-indigo-900"
            }`}
          >
            {tab === "school" ? (
              <>
                <span className="sm:hidden">School</span>
                <span className="hidden sm:inline">School (Class 8–12)</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">College</span>
                <span className="hidden sm:inline">College (Semester 1–8)</span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Modern Search + Filter */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 justify-between">
        
        {/* Modern Search */}
        <div className="relative w-full lg:max-w-md group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-indigo-700"
          />
          <input
            type="text"
            placeholder="Search notes by title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-indigo-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none transition-all text-sm sm:text-base"
          />
        </div>

        {/* Level Filter Pills */}
        <div className="flex flex-wrap gap-2 overflow-x-auto w-full pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setLevel("all")}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-full border transition whitespace-nowrap min-h-[38px] ${
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
              className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-full border transition whitespace-nowrap min-h-[38px] ${
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

      <p className="text-xs sm:text-sm text-indigo-700 bg-indigo-100/70 border border-indigo-200 px-3 py-2 rounded-lg w-fit">
        Showing {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""}
      </p>

      {/* Error */}
      {error && (
        <div className="flex items-start sm:items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 sm:px-5 py-4 rounded-xl">
          <AlertCircle size={20} />
          <span className="text-sm sm:text-base">{error}</span>
        </div>
      )}

      {/* Notes Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-indigo-200 py-14 sm:py-20 text-center px-4">
          <FileText size={48} className="mx-auto mb-4 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-900">
            No notes found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl border border-indigo-100 shadow-sm md:hover:shadow-xl transition duration-300 flex flex-col overflow-hidden"
            >
              <div className="p-4 sm:p-5 border-b bg-indigo-50/60">
                <h3 className="font-semibold text-base sm:text-lg text-slate-900 line-clamp-2 break-words">
                  {note.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {note.subject}
                  </span>
                  <span className="bg-white text-slate-600 border border-indigo-100 px-3 py-1 rounded-full">
                    {activeTab === "school"
                      ? `Class ${note.classLevel}`
                      : `Semester ${note.classLevel}`}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 min-w-0">
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 break-words">
                  {note.content}
                </p>

                {note.attachments?.length > 0 &&
                  note.attachments.map((file, idx) => (
                    <a
                      key={idx}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 border border-indigo-100 p-2.5 rounded-lg text-xs sm:text-sm mb-2 min-h-[42px]"
                    >
                      <File size={14} className="shrink-0" />
                      <span className="truncate flex-1">
                        {file.originalName}
                      </span>
                      <Download size={14} className="shrink-0" />
                    </a>
                  ))}
              </div>

              <div className="px-4 sm:px-5 py-3 bg-indigo-50/50 text-xs text-slate-500">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default StudentNotes;