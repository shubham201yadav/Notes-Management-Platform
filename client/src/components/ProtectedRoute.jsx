import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, authReady } = useContext(AuthContext);
  const token = user?.token || localStorage.getItem("token");
  const role = user?.role || localStorage.getItem("role");

  if (!authReady) {
    return null;
  }

  if (!token || !role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;