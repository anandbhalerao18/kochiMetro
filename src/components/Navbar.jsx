import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaHome, 
  FaTachometerAlt, 
  FaTrain, 
  FaProjectDiagram, 
  FaBell, 
  FaCog, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaBars,
  FaTimes,
  FaRobot,
  FaChartLine,
  FaTools,
  FaExclamationTriangle,
  FaCloud,
  FaBolt,
  FaChevronDown,
  FaSearch,
  FaQuestionCircle,
  FaSyncAlt
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { 
      name: "Home", 
      icon: <FaHome />, 
      path: "/",
      description: "Home Dashboard",
      badge: null
    },
    { 
      name: "Dashboard", 
      icon: <FaTachometerAlt />, 
      path: "/dashboard",
      description: "Overview & Analytics",
      badge: null
    },
    { 
      name: "Timetable", 
      icon: <FaTrain />, 
      path: "/timetable",
      description: "Fleet Schedule",
      badge: null
    },
    { 
      name: "Simulation", 
      icon: <FaRobot />, 
      path: "/simulation",
      description: "AI Optimization",
      badge: "New"
    },
    { 
      name: "Analytics", 
      icon: <FaChartLine />, 
      path: "/analytics",
      description: "Performance Metrics",
      badge: null
    },
    { 
      name: "Maintenance", 
      icon: <FaTools />, 
      path: "/maintenance",
      description: "Fleet Maintenance",
      badge: 2
    },
    { 
      name: "Alerts", 
      icon: <FaBell />, 
      path: "/alerts",
      description: "Notifications & Alerts",
      badge: 3
    },
  ];

  const quickActions = [
    {
      name: "Run Simulation",
      icon: <FaSyncAlt />,
      action: () => navigate('/simulation'),
      color: "text-purple-400"
    },
    {
      name: "System Status",
      icon: <FaBolt />,
      action: () => navigate('/status'),
      color: "text-green-400"
    },
    {
      name: "Help Center",
      icon: <FaQuestionCircle />,
      action: () => navigate('/help'),
      color: "text-blue-400"
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const getNavLinkClass = ({ isActive }) => {
    return `group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 shadow-lg"
        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
    }`;
  };

  const getMobileNavLinkClass = ({ isActive }) => {
    return `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
      isActive
        ? "text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
    }`;
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-lg' 
          : 'bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/30'
      }`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section - Logo & Brand */}
            <div className="flex items-center gap-8">
              {/* Logo & Brand */}
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <FaTrain className="text-white text-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg leading-tight">
                    KMRL AI
                  </span>
                  <span className="text-cyan-300 text-xs font-medium">
                    Command Center
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex items-center gap-1">
                {menuItems.slice(0, 5).map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={getNavLinkClass}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`absolute -top-1 -right-1 min-w-5 h-5 px-1 text-white text-xs rounded-full flex items-center justify-center ${
                        typeof item.badge === 'number' 
                          ? 'bg-red-500 animate-pulse' 
                          : 'bg-green-500'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-gray-600 shadow-xl z-50">
                      {item.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right Section - User & Actions */}
            <div className="flex items-center gap-4">
              
              {/* Search Bar */}
              <div ref={searchRef} className="relative">
                <div className={`flex items-center transition-all duration-300 ${
                  searchOpen ? 'w-64 opacity-100' : 'w-10 opacity-90'
                }`}>
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 rounded-xl transition-all duration-200"
                  >
                    <FaSearch className="text-lg" />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${
                    searchOpen ? 'w-56 opacity-100' : 'w-0 opacity-0'
                  }`}>
                    <input
                      type="text"
                      placeholder="Search trains, schedules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleSearch}
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions - Desktop */}
              <div className="hidden md:flex items-center gap-1">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={action.action}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group relative"
                  >
                    <span className={`text-lg ${action.color}`}>{action.icon}</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border border-gray-600">
                      {action.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* System Status */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">System Online</span>
              </div>

              {/* User Menu - Desktop */}
              {user ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2">
                      <FaUserCircle className="text-cyan-400 text-xl" />
                      <div className="text-left hidden lg:block">
                        <div className="text-white text-sm font-semibold leading-tight">
                          {user.name || "Operator"}
                        </div>
                        <div className="text-cyan-400 text-xs">
                          {user.role || "Fleet Manager"}
                        </div>
                      </div>
                    </div>
                    <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200 ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl py-2 animate-in fade-in-0 zoom-in-95">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-700/50">
                        <div className="text-white font-semibold">{user.name || "Operator"}</div>
                        <div className="text-cyan-400 text-sm">{user.email || "operator@kmrl.com"}</div>
                        <div className="text-gray-400 text-xs mt-1">{user.department || "Operations Control"}</div>
                      </div>

                      {/* Menu Items */}
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FaUserCircle className="text-cyan-400" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <FaCog className="text-cyan-400" />
                        <span>System Settings</span>
                      </Link>

                      {/* Divider */}
                      <div className="border-t border-gray-700/50 my-2"></div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors duration-200"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-cyan-400 hover:text-white border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl transition-all duration-200 font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-200 font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="xl:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div 
            ref={mobileMenuRef}
            className="xl:hidden bg-gray-800/95 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl animate-in slide-in-from-top duration-300"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Navigation Links */}
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={getMobileNavLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className={`min-w-5 h-5 px-1 text-white text-xs rounded-full flex items-center justify-center ${
                            typeof item.badge === 'number' 
                              ? 'bg-red-500 animate-pulse' 
                              : 'bg-green-500'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-cyan-400 text-xs mt-1">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}

              {/* Quick Actions - Mobile */}
              <div className="pt-4 border-t border-gray-700/50">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.name}
                      onClick={() => {
                        action.action();
                        setMenuOpen(false);
                      }}
                      className="p-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 flex flex-col items-center gap-2"
                    >
                      <span className={`text-lg ${action.color}`}>{action.icon}</span>
                      <span className="text-xs">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile User Section */}
              {user ? (
                <div className="pt-4 border-t border-gray-700/50 space-y-2">
                  <div className="px-4 py-3 flex items-center gap-3 bg-gray-700/30 rounded-xl">
                    <FaUserCircle className="text-cyan-400 text-2xl" />
                    <div className="flex-1">
                      <div className="text-white font-semibold">{user.name || "Operator"}</div>
                      <div className="text-cyan-400 text-sm">{user.email || "operator@kmrl.com"}</div>
                    </div>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserCircle className="text-cyan-400" />
                    <span>Profile Settings</span>
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaCog className="text-cyan-400" />
                    <span>System Settings</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors duration-200 text-left"
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-700/50 space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-cyan-400 hover:text-white border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl text-center transition-all duration-200 font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl text-center shadow-lg transition-all duration-200 font-semibold"
                    onClick={() => setMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;