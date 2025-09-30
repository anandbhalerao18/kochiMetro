import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaSignInAlt, 
  FaTrain, 
  FaShieldAlt, 
  FaEye, 
  FaEyeSlash,
  FaChartLine,
  FaCogs,
  FaUserCog
} from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-400 rounded-full blur-lg"></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left Side - Branding & Information */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-gray-700 shadow-2xl">
            {/* KMRL Logo & Title */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="relative">
                <FaTrain className="text-cyan-400 text-5xl" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  Kochi Metro Rail
                </h1>
                <p className="text-cyan-300 text-sm">Limited</p>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              AI-Driven Train Induction
              <span className="block text-cyan-400">Planning System</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Advanced fleet management platform optimizing train deployment, 
              maintenance scheduling, and operational efficiency for Kochi Metro's 
              growing fleet.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-gray-300">
                <FaChartLine className="text-green-400 text-xl" />
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaCogs className="text-blue-400 text-xl" />
                <span>Maintenance AI</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FaShieldAlt className="text-purple-400 text-xl" />
                <span>Secure Access</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MdLocationCity className="text-orange-400 text-xl" />
                <span>Multi-depot Support</span>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-4 border border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-cyan-400 font-bold text-xl">25</div>
                  <div className="text-gray-400 text-xs">Active Trainsets</div>
                </div>
                <div>
                  <div className="text-green-400 font-bold text-xl">99.5%</div>
                  <div className="text-gray-400 text-xs">Punctuality</div>
                </div>
                <div>
                  <div className="text-blue-400 font-bold text-xl">40</div>
                  <div className="text-gray-400 text-xs">By 2027</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-700 transform hover:scale-[1.02] transition-all duration-300">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <FaUserCog className="text-cyan-400 text-4xl" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Operator Login
              </h2>
              <p className="text-gray-400">
                Access the train induction planning system
              </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  KMRL Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full px-4 py-3 pl-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@kochimetro.org"
                    required
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    @
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-sm">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In to Dashboard
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>

              {/* Additional Links */}
              <div className="text-center space-y-3">
                <Link
                  to="/register"
                  className="block w-full py-2 px-4 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-medium rounded-lg transition-all duration-300"
                >
                  Request New Account
                </Link>
                <p className="text-xs text-gray-500">
                  Contact system administrator for access permissions
                </p>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>v2.1.0 • Secure Access</span>
                <span>KMRL Operations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-500 text-sm">
          🚇 Powered by{" "}
          <span className="text-cyan-400 font-semibold">
            AI Induction Scheduler
          </span>{" "}
          • Ensuring 99.5% Operational Punctuality
        </p>
      </div>
    </div>
  );
}