import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <p className="mb-4">Role: {user?.role}</p>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;