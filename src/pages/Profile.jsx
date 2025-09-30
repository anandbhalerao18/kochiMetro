import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaSave, 
  FaEdit,
  FaTimes,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaTrain,
  FaCogs,
  FaChartLine,
  FaBell,
  FaUserCog,
  FaKey,
  FaDatabase,
  FaCloud,
  FaMobileAlt
} from "react-icons/fa";
import { 
  MdSpeed,
  MdAssessment,
  MdSecurity
} from "react-icons/md";

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    phone: "",
    role: ""
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        department: user.department || "Operations",
        phone: user.phone || "",
        role: user.role || "Fleet Manager"
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setEditMode(false);
      
      // Show success toast
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: 'Profile updated successfully!',
          type: 'success'
        }
      }));
    } catch (error) {
      console.error('Profile update error:', error);
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: 'Failed to update profile. Please try again.',
          type: 'error'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      department: user.department || "Operations",
      phone: user.phone || "",
      role: user.role || "Fleet Manager"
    });
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // User statistics (mock data)
  const userStats = {
    sessions: 47,
    optimizations: 128,
    uptime: "99.8%",
    joined: "2024-01-15"
  };

  // Quick actions
  const quickActions = [
    { label: "Change Password", icon: FaKey, color: "text-blue-400" },
    { label: "Notification Settings", icon: FaBell, color: "text-amber-400" },
    { label: "Privacy Controls", icon: FaShieldAlt, color: "text-emerald-400" },
    { label: "Data Export", icon: FaDatabase, color: "text-purple-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-6">
      {/* Toast Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2 max-w-sm"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <FaUserCog className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                User Profile
              </h1>
              <p className="text-cyan-300 text-lg">
                Manage your account and preferences
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {editMode ? (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl border border-gray-600 transition-all duration-300 font-semibold"
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FaSave />
                  )}
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300"
                >
                  <FaEdit />
                  Edit Profile
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 transition-all duration-300"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - User Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center">
              <div className="flex justify-center mb-4">
                <FaUserCircle className="text-cyan-400 text-8xl" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{user?.name || "User"}</h2>
              <p className="text-cyan-400 font-semibold mb-1">{user?.role || "Fleet Manager"}</p>
              <p className="text-gray-400 text-sm mb-4">{user?.department || "Operations"}</p>
              
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaEnvelope className="text-cyan-400" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaCalendarAlt className="text-emerald-400" />
                  <span>Joined {new Date(userStats.joined).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaShieldAlt className="text-amber-400" />
                  <span>Verified Account</span>
                </div>
              </div>
            </div>

            {/* User Stats */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Activity Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sessions</span>
                  <span className="text-cyan-400 font-semibold">{userStats.sessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Optimizations</span>
                  <span className="text-emerald-400 font-semibold">{userStats.optimizations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">System Uptime</span>
                  <span className="text-amber-400 font-semibold">{userStats.uptime}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-300 text-left"
                    >
                      <Icon className={`text-lg ${action.color}`} />
                      <span className="font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: "profile", label: "Profile Details", icon: FaUserCog },
                  { id: "preferences", label: "Preferences", icon: FaCogs },
                  { id: "security", label: "Security", icon: MdSecurity },
                  { id: "activity", label: "Activity", icon: MdAssessment }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                        : "bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600 border border-gray-600"
                    }`}
                  >
                    <tab.icon className="text-lg" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Profile Details Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-gray-300 font-semibold flex items-center gap-2">
                        <FaUserCircle className="text-cyan-400" />
                        Full Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 focus:border-cyan-500 text-white placeholder-gray-400 focus:outline-none transition-colors"
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-600 text-white">
                          {user?.name || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-gray-300 font-semibold flex items-center gap-2">
                        <FaEnvelope className="text-cyan-400" />
                        Email Address
                      </label>
                      <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-600 text-white flex items-center justify-between">
                        <span>{user?.email}</span>
                        <span className="text-emerald-400 text-sm bg-emerald-500/20 px-2 py-1 rounded-lg">
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                      <label className="text-gray-300 font-semibold flex items-center gap-2">
                        <FaTrain className="text-cyan-400" />
                        Department
                      </label>
                      {editMode ? (
                        <select
                          value={formData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 focus:border-cyan-500 text-white focus:outline-none transition-colors"
                        >
                          <option value="Operations">Operations</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Planning">Planning</option>
                          <option value="Management">Management</option>
                          <option value="IT">IT Support</option>
                        </select>
                      ) : (
                        <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-600 text-white">
                          {user?.department || "Operations"}
                        </div>
                      )}
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label className="text-gray-300 font-semibold flex items-center gap-2">
                        <FaUserCog className="text-cyan-400" />
                        Role
                      </label>
                      {editMode ? (
                        <select
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 focus:border-cyan-500 text-white focus:outline-none transition-colors"
                        >
                          <option value="Fleet Manager">Fleet Manager</option>
                          <option value="Operations Manager">Operations Manager</option>
                          <option value="Maintenance Head">Maintenance Head</option>
                          <option value="System Admin">System Admin</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                      ) : (
                        <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-600 text-white">
                          {user?.role || "Fleet Manager"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <FaInfoCircle className="text-cyan-400" />
                      Account Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Member Since</span>
                        <span className="text-cyan-400">{new Date(userStats.joined).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Login</span>
                        <span className="text-emerald-400">Just now</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Account Status</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          Active
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Two-Factor Auth</span>
                        <span className="text-amber-400">Disabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div className="animate-fadeIn">
                  <div className="text-center py-12 text-gray-400">
                    <FaCogs className="text-4xl text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Preferences Settings</h3>
                    <p>Customize your application preferences and settings</p>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="animate-fadeIn">
                  <div className="text-center py-12 text-gray-400">
                    <MdSecurity className="text-4xl text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Security Settings</h3>
                    <p>Manage your account security and privacy settings</p>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === "activity" && (
                <div className="animate-fadeIn">
                  <div className="text-center py-12 text-gray-400">
                    <MdAssessment className="text-4xl text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Activity Log</h3>
                    <p>View your recent activity and system interactions</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="mt-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Profile {editMode ? 'Edit Mode' : 'View Mode'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaCloud className="text-cyan-400" />
                Changes auto-saved to cloud
              </span>
            </div>
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <FaTrain className="text-cyan-400" />
              🚇 KMRL AI Fleet Management • Profile v2.1.0
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('showToast', function(e) {
              const { message, type } = e.detail;
              const container = document.getElementById('toast-container');
              const toast = document.createElement('div');
              const bgColor = type === 'success' 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                : 'bg-gradient-to-r from-rose-500 to-rose-600';
              
              toast.className = \`\${bgColor} text-white p-4 rounded-xl shadow-lg font-semibold transform transition-all duration-300 translate-x-full backdrop-blur-sm border border-white/20\`;
              toast.textContent = message;
              
              container.appendChild(toast);
              
              setTimeout(() => {
                toast.classList.remove('translate-x-full');
                toast.classList.add('translate-x-0');
              }, 100);
              
              setTimeout(() => {
                toast.classList.remove('translate-x-0');
                toast.classList.add('translate-x-full');
                setTimeout(() => {
                  container.removeChild(toast);
                }, 300);
              }, 4000);
            });
          `
        }}
      />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}