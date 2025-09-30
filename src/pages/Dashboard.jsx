import React, { useState, useEffect, useMemo } from "react";
import { useTimetable } from "../context/TimetableContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaTrain, 
  FaCogs, 
  FaClock, 
  FaTools, 
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSync,
  FaCalendarAlt,
  FaArrowRight,
  FaBolt,
  FaShieldAlt,
  FaUserCog,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaCertificate,
  FaMoneyBillWave,
  FaWarehouse,
  FaDatabase,
  FaRobot,
  FaHistory,
  FaExpand,
  FaCompress,
  FaFilter,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaBell,
  FaCloud,
  FaMobileAlt,
  FaNetworkWired,
  FaMicrochip,
  FaPlayCircle,
  FaRunning
} from "react-icons/fa";

// Mock data for demonstration
const mockTrains = [
  { train_id: "TS001", train_name: "Metro Express 1", status: "Service", maintenance_priority: "low", needs_cleaning: false, mileage: 24500, last_maintenance: "2024-01-15", fitness_clearance: "yes", operational_hours: 1560 },
  { train_id: "TS002", train_name: "Metro Express 2", status: "Standby", maintenance_priority: "medium", needs_cleaning: true, mileage: 19800, last_maintenance: "2024-01-10", fitness_clearance: "yes", operational_hours: 1320 },
  { train_id: "TS003", train_name: "Metro Express 3", status: "Service", maintenance_priority: "low", needs_cleaning: false, mileage: 15600, last_maintenance: "2024-01-18", fitness_clearance: "yes", operational_hours: 980 },
  { train_id: "TS004", train_name: "Metro Express 4", status: "Maintenance", maintenance_priority: "high", needs_cleaning: false, mileage: 28700, last_maintenance: "2024-01-05", fitness_clearance: "no", operational_hours: 2100 },
  { train_id: "TS005", train_name: "Metro Express 5", status: "Service", maintenance_priority: "low", needs_cleaning: true, mileage: 13400, last_maintenance: "2024-01-20", fitness_clearance: "yes", operational_hours: 760 },
  { train_id: "TS006", train_name: "Metro Express 6", status: "Standby", maintenance_priority: "low", needs_cleaning: false, mileage: 21900, last_maintenance: "2024-01-12", fitness_clearance: "yes", operational_hours: 1450 },
  { train_id: "TS007", train_name: "Metro Express 7", status: "Service", maintenance_priority: "medium", needs_cleaning: false, mileage: 17800, last_maintenance: "2024-01-16", fitness_clearance: "yes", operational_hours: 1120 },
  { train_id: "TS008", train_name: "Metro Express 8", status: "Maintenance", maintenance_priority: "high", needs_cleaning: true, mileage: 30200, last_maintenance: "2024-01-03", fitness_clearance: "no", operational_hours: 2340 }
];

const mockHistory = [
  {
    inService: ["TS001", "TS003", "TS005", "TS007"],
    standby: ["TS002", "TS006"],
    maintenance: ["TS004", "TS008"],
    timestamp: new Date().toLocaleString(),
    efficiency: 94.5
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedView, setExpandedView] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("utilization");
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Use mock data since context might not be available
  const trains = mockTrains;
  const history = mockHistory;

  // Toast notification system
  const showToast = (message, type = "info") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced train metrics with real-time calculations
  const fleetStats = useMemo(() => {
    const total = trains.length;
    const inService = trains.filter((t) => t.status === "Service").length;
    const standby = trains.filter((t) => t.status === "Standby").length;
    const maintenance = trains.filter((t) => t.status === "Maintenance").length;
    const available = inService + standby;
    
    const utilizationRate = total > 0 ? Math.round((inService / total) * 100) : 0;
    const maintenanceRate = total > 0 ? Math.round((maintenance / total) * 100) : 0;
    const availabilityRate = total > 0 ? Math.round((available / total) * 100) : 0;
    
    // Calculate average metrics
    const avgMileage = trains.reduce((sum, train) => sum + (train.mileage || 0), 0) / total || 0;
    const avgOperationalHours = trains.reduce((sum, train) => sum + (train.operational_hours || 0), 0) / total || 0;
    const highPriorityMaintenance = trains.filter(t => t.maintenance_priority === "high").length;
    const needsCleaning = trains.filter(t => t.needs_cleaning).length;
    const fitnessIssues = trains.filter(t => t.fitness_clearance === "no").length;

    return {
      total, inService, standby, maintenance, available,
      utilizationRate, maintenanceRate, availabilityRate,
      avgMileage, avgOperationalHours, highPriorityMaintenance, needsCleaning, fitnessIssues
    };
  }, [trains]);

  // Enhanced critical alerts with real data
  const criticalAlerts = useMemo(() => {
    const alerts = [];
    
    // Maintenance alerts
    trains.filter(t => t.maintenance_priority === "high" && t.status !== "Maintenance").forEach(train => {
      alerts.push({
        id: train.train_id + '-maintenance',
        train: train.train_id,
        issue: "High priority maintenance required",
        priority: "high",
        category: "maintenance",
        time: "Immediate",
        urgency: 0
      });
    });

    // Fitness certificate alerts
    trains.filter(t => t.fitness_clearance === "no").forEach(train => {
      alerts.push({
        id: train.train_id + '-fitness',
        train: train.train_id,
        issue: "Fitness certificate expired",
        priority: "high",
        category: "certification",
        time: "Immediate",
        urgency: 0
      });
    });

    // Cleaning alerts
    trains.filter(t => t.needs_cleaning).slice(0, 2).forEach(train => {
      alerts.push({
        id: train.train_id + '-cleaning',
        train: train.train_id,
        issue: "Cleaning overdue",
        priority: "medium",
        category: "cleaning",
        time: "2 hours ago",
        urgency: 1
      });
    });

    return alerts;
  }, [trains]);

  const latestPlan = history?.[0] || null;

  // Enhanced maintenance data with real calculations
  const maintenanceData = useMemo(() => {
    const pending = trains.filter(t => t.maintenance_priority === "high").length;
    const inProgress = trains.filter(t => t.status === "Maintenance").length;
    const completed = Math.floor(trains.length * 0.8);
    const critical = trains.filter(t => 
      t.maintenance_priority === "high" && 
      t.status !== "Maintenance"
    ).length;

    return { pending, inProgress, completed, critical };
  }, [trains]);

  // Performance metrics with trends and real data
  const performanceMetrics = [
    { 
      name: "Operational Punctuality", 
      value: "99.5%", 
      trend: "+0.2%", 
      color: "text-emerald-400", 
      icon: FaClock,
      description: "On-time performance"
    },
    { 
      name: "Fleet Utilization", 
      value: `${fleetStats.utilizationRate}%`, 
      trend: fleetStats.utilizationRate > 70 ? "+1.5%" : "-2.1%", 
      color: "text-cyan-400", 
      icon: FaTrain,
      description: "Active trains vs total"
    },
    { 
      name: "Maintenance Compliance", 
      value: "98%", 
      trend: "+0.5%", 
      color: "text-blue-400", 
      icon: FaCertificate,
      description: "Schedule adherence"
    },
    { 
      name: "Cost Efficiency", 
      value: "96%", 
      trend: "+2.1%", 
      color: "text-green-400", 
      icon: FaMoneyBillWave,
      description: "Cost optimization"
    }
  ];

  // Depot status with real calculations
  const depotStatus = {
    mainDepot: { 
      capacity: 25, 
      occupied: fleetStats.total, 
      available: 25 - fleetStats.total,
      location: "Muttom Depot",
      type: "Primary Stabling"
    },
    inspectionBay: { 
      capacity: 8, 
      occupied: fleetStats.maintenance, 
      available: 8 - fleetStats.maintenance,
      location: "Inspection Bay Line",
      type: "Maintenance"
    }
  };

  // Enhanced simulation function with error handling
  const handleOptimizer = async (trainCount = 6) => {
    setLoading(true);
    setSimulationRunning(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new plan based on current train data
      const availableTrains = trains.filter(t => t.status !== "Maintenance" && t.fitness_clearance === "yes");
      const inService = availableTrains.slice(0, trainCount).map(t => t.train_id);
      const standby = availableTrains.slice(trainCount, trainCount + 3).map(t => t.train_id);
      const maintenance = trains.filter(t => !inService.includes(t.train_id) && !standby.includes(t.train_id)).map(t => t.train_id);
      
      const newPlan = {
        inService,
        standby,
        maintenance,
        timestamp: new Date().toLocaleString(),
        efficiency: Math.round((inService.length / trainCount) * 100)
      };
      
      // Update history (in a real app, this would be in context)
      history.unshift(newPlan);
      
      showToast(`AI optimization completed! ${inService.length} trains scheduled for service`, 'success');
    } catch (error) {
      console.error('Optimization error:', error);
      showToast('Optimization failed. Please try again.', 'error');
    } finally {
      setLoading(false);
      setSimulationRunning(false);
    }
  };

  // Quick actions for different scenarios
  const quickActions = [
    {
      title: "Morning Peak",
      description: "Optimize for 7-10 AM rush",
      trains: 8,
      icon: FaClock,
      color: "from-orange-500 to-red-500",
      action: () => handleOptimizer(8)
    },
    {
      title: "Evening Peak",
      description: "Optimize for 5-8 PM demand",
      trains: 8,
      icon: FaClock,
      color: "from-purple-500 to-pink-500",
      action: () => handleOptimizer(8)
    },
    {
      title: "Weekend Schedule",
      description: "Reduced frequency plan",
      trains: 4,
      icon: FaCalendarAlt,
      color: "from-green-500 to-teal-500",
      action: () => handleOptimizer(4)
    },
    {
      title: "Emergency Protocol",
      description: "Maximum availability",
      trains: 10,
      icon: FaExclamationTriangle,
      color: "from-red-500 to-orange-500",
      action: () => handleOptimizer(10)
    }
  ];

  // Filter alerts by priority
  const highPriorityAlerts = criticalAlerts.filter(alert => alert.priority === 'high');
  const mediumPriorityAlerts = criticalAlerts.filter(alert => alert.priority === 'medium');

  // Recent activity simulation
  const recentActivity = [
    { action: "Train TS007 moved to Service", time: "2 minutes ago", user: "AI Scheduler", type: "auto" },
    { action: "Maintenance alert for TS004", time: "15 minutes ago", user: "System", type: "alert" },
    { action: "Cleaning completed for TS005", time: "1 hour ago", user: "Maintenance Team", type: "maintenance" },
    { action: "Fitness check updated", time: "2 hours ago", user: "Operations", type: "update" }
  ];

  // Filter trains based on search
  const filteredTrains = trains.filter(train =>
    train.train_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.train_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getToastBgColor = (type) => {
    switch (type) {
      case "success": return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "error": return "bg-gradient-to-r from-red-500 to-orange-600";
      case "warning": return "bg-gradient-to-r from-yellow-500 to-amber-600";
      default: return "bg-gradient-to-r from-blue-500 to-cyan-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Service": return "text-green-400";
      case "Standby": return "text-yellow-400";
      case "Maintenance": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Service": return "bg-green-500";
      case "Standby": return "bg-yellow-500";
      case "Maintenance": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-6">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getToastBgColor(toast.type)} text-white p-4 rounded-xl shadow-lg font-semibold transform transition-all duration-300 backdrop-blur-sm border border-white/20`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400 rounded-full blur-lg animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <FaTrain className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                KMRL Fleet Command Center
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <p className="text-cyan-300 text-lg">
                  Real-time monitoring & intelligent optimization
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    System Online
                  </span>
                  <span>•</span>
                  <span>{time.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span className="font-mono">{time.toLocaleTimeString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleOptimizer(6)}
              disabled={loading}
              className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none font-semibold"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  AI Optimizing...
                </>
              ) : (
                <>
                  <FaBolt className="text-yellow-300 text-lg" />
                  <div className="text-left">
                    <div className="font-bold">Generate Plan</div>
                    <div className="text-cyan-100 text-xs">Smart induction schedule</div>
                  </div>
                </>
              )}
            </button>
            
            <button
              onClick={() => navigate('/simulation')}
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl border border-gray-600 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <FaRobot className="text-cyan-400" />
              <div className="text-left">
                <div className="font-bold">Run Simulation</div>
                <div className="text-gray-400 text-xs">Test scenarios</div>
              </div>
            </button>

            <button
              onClick={() => setExpandedView(!expandedView)}
              className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl border border-gray-600 transition-all duration-300"
              title={expandedView ? "Compact View" : "Expanded View"}
            >
              {expandedView ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search trains by ID, name, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm">
              <option value="all">All Status</option>
              <option value="service">In Service</option>
              <option value="standby">Standby</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <button className="px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-gray-400 hover:text-white transition-colors backdrop-blur-sm flex items-center gap-2">
              <FaFilter />
              Filter
            </button>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "overview", label: "Overview", icon: FaTrain },
            { id: "operations", label: "Operations", icon: FaCogs },
            { id: "maintenance", label: "Maintenance", icon: FaTools },
            { id: "analytics", label: "Analytics", icon: FaChartLine },
            { id: "simulation", label: "Simulation", icon: FaRobot }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
              }`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className={`grid gap-6 mb-6 ${expandedView ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-3'}`}>
          
          {/* Left Column - Main Content */}
          <div className={`space-y-6 ${expandedView ? 'xl:col-span-2' : 'xl:col-span-2'}`}>
            
            {/* Enhanced Fleet Status Overview */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FaTrain className="text-cyan-400" />
                  Fleet Status Overview
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-400">
                    Updated: {new Date().toLocaleTimeString('en-IN')}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Live
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Total Trains */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-white">{fleetStats.total}</div>
                    <FaDatabase className="text-blue-400 text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-blue-400 text-sm font-semibold">Total Fleet</div>
                  <div className="text-gray-400 text-xs mt-1">25 trainset capacity</div>
                </div>

                {/* Operational */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-white">{fleetStats.inService}</div>
                    <FaClock className="text-emerald-400 text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-emerald-400 text-sm font-semibold">In Service</div>
                  <div className="text-gray-400 text-xs mt-1">{fleetStats.utilizationRate}% utilization</div>
                </div>

                {/* Available */}
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl p-4 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-white">{fleetStats.standby}</div>
                    <FaCogs className="text-amber-400 text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-amber-400 text-sm font-semibold">Ready Standby</div>
                  <div className="text-gray-400 text-xs mt-1">Immediate deployment</div>
                </div>

                {/* Maintenance */}
                <div className="bg-gradient-to-br from-rose-500/10 to-rose-600/10 rounded-xl p-4 border border-rose-500/30 hover:border-rose-400 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-white">{fleetStats.maintenance}</div>
                    <FaTools className="text-rose-400 text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-rose-400 text-sm font-semibold">Maintenance</div>
                  <div className="text-gray-400 text-xs mt-1">{fleetStats.maintenanceRate}% of fleet</div>
                </div>
              </div>

              {/* Enhanced Progress Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Fleet Availability</span>
                    <span>{fleetStats.availabilityRate}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${fleetStats.availabilityRate}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Operational Efficiency</span>
                    <span>94%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `94%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Operations Plan */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FaCalendarAlt className="text-cyan-400" />
                  Current Operations Plan
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-sm flex items-center gap-1">
                    <FaCheckCircle />
                    Active Plan
                  </span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-cyan-400 text-sm flex items-center gap-1">
                    <FaRobot />
                    AI Generated
                  </span>
                </div>
              </div>

              {latestPlan ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <FaClock className="text-emerald-400" />
                        <h3 className="text-emerald-400 font-semibold">Active Service ({latestPlan.inService?.length || 0})</h3>
                      </div>
                      <div className="text-white text-sm">
                        {latestPlan.inService?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {latestPlan.inService.slice(0, 6).map(train => (
                              <span key={train} className="bg-emerald-500/30 px-3 py-1 rounded-lg text-sm font-medium border border-emerald-500/50">
                                {train}
                              </span>
                            ))}
                            {latestPlan.inService.length > 6 && (
                              <span className="bg-emerald-500/20 px-3 py-1 rounded-lg text-sm text-emerald-300">
                                +{latestPlan.inService.length - 6} more
                              </span>
                            )}
                          </div>
                        ) : "—"}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl p-4 border border-amber-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <FaCogs className="text-amber-400" />
                        <h3 className="text-amber-400 font-semibold">Standby Reserve ({latestPlan.standby?.length || 0})</h3>
                      </div>
                      <div className="text-white text-sm">
                        {latestPlan.standby?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {latestPlan.standby.slice(0, 4).map(train => (
                              <span key={train} className="bg-amber-500/30 px-3 py-1 rounded-lg text-sm font-medium border border-amber-500/50">
                                {train}
                              </span>
                            ))}
                            {latestPlan.standby.length > 4 && (
                              <span className="bg-amber-500/20 px-3 py-1 rounded-lg text-sm text-amber-300">
                                +{latestPlan.standby.length - 4} more
                              </span>
                            )}
                          </div>
                        ) : "—"}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-rose-500/10 to-rose-600/10 rounded-xl p-4 border border-rose-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <FaTools className="text-rose-400" />
                        <h3 className="text-rose-400 font-semibold">Maintenance ({latestPlan.maintenance?.length || 0})</h3>
                      </div>
                      <div className="text-white text-sm">
                        {latestPlan.maintenance?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {latestPlan.maintenance.slice(0, 4).map(train => (
                              <span key={train} className="bg-rose-500/30 px-3 py-1 rounded-lg text-sm font-medium border border-rose-500/50">
                                {train}
                              </span>
                            ))}
                            {latestPlan.maintenance.length > 4 && (
                              <span className="bg-rose-500/20 px-3 py-1 rounded-lg text-sm text-rose-300">
                                +{latestPlan.maintenance.length - 4} more
                              </span>
                            )}
                          </div>
                        ) : "—"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-700">
                    <div className="text-gray-400 text-sm">
                      Plan efficiency: {latestPlan.efficiency || 94}% • Generated {latestPlan.timestamp}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate('/timetable')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
                      >
                        View Timetable
                        <FaArrowRight />
                      </button>
                      <button
                        onClick={() => handleOptimizer(6)}
                        className="px-4 py-2 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-semibold rounded-lg transition-all duration-300"
                      >
                        Regenerate
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4 text-lg">No operational plan active</div>
                  <button
                    onClick={() => handleOptimizer(6)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    Generate AI Plan
                  </button>
                </div>
              )}
            </div>

            {/* Train List Table */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FaTrain className="text-cyan-400" />
                  Train Fleet Details
                </h2>
                <div className="text-gray-400 text-sm">
                  Showing {filteredTrains.length} of {trains.length} trains
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Train ID</th>
                      <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Mileage</th>
                      <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Maintenance</th>
                      <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrains.map((train) => (
                      <tr key={train.train_id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                        <td className="py-3 px-4 text-white font-medium">{train.train_id}</td>
                        <td className="py-3 px-4 text-gray-300">{train.train_name}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(train.status)} bg-opacity-20 text-${getStatusColor(train.status).replace('text-', '')}`}>
                            <div className={`w-2 h-2 rounded-full ${getStatusBgColor(train.status)}`}></div>
                            {train.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{train.mileage.toLocaleString()} km</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            train.maintenance_priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            train.maintenance_priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {train.maintenance_priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => navigate(`/train/${train.train_id}`)}
                              className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button 
                              onClick={() => showToast(`Edit ${train.train_id}`, 'info')}
                              className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                              title="Edit Train"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts & Status */}
          {!expandedView && (
            <div className="space-y-6">
              
              {/* Priority Alerts */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <FaExclamationTriangle className="text-rose-400" />
                    Priority Alerts
                  </h2>
                  <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {highPriorityAlerts.length} Critical
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  {highPriorityAlerts.map(alert => (
                    <div 
                      key={alert.id}
                      className="p-3 rounded-lg bg-gradient-to-r from-rose-500/10 to-red-500/10 border border-rose-500/30 hover:border-rose-400/50 transition-all duration-300 cursor-pointer"
                      onClick={() => showToast(`Viewing alert for ${alert.train}`, 'info')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-white text-sm flex items-center gap-2">
                          <FaTrain className="text-rose-400" />
                          {alert.train}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.urgency <= 1 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {alert.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-1">{alert.issue}</p>
                      <div className="text-rose-400 text-xs flex items-center gap-1">
                        <FaBell />
                        {alert.time}
                      </div>
                    </div>
                  ))}
                </div>

                {mediumPriorityAlerts.length > 0 && (
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-gray-400 text-sm font-semibold flex items-center gap-2">
                        <FaBell className="text-amber-400" />
                        Other Notifications
                      </h3>
                      <span className="text-amber-400 text-xs bg-amber-500/20 px-2 py-1 rounded-full">
                        {mediumPriorityAlerts.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {mediumPriorityAlerts.slice(0, 3).map(alert => (
                        <div 
                          key={alert.id} 
                          className="text-gray-400 text-sm flex items-center gap-2 p-2 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer"
                          onClick={() => showToast(`Viewing alert for ${alert.train}`, 'info')}
                        >
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                          <span className="text-amber-400 font-medium">{alert.train}:</span>
                          <span className="flex-1 truncate">{alert.issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <FaBolt className="text-cyan-400" />
                  Quick Scenarios
                </h2>

                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      disabled={loading}
                      className="w-full p-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-600 hover:border-cyan-500/30 rounded-lg transition-all duration-300 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                          <action.icon className="text-white text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{action.title}</div>
                          <div className="text-gray-400 text-xs">{action.description}</div>
                        </div>
                        <div className="text-cyan-400 text-xs font-semibold">
                          {action.trains} trains
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Maintenance Overview */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <FaTools className="text-amber-400" />
                  Maintenance Status
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
                    <div className="text-2xl font-bold text-amber-400">{maintenanceData.pending}</div>
                    <div className="text-amber-400 text-xs">Pending</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400">{maintenanceData.inProgress}</div>
                    <div className="text-blue-400 text-xs">In Progress</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg border border-emerald-500/30">
                    <div className="text-2xl font-bold text-emerald-400">{maintenanceData.completed}</div>
                    <div className="text-emerald-400 text-xs">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-rose-500/10 to-rose-600/10 rounded-lg border border-rose-500/30">
                    <div className="text-2xl font-bold text-rose-400">{maintenanceData.critical}</div>
                    <div className="text-rose-400 text-xs">Critical</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/maintenance')}
                  className="w-full py-2 text-center bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-400 border border-amber-500/30 hover:border-amber-400/50 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <FaTools />
                  View Maintenance Schedule
                </button>
              </div>

              {/* System Status */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <FaNetworkWired className="text-emerald-400" />
                  System Status
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">AI Engine</span>
                    <span className="text-emerald-400 text-sm flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Data Sync</span>
                    <span className="text-emerald-400 text-sm">Live</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">API Connections</span>
                    <span className="text-emerald-400 text-sm">12/12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Last Backup</span>
                    <span className="text-cyan-400 text-sm">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Footer Status */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                System Operational
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaCloud className="text-cyan-400" />
                Cloud Sync: Active
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaMobileAlt className="text-blue-400" />
                Mobile Ready
              </span>
            </div>
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <FaMicrochip className="text-cyan-400" />
              🚇 KMRL AI Fleet Management v2.1.0 • Smart India Hackathon 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}