import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrain,
  FaRocket,
  FaUserPlus,
  FaArrowRight
} from "react-icons/fa";
import { 
  MdSpeed,
  MdSecurity
} from "react-icons/md";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength indicators
  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", met: formData.password.length >= 8 },
    { id: 2, text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { id: 3, text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { id: 4, text: "Contains number", met: /[0-9]/.test(formData.password) },
    { id: 5, text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordRequirements.filter(req => req.met).length < 4) {
      newErrors.password = "Password does not meet security requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      
      // Show success toast
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: 'Account created successfully! Welcome to KMRL AI Scheduler.',
          type: 'success'
        }
      }));
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Registration error:', error);
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: error.message || 'Registration failed. Please try again.',
          type: 'error'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const metCount = passwordRequirements.filter(req => req.met).length;
    if (metCount <= 2) return { strength: "Weak", color: "text-rose-400", width: "33%" };
    if (metCount <= 4) return { strength: "Good", color: "text-amber-400", width: "66%" };
    return { strength: "Strong", color: "text-emerald-400", width: "100%" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Toast Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2 max-w-sm"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-400 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Info */}
        <div className="text-center lg:text-left space-y-6 animate-fadeIn">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <FaTrain className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white">
                KMRL AI
              </h1>
              <p className="text-cyan-300 text-lg">Fleet Command Center</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Join the Future of Metro Operations
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Create your account to access intelligent fleet management, real-time analytics, and AI-powered optimization tools.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-gray-300">
              <FaRocket className="text-cyan-400 text-xl" />
              <span>AI-Powered Schedule Optimization</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MdSpeed className="text-emerald-400 text-xl" />
              <span>Real-time Fleet Monitoring</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FaShieldAlt className="text-amber-400 text-xl" />
              <span>Enterprise-grade Security</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MdSecurity className="text-purple-400 text-xl" />
              <span>Advanced Analytics Dashboard</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">25+</div>
              <div className="text-gray-400 text-sm">Trains Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">99.5%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-gray-400 text-sm">Monitoring</div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl animate-fadeIn delay-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                <FaUserPlus className="text-white text-xl" />
              </div>
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
            </div>
            <p className="text-gray-400">
              Join KMRL AI Scheduler and transform your fleet operations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center gap-2">
                <FaUser className="text-cyan-400" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                  errors.name ? 'border-rose-500' : 'border-gray-600 focus:border-cyan-500'
                } text-white placeholder-gray-400 focus:outline-none transition-colors`}
                required
              />
              {errors.name && (
                <p className="text-rose-400 text-sm flex items-center gap-2">
                  <FaExclamationTriangle />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center gap-2">
                <FaEnvelope className="text-cyan-400" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="you@kmrl.com"
                className={`w-full p-4 rounded-xl bg-gray-700/50 border ${
                  errors.email ? 'border-rose-500' : 'border-gray-600 focus:border-cyan-500'
                } text-white placeholder-gray-400 focus:outline-none transition-colors`}
                required
              />
              {errors.email && (
                <p className="text-rose-400 text-sm flex items-center gap-2">
                  <FaExclamationTriangle />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center gap-2">
                <FaLock className="text-cyan-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className={`w-full p-4 pr-12 rounded-xl bg-gray-700/50 border ${
                    errors.password ? 'border-rose-500' : 'border-gray-600 focus:border-cyan-500'
                  } text-white placeholder-gray-400 focus:outline-none transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2 mt-3 p-3 bg-gray-700/30 rounded-xl border border-gray-600/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Password strength</span>
                    <span className={passwordStrength.color}>{passwordStrength.strength}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        passwordStrength.strength === "Weak" ? "bg-rose-500" :
                        passwordStrength.strength === "Good" ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: passwordStrength.width }}
                    ></div>
                  </div>
                  
                  {/* Requirements List */}
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {passwordRequirements.map(req => (
                      <div key={req.id} className="flex items-center gap-2 text-xs">
                        {req.met ? (
                          <FaCheckCircle className="text-emerald-400" />
                        ) : (
                          <FaExclamationTriangle className="text-rose-400" />
                        )}
                        <span className={req.met ? "text-emerald-400" : "text-gray-400"}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-rose-400 text-sm flex items-center gap-2">
                  <FaExclamationTriangle />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-gray-300 font-semibold flex items-center gap-2">
                <FaLock className="text-cyan-400" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  className={`w-full p-4 pr-12 rounded-xl bg-gray-700/50 border ${
                    errors.confirmPassword ? 'border-rose-500' : 'border-gray-600 focus:border-cyan-500'
                  } text-white placeholder-gray-400 focus:outline-none transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-rose-400 text-sm flex items-center gap-2">
                  <FaExclamationTriangle />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Create Account
                  <FaArrowRight />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-700/50">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
            <div className="flex items-center gap-3 text-sm">
              <FaShieldAlt className="text-emerald-400 flex-shrink-0" />
              <p className="text-gray-400">
                Your data is secured with enterprise-grade encryption and privacy protection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-500 text-sm">
          🚇 KMRL AI Fleet Management v2.1.0 • Smart India Hackathon 2024
        </p>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}