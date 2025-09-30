import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Timetable from "./pages/Timetable";
import TrainDetails from "./pages/TrainDetails";
import Notifications from "./pages/Notifications";
import Simulation from "./pages/Simulation";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home"; // Optional welcome/home page

/**
 * App.jsx - Main application shell (navbar-only layout)
 * Features:
 * - Navbar contains all navigation links
 * - Responsive design
 * - Professional footer
 * - Smooth transitions
 */

export default function App() {
  // Global color palette
  const colors = {
    navbarBg: "#1f2937",  // Navbar background
    mainBg: "#111827",    // Main content background
    accent: "#00d8ff",    // Highlight/links
    text: "#f5f5f5",      // Primary text
    muted: "#aaa",         // Muted text
    shadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // Subtle shadow for navbar
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 shadow-sm">
        <Navbar colors={colors} />
      </header>

      {/* Main content */}
      <main
        className="flex-1 overflow-auto p-4 md:p-6 transition-all duration-300"
        style={{ backgroundColor: colors.mainBg }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login colors={colors} />} />
          <Route path="/register" element={<Register colors={colors} />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home colors={colors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard colors={colors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/timetable"
            element={
              <ProtectedRoute>
                <Timetable colors={colors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/t/:tId"
            element={
              <ProtectedRoute>
                <TrainDetails colors={colors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications colors={colors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/simulation"
            element={
              <ProtectedRoute>
                <Simulation colors={colors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings colors={colors} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile colors={colors} />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound colors={colors} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer
        className="w-full p-4 md:p-6 text-center text-sm text-gray-400 border-t border-gray-800 flex-shrink-0"
        style={{ backgroundColor: colors.mainBg }}
      >
        &copy; {new Date().getFullYear()} Metro Induction Scheduler • Designed with 💙
      </footer>
    </div>
  );
}
