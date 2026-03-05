import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// ✅ Custom Hook (THIS WAS MISSING)
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (token && role) {
      setUser({ token, role, name, email });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;