// src/context/AuthContext.jsx
import React from "react";

// 1️⃣ Create context
const AuthContext = React.createContext(null);

// 2️⃣ Custom hook for easy access
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 3️⃣ Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    try {
      const storedUser = localStorage.getItem("mf_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  // Sync user state to localStorage
  React.useEffect(() => {
    if (user) localStorage.setItem("mf_user", JSON.stringify(user));
    else localStorage.removeItem("mf_user");
  }, [user]);

  // Simulate login
  const login = async (email, password) => {
    const fakeUser = { id: 1, name: "Supervisor", email };
    setUser(fakeUser);
    return true;
  };

  // Logout
  const logout = () => setUser(null);

  // Simulate registration
  const register = async (name, email, password) => {
    const newUser = { id: Date.now(), name, email };
    setUser(newUser);
    return true;
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
