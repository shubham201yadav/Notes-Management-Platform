import { useEffect, useState } from "react";
import { AlertCircle, Mail, UserPlus } from "lucide-react";
import API from "../../../services/api";

const SubAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term)
    );
  });

  const roleCounts = users.reduce(
    (acc, u) => {
      const role = u.role || "user";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    },
    { admin: 0, subadmin: 0, student: 0, user: 0 }
  );

  const getRoleBadge = (role) => {
    const base = "px-2.5 py-0.5 rounded-full text-xs font-medium capitalize";
    if (role === "admin") return `${base} bg-purple-100 text-purple-700`;
    if (role === "subadmin") return `${base} bg-blue-100 text-blue-700`;
    if (role === "student") return `${base} bg-emerald-100 text-emerald-700`;
    if (role === "user") return `${base} bg-cyan-100 text-cyan-700`;
    return `${base} bg-gray-100 text-gray-700`;
  };

  const openAddModal = () => {
    setAddError("");
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    if (addLoading) return;
    setShowAddModal(false);
    setAddError("");
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setAddError("");

    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      setAddError("All fields are required");
      return;
    }

    if (newUser.password.length < 6) {
      setAddError("Password must be at least 6 characters");
      return;
    }

    try {
      setAddLoading(true);
      await API.post("/users", {
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        password: newUser.password,
        role: newUser.role,
      });
      closeAddModal();
      fetchUsers();
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to create user");
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center animate-pulse text-orange-700">Loading users...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 rounded-2xl bg-gradient-to-b from-orange-50/70 to-amber-50/30 border border-orange-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3 md:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-900">Manage Users</h2>
          <p className="text-orange-700 mt-1 text-xs sm:text-sm md:text-base">
            View all users, add new users, and see each account role.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 md:py-2 rounded-lg transition-all shadow-sm text-sm md:text-base min-h-[44px] w-full md:w-auto"
        >
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6">
        <div className="bg-white/90 border border-orange-200 p-3 md:p-4 rounded-lg shadow">
          <p className="text-xs md:text-sm text-orange-700">Total users</p>
          <p className="text-lg md:text-xl font-semibold">{users.length}</p>
        </div>
        <div className="bg-white/90 border border-orange-200 p-3 md:p-4 rounded-lg shadow">
          <p className="text-xs md:text-sm text-orange-700">Admins</p>
          <p className="text-lg md:text-xl font-semibold">{roleCounts.admin}</p>
        </div>
        <div className="bg-white/90 border border-orange-200 p-3 md:p-4 rounded-lg shadow">
          <p className="text-xs md:text-sm text-orange-700">Subadmins</p>
          <p className="text-lg md:text-xl font-semibold">{roleCounts.subadmin}</p>
        </div>
        <div className="bg-white/90 border border-orange-200 p-3 md:p-4 rounded-lg shadow">
          <p className="text-xs md:text-sm text-orange-700">Users</p>
          <p className="text-lg md:text-xl font-semibold">{roleCounts.user}</p>
        </div>
        <div className="bg-white/90 border border-orange-200 p-3 md:p-4 rounded-lg shadow">
          <p className="text-xs md:text-sm text-orange-700">Students</p>
          <p className="text-lg md:text-xl font-semibold">{roleCounts.student}</p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 md:p-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm md:text-base min-h-[44px]"
        />
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white/95 border border-orange-200 rounded-2xl shadow-sm overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-orange-700">No users found in the database.</p>
          </div>
        ) : (
          <>
            <div className="md:hidden space-y-3 p-3">
              {filteredUsers.map((user) => (
                <div
                  key={user._id || user.id}
                  className="border border-orange-200 rounded-xl p-3 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-inner flex-shrink-0">
                      {(user.name || user.fullName || user.email || "U")[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-orange-900 text-sm truncate">
                        {user.name || user.fullName || "Unnamed User"}
                      </p>
                      <p className="text-xs text-orange-700 flex items-center gap-1 truncate">
                        <Mail size={12} className="flex-shrink-0" />
                        <span className="truncate">{user.email || "No email"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-orange-700 mb-1">Role</p>
                      <span className={getRoleBadge(user.role)}>{user.role || "user"}</span>
                    </div>

                    <div>
                      <p className="text-xs text-orange-700 mb-1">Status</p>
                      <span className="flex items-center gap-1.5 text-xs text-green-600">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Active
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-orange-50 border-b border-orange-200">
                    <th className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-orange-800">User Info</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-orange-800">Role</th>
                    <th className="px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-orange-800">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-orange-100">
                  {filteredUsers.map((user) => (
                    <tr key={user._id || user.id} className="hover:bg-orange-50/80 transition-colors group">
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold shadow-inner flex-shrink-0">
                            {(user.name || user.fullName || user.email || "U")[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-orange-900 text-sm md:text-base truncate">
                              {user.name || user.fullName || "Unnamed User"}
                            </div>
                            <div className="text-xs md:text-sm text-orange-700 flex items-center gap-1 truncate">
                              <Mail size={12} className="flex-shrink-0" />
                              <span className="truncate">{user.email || "No email"}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <span className={getRoleBadge(user.role)}>{user.role || "user"}</span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4">
                        <span className="flex items-center gap-1.5 text-xs md:text-sm text-green-600">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 p-3 sm:p-4 flex items-end sm:items-center justify-center">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-orange-200 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="px-4 sm:px-5 py-4 border-b border-orange-100">
              <h3 className="text-lg sm:text-xl font-semibold text-orange-900">Add New User</h3>
              <p className="text-xs sm:text-sm text-orange-700 mt-1">Enter name, email, password and role.</p>
            </div>

            <form onSubmit={handleCreateUser} className="p-4 sm:p-5 space-y-4">
              {addError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  <AlertCircle size={16} />
                  <span>{addError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-orange-900">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  className="w-full border border-orange-300 rounded-lg px-3 py-2.5 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-orange-900">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email"
                  className="w-full border border-orange-300 rounded-lg px-3 py-2.5 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-orange-900">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Minimum 6 characters"
                  className="w-full border border-orange-300 rounded-lg px-3 py-2.5 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-orange-900">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full border border-orange-300 rounded-lg px-3 py-2.5 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="user">user</option>
                  <option value="student">student</option>
                  <option value="subadmin">subadmin</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={addLoading}
                  className="w-full rounded-lg border border-orange-300 text-orange-800 px-4 py-2.5 min-h-[44px] hover:bg-orange-100 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="w-full rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-4 py-2.5 min-h-[44px] font-medium"
                >
                  {addLoading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdminUsers;
