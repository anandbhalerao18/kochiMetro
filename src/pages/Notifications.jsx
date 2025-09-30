import React, { useState, useMemo } from "react";
import { useTimetable } from "../context/TimetableContext";
import { 
  FaBell, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaExclamationCircle,
  FaTrain,
  FaTools,
  FaClock,
  FaCalendarAlt,
  FaFilter,
  FaTrash,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaRobot,
  FaCogs,
  FaSync,
  FaSearch,
  FaTimes,
  FaRegBell,
  FaBellSlash
} from "react-icons/fa";
import { 
  MdAssessment,
  MdTrendingUp,
  MdWarning,
  MdError
} from "react-icons/md";

export default function Notifications() {
  const { notifications, clearNotification, clearAllNotifications, markAsRead } = useTimetable();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showRead, setShowRead] = useState(true);
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  // Enhanced notification types with detailed configuration
  const notificationTypes = {
    info: { 
      icon: FaInfoCircle, 
      color: "text-blue-400", 
      bgColor: "from-blue-500/10 to-blue-600/10", 
      borderColor: "border-blue-500/30",
      label: "Information"
    },
    success: { 
      icon: FaCheckCircle, 
      color: "text-emerald-400", 
      bgColor: "from-emerald-500/10 to-emerald-600/10", 
      borderColor: "border-emerald-500/30",
      label: "Success"
    },
    warning: { 
      icon: FaExclamationTriangle, 
      color: "text-amber-400", 
      bgColor: "from-amber-500/10 to-amber-600/10", 
      borderColor: "border-amber-500/30",
      label: "Warning"
    },
    error: { 
      icon: FaExclamationCircle, 
      color: "text-rose-400", 
      bgColor: "from-rose-500/10 to-rose-600/10", 
      borderColor: "border-rose-500/30",
      label: "Error"
    },
    system: { 
      icon: FaCogs, 
      color: "text-cyan-400", 
      bgColor: "from-cyan-500/10 to-cyan-600/10", 
      borderColor: "border-cyan-500/30",
      label: "System"
    },
    maintenance: { 
      icon: FaTools, 
      color: "text-purple-400", 
      bgColor: "from-purple-500/10 to-purple-600/10", 
      borderColor: "border-purple-500/30",
      label: "Maintenance"
    }
  };

  // Filter and search notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesFilter = activeFilter === "all" || notification.type === activeFilter;
      const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesReadStatus = showRead || !notification.read;
      return matchesFilter && matchesSearch && matchesReadStatus;
    });
  }, [notifications, activeFilter, searchTerm, showRead]);

  // Statistics
  const stats = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const errors = notifications.filter(n => n.type === 'error').length;
    const warnings = notifications.filter(n => n.type === 'warning').length;
    
    return { total, unread, errors, warnings };
  }, [notifications]);

  // Group notifications by date
  const groupedNotifications = useMemo(() => {
    const groups = {};
    filteredNotifications.forEach(notification => {
      const date = new Date(notification.time).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });
    return groups;
  }, [filteredNotifications]);

  // Handler functions
  const handleMarkAsRead = (id) => {
    markAsRead?.(id);
  };

  const handleDelete = (id) => {
    clearNotification?.(id);
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleClearAll = () => {
    clearAllNotifications?.();
    setSelectedNotifications(new Set());
  };

  const handleSelectAll = () => {
    if (selectedNotifications.size === filteredNotifications.length) {
      setSelectedNotifications(new Set());
    } else {
      setSelectedNotifications(new Set(filteredNotifications.map(n => n.id)));
    }
  };

  const handleBulkMarkAsRead = () => {
    selectedNotifications.forEach(id => handleMarkAsRead(id));
    setSelectedNotifications(new Set());
  };

  const handleBulkDelete = () => {
    selectedNotifications.forEach(id => handleDelete(id));
    setSelectedNotifications(new Set());
  };

  const toggleNotificationSelection = (id) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Get appropriate icon based on notification category
  const getCategoryIcon = (message) => {
    if (message.toLowerCase().includes('train') || message.toLowerCase().includes('fleet')) {
      return <FaTrain className="text-cyan-400" />;
    }
    if (message.toLowerCase().includes('maintenance') || message.toLowerCase().includes('repair')) {
      return <FaTools className="text-amber-400" />;
    }
    if (message.toLowerCase().includes('schedule') || message.toLowerCase().includes('timetable')) {
      return <FaCalendarAlt className="text-blue-400" />;
    }
    if (message.toLowerCase().includes('ai') || message.toLowerCase().includes('optimiz')) {
      return <FaRobot className="text-purple-400" />;
    }
    return <FaBell className="text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <FaBell className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Notification Center
              </h1>
              <p className="text-cyan-300 text-lg">
                Stay updated with system alerts and activities
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowRead(!showRead)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                showRead 
                  ? "bg-cyan-500 text-white" 
                  : "bg-gray-800 text-gray-400 hover:text-white border border-gray-600"
              }`}
            >
              {showRead ? <FaEye /> : <FaEyeSlash />}
              {showRead ? "Showing Read" : "Hidden Read"}
            </button>
            
            {selectedNotifications.size > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={handleBulkMarkAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  <FaCheck />
                  Mark Read ({selectedNotifications.size})
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  <FaTrash />
                  Delete ({selectedNotifications.size})
                </button>
              </div>
            )}
            
            <button
              onClick={handleClearAll}
              disabled={notifications.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-400 hover:text-white rounded-xl border border-gray-600 transition-all duration-300 font-semibold"
            >
              <FaTimes />
              Clear All
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-gray-400 text-sm">Total</div>
              </div>
              <FaRegBell className="text-cyan-400 text-xl" />
            </div>
          </div>
          
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-rose-400">{stats.unread}</div>
                <div className="text-gray-400 text-sm">Unread</div>
              </div>
              <FaBell className="text-rose-400 text-xl" />
            </div>
          </div>
          
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-400">{stats.warnings}</div>
                <div className="text-gray-400 text-sm">Warnings</div>
              </div>
              <MdWarning className="text-amber-400 text-xl" />
            </div>
          </div>
          
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-rose-500">{stats.errors}</div>
                <div className="text-gray-400 text-sm">Errors</div>
              </div>
              <MdError className="text-rose-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === "all"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600 border border-gray-600"
                }`}
              >
                <FaFilter />
                All
              </button>
              
              {Object.entries(notificationTypes).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeFilter === key
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600 border border-gray-600"
                  }`}
                >
                  <config.icon className={config.color} />
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700">
              <FaBellSlash className="text-4xl text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {notifications.length === 0 
                  ? "You're all caught up! No notifications at the moment." 
                  : "No notifications match your current filters."}
              </p>
            </div>
          ) : (
            Object.entries(groupedNotifications).map(([date, dayNotifications]) => (
              <div key={date} className="space-y-4">
                {/* Date Header */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <div className="text-gray-400 text-sm font-semibold px-4 py-2 bg-gray-800 rounded-lg">
                    {date === new Date().toDateString() ? "Today" : 
                     date === new Date(Date.now() - 86400000).toDateString() ? "Yesterday" : 
                     date}
                  </div>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Notifications for this date */}
                <div className="space-y-3">
                  {dayNotifications.map((notification) => {
                    const config = notificationTypes[notification.type] || notificationTypes.info;
                    const IconComponent = config.icon;
                    const isSelected = selectedNotifications.has(notification.id);
                    
                    return (
                      <div
                        key={notification.id}
                        className={`relative bg-gradient-to-r ${config.bgColor} backdrop-blur-sm rounded-2xl p-4 border ${config.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          notification.read ? "opacity-70" : "opacity-100"
                        } ${isSelected ? "ring-2 ring-cyan-500" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Selection Checkbox */}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleNotificationSelection(notification.id)}
                            className="mt-1 w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                          />
                          
                          {/* Icon */}
                          <div className="p-2 bg-gray-700/50 rounded-lg">
                            <IconComponent className={`text-xl ${config.color}`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                {getCategoryIcon(notification.message)}
                                <p className={`font-semibold ${notification.read ? "text-gray-300" : "text-white"}`}>
                                  {notification.message}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                                )}
                                <span className="text-gray-500 text-sm whitespace-nowrap">
                                  {new Date(notification.time).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                            
                            {notification.details && (
                              <p className="text-gray-400 text-sm mt-2 bg-gray-700/30 p-3 rounded-lg border border-gray-600/50">
                                {notification.details}
                              </p>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-3">
                              {!notification.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium transition-colors border border-emerald-500/30"
                                >
                                  <FaCheck className="text-xs" />
                                  Mark Read
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg text-xs font-medium transition-colors border border-rose-500/30"
                              >
                                <FaTrash className="text-xs" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Priority Indicator */}
                        {notification.priority === "high" && (
                          <div className="absolute top-3 right-3">
                            <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bulk Actions Footer */}
        {selectedNotifications.size > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 border border-cyan-500/30 shadow-2xl">
            <div className="flex items-center gap-4">
              <span className="text-cyan-400 font-semibold">
                {selectedNotifications.size} notification{selectedNotifications.size !== 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                  {selectedNotifications.size === filteredNotifications.length ? 'Deselect All' : 'Select All'}
                </button>
                <button
                  onClick={handleBulkMarkAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <FaCheck />
                  Mark Read
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}