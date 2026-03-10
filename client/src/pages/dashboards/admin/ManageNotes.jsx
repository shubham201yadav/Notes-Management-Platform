import { useEffect, useRef, useState } from "react";
import API from "../../../services/api";
import {
  Trash2,
  Plus,
  FileText,
  AlertCircle,
  Search,
  Download,
  File,
  X,
  Upload,
  Edit2,
} from "lucide-react";

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState("school");
  const [filterLevel, setFilterLevel] = useState("all");

  // editing state
  const [editingNote, setEditingNote] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: "",
    category: "",
    classLevel: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const isFirstLoad = useRef(true);

  /* ================= FETCH NOTES ================= */
  const fetchNotes = async (params = {}, options = {}) => {
    const { isInitial = false } = options;
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setIsFetching(true);
      }

      const res = await API.get("/notes", { params });
      setNotes(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes");
    } finally {
      if (isInitial) {
        setLoading(false);
      } else {
        setIsFetching(false);
      }
    }
  };

  // when filters/search change, reload from server
  useEffect(() => {
    const qp = { category: activeTab };
    if (filterLevel && filterLevel !== "all") qp.classLevel = filterLevel;
    if (searchTerm) qp.search = searchTerm;

    fetchNotes(qp, { isInitial: isFirstLoad.current });
    if (isFirstLoad.current) isFirstLoad.current = false;
  }, [activeTab, filterLevel, searchTerm]);


  /* ================= STATS ================= */
  const totalNotes = notes.length;
  const uniqueSubjects = new Set(notes.map((n) => n.subject)).size;
  const totalAttachments = notes.reduce(
    (sum, n) => sum + (n.attachments?.length || 0),
    0
  );

  /* ================= FILTER ================= */
  // no client-side category filtering; data is fetched from server

  const levels =
    activeTab === "school"
      ? ["8", "9", "10", "11", "12"]
      : ["1", "2", "3", "4", "5", "6", "7", "8"];
  
  // if current tab has no notes, maybe switch automatically (optional enhancement)
  // this can be handled in effect after notes load if desired

  /* ================= FORM HANDLERS ================= */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    const invalidFile = files.find((file) => !allowedTypes.includes(file.type));

    if (invalidFile) {
      alert("Only PDF and image files (JPG, PNG, WEBP) are allowed.");
      return;
    }

    setSelectedFiles(files);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitNote = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.subject ||
      !formData.category ||
      !formData.classLevel
    ) {
      alert("Topic, Subject, Category and Class/Level are required");
      return;
    }

    const hasExistingAttachments =
      editingNote && Array.isArray(editingNote.attachments) && editingNote.attachments.length > 0;

    if (selectedFiles.length === 0 && !hasExistingAttachments) {
      alert("Please upload at least one study material file (PDF/Image)");
      return;
    }

    try {
      setIsSubmitting(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) =>
        data.append(key, formData[key])
      );

      selectedFiles.forEach((file) => {
        data.append("files", file);
      });

      let res;
      if (editingNote) {
        res = await API.put(`/notes/${editingNote._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setNotes((prev) =>
          prev.map((n) => (n._id === res.data._id ? res.data : n))
        );
      } else {
        res = await API.post("/notes", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setNotes((prev) => [...prev, res.data]);
      }

      // reset form state
      setFormData({
        title: "",
        subject: "",
        content: "",
        category: "",
        classLevel: "",
      });
      setSelectedFiles([]);
      setEditingNote(null);
      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.message ||
        (editingNote ? "Failed to update note" : "Failed to create note"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note permanently?")) return;

    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete note");
    }
  };

  const startEdit = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title || "",
      subject: note.subject || "",
      content: note.content || "",
      category: note.category || "",
      classLevel: note.classLevel || "",
    });
    setSelectedFiles([]);
    setShowForm(true);
  };

  const handleDownloadAttachment = async (noteId, index, fileName) => {
    try {
      const response = await API.get(
        `/notes/${noteId}/attachments/${index}/download`,
        { responseType: "blob" }
      );

      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName || `attachment-${index + 1}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Failed to download file");
    }
  };

  if (loading)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-yellow-50/40 to-amber-100/60 p-4 md:p-6 lg:p-8 rounded-2xl border border-amber-100">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900">
              Study Materials Management
            </h1>
            <p className="text-amber-700 mt-1 text-sm md:text-base">
              Organize School & College study materials
            </p>
          </div>

          <button
            onClick={() => {
              setEditingNote(null);
              setFormData({
                title: "",
                subject: "",
                content: "",
                category: "",
                classLevel: "",
              });
              setSelectedFiles([]);
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:shadow-lg hover:scale-105 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-medium transition-all duration-300 w-full lg:w-auto min-h-[44px]"
          >
            <Plus size={20} />
            Add Material
          </button>
        </div>

        {/* TABS */}
        <div className="flex bg-amber-100 p-1 rounded-xl w-full md:w-fit mb-6 overflow-x-auto">
          {["school", "college"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setFilterLevel("all");
              }}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition whitespace-nowrap ${
                activeTab === tab
                    ? "bg-white shadow text-amber-700"
                    : "text-amber-700 hover:text-amber-900"
              }`}
            >
              {tab === "school"
                ? "School (8–12)"
                : "College (1–8)"}
            </button>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
          <StatCard title="Total Materials" value={totalNotes} icon={<FileText />} />
          <StatCard title="Subjects" value={uniqueSubjects} icon={<Search />} />
          <StatCard title="Attachments" value={totalAttachments} icon={<Download />} />
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-between mb-6">
          <div className="relative w-full lg:max-w-md group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 group-focus-within:text-amber-700"
            />
            <input
              type="text"
              placeholder="Search study materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm md:text-base rounded-full border border-amber-300 shadow-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>


          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            <FilterButton
              active={filterLevel === "all"}
              onClick={() => setFilterLevel("all")}
              label="All"
            />
            {levels.map((lvl) => (
              <FilterButton
                key={lvl}
                active={filterLevel === lvl}
                onClick={() => setFilterLevel(lvl)}
                label={
                  activeTab === "school"
                    ? `Class ${lvl}`
                    : `Sem ${lvl}`
                }
              />
            ))}
          </div>
        </div>

        {isFetching && (
          <div className="mb-4 text-xs md:text-sm text-amber-700 bg-amber-100/70 border border-amber-200 px-3 py-2 rounded-lg">
            Updating materials...
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* STUDY MATERIALS GRID */}
        {notes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-opacity ${isFetching ? "opacity-70" : "opacity-100"}`}>
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onEdit={startEdit}
                onDownload={handleDownloadAttachment}
              />
            ))}
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {showForm && (
        <CreateNoteModal
          formData={formData}
          setFormData={setFormData}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          handleFileChange={handleFileChange}
          removeSelectedFile={removeSelectedFile}
          handleSubmit={handleSubmitNote}
          isSubmitting={isSubmitting}
          onClose={() => {
            setShowForm(false);
            setEditingNote(null);
          }}
          editing={!!editingNote}
        />
      )}
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-amber-200 flex justify-between items-center">
    <div>
      <p className="text-amber-700 text-xs md:text-sm font-medium">{title}</p>
      <p className="text-2xl md:text-3xl font-bold text-amber-900 mt-1">{value}</p>
    </div>
    <div className="p-2 md:p-3 bg-amber-100 rounded-lg text-amber-700">
      {icon}
    </div>
  </div>
);

const FilterButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-full border transition whitespace-nowrap min-h-[36px] ${
      active
        ? "bg-amber-500 text-white border-amber-500"
        : "bg-white border-amber-300 text-amber-800 hover:border-amber-500 hover:text-amber-900"
    }`}
  >
    {label}
  </button>
);

const EmptyState = () => (
  <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 py-20 text-center">
    <FileText size={48} className="mx-auto mb-4 text-slate-400" />
    <h3 className="text-xl font-semibold text-slate-900">
      No study materials found
    </h3>
  </div>
);

const NoteCard = ({ note, onDelete, onEdit, onDownload }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden">
    <div className="p-4 md:p-5 border-b bg-slate-50 flex justify-between items-start md:items-center gap-2">
      <h3 className="font-semibold text-base md:text-lg flex-1 break-words">{note.title}</h3>
      <div className="flex gap-2 flex-shrink-0">
        <button onClick={() => onEdit(note)} className="text-blue-500 hover:text-blue-600 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center">
          <Edit2 size={18} />
        </button>
        <button onClick={() => onDelete(note._id)} className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center">
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </div>
    <div className="p-4 md:p-5 flex-1">
      <p className="text-sm text-slate-600 mb-3">{note.content}</p>
      <div className="flex gap-2 flex-wrap mb-3">
        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
          {note.subject}
        </span>
        <span className="text-xs bg-yellow-100 text-amber-700 px-2 py-1 rounded-full">
          {note.classLevel || "-"}
        </span>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          {note.category ? note.category.charAt(0).toUpperCase() + note.category.slice(1) : "N/A"}
        </span>
      </div>
      {note.attachments && note.attachments.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs font-medium text-slate-600 mb-2">
            Attachments ({note.attachments.length})
          </p>
          <div className="space-y-2">
            {note.attachments.map((file, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onDownload(note._id, idx, file.originalName)}
                className="w-full min-w-0 flex items-center justify-between gap-2 text-xs bg-amber-50 hover:bg-yellow-50 border border-amber-200 p-2.5 md:p-2 rounded-md min-h-[44px]"
              >
                <span className="min-w-0 flex-1 truncate text-left">{file.originalName || "Attachment"}</span>
                <Download size={13} className="flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const CreateNoteModal = ({
  formData,
  setFormData,
  selectedFiles,
  handleFileChange,
  removeSelectedFile,
  handleSubmit,
  isSubmitting,
  onClose,
  editing = false,
}) => {
  return (
    <div
      className="fixed inset-0 bg-amber-900/25 backdrop-blur-sm flex items-center justify-center p-3 md:p-4 z-50 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 max-h-[95vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            {editing ? "Edit Study Material" : "Create New Study Material"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-5">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Topic *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter topic"
              className="w-full px-4 py-2.5 md:py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm md:text-base min-h-[44px]"
              required
            />
          </div>

          {/* SUBJECT */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="e.g., Mathematics, English"
              className="w-full px-4 py-2.5 md:py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm md:text-base min-h-[44px]"
              required
            />
          </div>

          {/* CATEGORY & CLASS LEVEL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2.5 md:py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm md:text-base min-h-[44px]"
                required
              >
                <option value="">Select Category</option>
                <option value="school">School</option>
                <option value="college">College</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Class/Level *
              </label>
              <select
                name="classLevel"
                value={formData.classLevel}
                onChange={(e) =>
                  setFormData({ ...formData, classLevel: e.target.value })
                }
                className="w-full px-4 py-2.5 md:py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm md:text-base min-h-[44px]"
                required
              >
                <option value="">Select Class/Level</option>
                {formData.category === "school"
                  ? ["8", "9", "10", "11", "12"].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Class {lvl}
                      </option>
                    ))
                  : ["1", "2", "3", "4", "5", "6", "7", "8"].map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Semester {lvl}
                      </option>
                    ))}
              </select>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Content (Optional)
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Enter note content..."
              rows="5"
              className="w-full px-4 py-2.5 md:py-2.5 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none resize-none text-sm md:text-base"
            />
          </div>

          {/* FILE UPLOAD */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Study Material Files (PDF/Image) *
            </label>
            <label className="flex items-center gap-3 px-4 py-3 md:py-3 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer hover:border-amber-500 transition min-h-[56px]">
              <Upload size={20} className="text-slate-400 flex-shrink-0" />
              <span className="text-slate-600 text-sm md:text-base">
                Choose files or drag & drop
              </span>
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* SELECTED FILES */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-slate-700">
                  Selected files ({selectedFiles.length}):
                </p>
                {selectedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200 gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <File size={16} className="text-slate-400 flex-shrink-0" />
                      <span className="text-sm text-slate-700 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(idx)}
                      className="p-2 hover:bg-red-100 rounded transition flex-shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    >
                      <X size={16} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="flex flex-col md:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:shadow-lg text-white py-3 md:py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base min-h-[48px]"
            >
              {isSubmitting
                ? editing
                  ? "Updating..."
                  : "Creating..."
                : editing
                ? "Update Material"
                : "Create Material"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-amber-300 text-amber-900 py-3 md:py-3 rounded-lg font-semibold hover:bg-amber-50 transition text-sm md:text-base min-h-[48px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageNotes;