import React, { useState, useEffect } from "react";
import { 
  FaBell, 
  FaCogs, 
  FaShieldAlt, 
  FaPalette, 
  FaInfoCircle,
  FaTrain,
  FaTools,
  FaRobot,
  FaSync,
  FaSave,
  FaUndo,
  FaEye,
  FaEyeSlash,
  FaDatabase,
  FaNetworkWired,
  FaChartLine,
  FaUserCog,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCloud,
  FaMobileAlt
} from "react-icons/fa";
import { 
  MdSpeed,
  MdAssessment,
  MdSecurity
} from "react-icons/md";

export default function Settings() {
  // Settings state with localStorage persistence
  const [settings, setSettings] = useState({
    notifications: true,
    serviceCount: 6,
    theme: "dark",
    securityAlerts: true,
    autoUpdate: false,
    optimizationLevel: "balanced",
    maintenanceAlerts: true,
    dataRetention: 30,
    realTimeUpdates: true,
    performanceMetrics: true,
    backupFrequency: "weekly",
    twoFactorAuth: false,
    privacyMode: false,
    aiAssistance: true,
    defaultDepot: "muttom",
    language: "english"
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [activeCategory, setActiveCategory] = useState("general");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('kmrl-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Detect unsaved changes
  useEffect(() => {
    const savedSettings = localStorage.getItem('kmrl-settings');
    if (savedSettings) {
      const parsedSaved = JSON.parse(savedSettings);
      setUnsavedChanges(JSON.stringify(parsedSaved) !== JSON.stringify(settings));
    } else {
      setUnsavedChanges(true);
    }
  }, [settings]);

  // Handle setting changes
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('kmrl-settings', JSON.stringify(settings));
    setUnsavedChanges(false);
    
    // Show success feedback
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: {
        message: 'Settings saved successfully!',
        type: 'success'
      }
    }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    const defaults = {
      notifications: true,
      serviceCount: 6,
      theme: "dark",
      securityAlerts: true,
      autoUpdate: false,
      optimizationLevel: "balanced",
      maintenanceAlerts: true,
      dataRetention: 30,
      realTimeUpdates: true,
      performanceMetrics: true,
      backupFrequency: "weekly",
      twoFactorAuth: false,
      privacyMode: false,
      aiAssistance: true,
      defaultDepot: "muttom",
      language: "english"
    };
    setSettings(defaults);
    setShowResetConfirm(false);
    
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: {
        message: 'Settings reset to defaults!',
        type: 'info'
      }
    }));
  };

  // Settings categories
  const categories = [
    { id: "general", name: "General", icon: FaCogs, color: "text-cyan-400" },
    { id: "optimization", name: "AI Optimization", icon: FaRobot, color: "text-purple-400" },
    { id: "security", name: "Security", icon: FaShieldAlt, color: "text-emerald-400" },
    { id: "performance", name: "Performance", icon: MdSpeed, color: "text-amber-400" },
    { id: "privacy", name: "Privacy", icon: FaEye, color: "text-blue-400" }
  ];

  // Render setting controls based on type
  const renderSettingControl = (setting) => {
    switch (setting.type) {
      case "toggle":
        return (
          <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600">
            <div>
              <div className="text-white font-semibold">{setting.label}</div>
              <div className="text-gray-400 text-sm mt-1">{setting.description}</div>
            </div>
            <button
              onClick={() => handleSettingChange(setting.key, !settings[setting.key])}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings[setting.key] 
                  ? 'bg-cyan-500' 
                  : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        );

      case "select":
        return (
          <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600">
            <label className="block text-white font-semibold mb-2">{setting.label}</label>
            <div className="text-gray-400 text-sm mb-3">{setting.description}</div>
            <select
              value={settings[setting.key]}
              onChange={(e) => handleSettingChange(setting.key, e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {setting.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "number":
        return (
          <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600">
            <label className="block text-white font-semibold mb-2">{setting.label}</label>
            <div className="text-gray-400 text-sm mb-3">{setting.description}</div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={settings[setting.key]}
                onChange={(e) => handleSettingChange(setting.key, parseInt(e.target.value))}
                min={setting.min}
                max={setting.max}
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <div className="text-cyan-400 font-semibold text-sm">
                {setting.unit || ''}
              </div>
            </div>
          </div>
        );

      case "radio":
        return (
          <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600">
            <label className="block text-white font-semibold mb-2">{setting.label}</label>
            <div className="text-gray-400 text-sm mb-3">{setting.description}</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {setting.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSettingChange(setting.key, option.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-left ${
                    settings[setting.key] === option.value
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      : 'bg-gray-700 border-gray-600 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <div className="font-semibold text-sm">{option.label}</div>
                  <div className="text-xs mt-1 opacity-75">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Settings configuration by category
  const settingsConfig = {
    general: [
      {
        key: "notifications",
        label: "Push Notifications",
        description: "Receive real-time alerts and system notifications",
        type: "toggle",
        icon: FaBell
      },
      {
        key: "theme",
        label: "Interface Theme",
        description: "Choose your preferred visual theme",
        type: "select",
        options: [
          { value: "dark", label: "Dark Theme" },
          { value: "light", label: "Light Theme" },
          { value: "auto", label: "System Default" }
        ]
      },
      {
        key: "language",
        label: "Language",
        description: "Interface language preference",
        type: "select",
        options: [
          { value: "english", label: "English" },
          { value: "hindi", label: "Hindi" },
          { value: "malayalam", label: "Malayalam" }
        ]
      },
      {
        key: "autoUpdate",
        label: "Auto Update",
        description: "Automatically download and install updates",
        type: "toggle",
        icon: FaSync
      }
    ],

    optimization: [
      {
        key: "serviceCount",
        label: "Default Service Count",
        description: "Number of trains to optimize in AI scheduler",
        type: "number",
        min: 1,
        max: 12,
        unit: "trains"
      },
      {
        key: "optimizationLevel",
        label: "Optimization Intensity",
        description: "Balance between performance and resource usage",
        type: "radio",
        options: [
          { 
            value: "conservative", 
            label: "Conservative", 
            description: "Light on resources" 
          },
          { 
            value: "balanced", 
            label: "Balanced", 
            description: "Recommended" 
          },
          { 
            value: "aggressive", 
            label: "Aggressive", 
            description: "Maximum performance" 
          }
        ]
      },
      {
        key: "aiAssistance",
        label: "AI Assistance",
        description: "Enable smart suggestions and automated optimizations",
        type: "toggle",
        icon: FaRobot
      },
      {
        key: "defaultDepot",
        label: "Default Depot",
        description: "Primary stabling location for operations",
        type: "select",
        options: [
          { value: "muttom", label: "Muttom Depot" },
          { value: "vytilla", label: "Vytilla Station" },
          { value: "mahatma", label: "Mahatma Gandhi Station" }
        ]
      }
    ],

    security: [
      {
        key: "securityAlerts",
        label: "Security Alerts",
        description: "Receive notifications for suspicious activities",
        type: "toggle",
        icon: FaShieldAlt
      },
      {
        key: "twoFactorAuth",
        label: "Two-Factor Authentication",
        description: "Add an extra layer of security to your account",
        type: "toggle",
        icon: MdSecurity
      },
      {
        key: "maintenanceAlerts",
        label: "Maintenance Alerts",
        description: "Get notified about scheduled maintenance windows",
        type: "toggle",
        icon: FaTools
      }
    ],

    performance: [
      {
        key: "realTimeUpdates",
        label: "Real-time Updates",
        description: "Enable live data streaming and instant updates",
        type: "toggle",
        icon: FaNetworkWired
      },
      {
        key: "performanceMetrics",
        label: "Performance Metrics",
        description: "Collect and display system performance data",
        type: "toggle",
        icon: FaChartLine
      },
      {
        key: "dataRetention",
        label: "Data Retention Period",
        description: "How long to keep historical data and logs",
        type: "select",
        options: [
          { value: 7, label: "1 Week" },
          { value: 30, label: "1 Month" },
          { value: 90, label: "3 Months" },
          { value: 365, label: "1 Year" }
        ]
      },
      {
        key: "backupFrequency",
        label: "Backup Frequency",
        description: "How often to create system backups",
        type: "select",
        options: [
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" }
        ]
      }
    ],

    privacy: [
      {
        key: "privacyMode",
        label: "Privacy Mode",
        description: "Limit data collection and analytics",
        type: "toggle",
        icon: FaEyeSlash
      },
      {
        key: "dataRetention",
        label: "Data Retention",
        description: "Automatic deletion of old data",
        type: "select",
        options: [
          { value: 7, label: "1 Week" },
          { value: 30, label: "1 Month" },
          { value: 90, label: "3 Months" }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-6">
      {/* Toast Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2 max-w-sm"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <FaUserCog className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                System Settings
              </h1>
              <p className="text-cyan-300 text-lg">
                Configure your KMRL AI Scheduler preferences
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl border border-gray-600 transition-all duration-300 font-semibold"
            >
              <FaUndo />
              Reset Defaults
            </button>
            
            <button
              onClick={saveSettings}
              disabled={!unsavedChanges}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 ${
                        activeCategory === category.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400"
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon className={`text-lg ${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* System Info */}
              <div className="mt-8 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                <h4 className="text-white font-semibold mb-3">System Info</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version</span>
                    <span className="text-cyan-400">v2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-emerald-400">Just now</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage</span>
                    <span className="text-amber-400">1.2GB / 5GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                {categories.find(cat => cat.id === activeCategory)?.icon && (
                  React.createElement(
                    categories.find(cat => cat.id === activeCategory).icon,
                    { 
                      className: `text-2xl ${
                        categories.find(cat => cat.id === activeCategory).color
                      }` 
                    }
                  )
                )}
                <h2 className="text-2xl font-bold text-white">
                  {categories.find(cat => cat.id === activeCategory)?.name} Settings
                </h2>
              </div>

              <div className="space-y-6">
                {settingsConfig[activeCategory]?.map((setting, index) => (
                  <div key={setting.key} className="animate-fadeIn">
                    {renderSettingControl(setting)}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 text-left group">
                  <FaCloud className="text-blue-400 text-xl mb-2" />
                  <div className="text-white font-semibold">Cloud Backup</div>
                  <div className="text-gray-400 text-sm">Last backup: 2 hours ago</div>
                </button>
                
                <button className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 text-left group">
                  <FaMobileAlt className="text-purple-400 text-xl mb-2" />
                  <div className="text-white font-semibold">Mobile Sync</div>
                  <div className="text-gray-400 text-sm">Sync with mobile app</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="mt-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                All systems operational
              </span>
              <span>•</span>
              <span>{unsavedChanges ? 'Unsaved changes' : 'All changes saved'}</span>
            </div>
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <FaTrain className="text-cyan-400" />
              🚇 KMRL AI Fleet Management • Settings v2.1.0
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <FaExclamationTriangle className="text-amber-400 text-2xl" />
              <h3 className="text-xl font-bold text-white">Reset Settings?</h3>
            </div>
            <p className="text-gray-300 mb-6">
              This will reset all settings to their default values. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={resetToDefaults}
                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <FaUndo />
                Reset Settings
              </button>
            </div>
          </div>
        </div>
      )}

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
                : type === 'error' 
                ? 'bg-gradient-to-r from-rose-500 to-rose-600'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600';
              
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
    </div>
  );
}