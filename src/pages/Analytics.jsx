import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaTrendingUp, 
  FaTrendingDown,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaTrain,
  FaTools,
  FaClock,
  FaMoneyBillWave,
  FaShieldAlt,
  FaUsers,
  FaBolt,
  FaDatabase,
  FaCog,
  FaArrowRight,
  FaEye,
  FaSync,
  FaExclamationTriangle
} from "react-icons/fa";

// Mock analytics data
const mockAnalyticsData = {
  performance: {
    punctuality: 99.5,
    availability: 98.2,
    utilization: 94.7,
    efficiency: 96.3,
    maintenanceCompliance: 98.8,
    costEfficiency: 95.2
  },
  trends: [
    { month: "Jan", punctuality: 99.2, utilization: 92.1, maintenance: 12 },
    { month: "Feb", punctuality: 99.3, utilization: 93.4, maintenance: 10 },
    { month: "Mar", punctuality: 99.1, utilization: 92.8, maintenance: 14 },
    { month: "Apr", punctuality: 99.6, utilization: 94.2, maintenance: 8 },
    { month: "May", punctuality: 99.5, utilization: 94.7, maintenance: 9 },
    { month: "Jun", punctuality: 99.7, utilization: 95.1, maintenance: 7 }
  ],
  fleetMetrics: {
    totalTrains: 25,
    activeTrains: 18,
    standbyTrains: 4,
    maintenanceTrains: 3,
    avgMileage: 21500,
    avgOperationalHours: 1450
  },
  maintenance: {
    scheduled: 45,
    completed: 42,
    overdue: 3,
    critical: 2,
    avgCompletionTime: "2.3 days"
  },
  kpis: [
    { name: "Operational Punctuality", current: 99.5, target: 99.0, trend: "up" },
    { name: "Fleet Utilization", current: 94.7, target: 92.0, trend: "up" },
    { name: "Maintenance Compliance", current: 98.8, target: 95.0, trend: "up" },
    { name: "Cost per KM", current: 42.3, target: 45.0, trend: "down" },
    { name: "Energy Efficiency", current: 88.5, target: 85.0, trend: "up" },
    { name: "Passenger Satisfaction", current: 96.2, target: 94.0, trend: "up" }
  ]
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6m");
  const [activeMetric, setActiveMetric] = useState("punctuality");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [toasts, setToasts] = useState([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Toast notification system
  const showToast = (message, type = "info") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const data = { ...mockAnalyticsData };
    let monthsToShow = 6;
    
    switch (timeRange) {
      case "1m": monthsToShow = 1; break;
      case "3m": monthsToShow = 3; break;
      case "6m": monthsToShow = 6; break;
      case "1y": monthsToShow = 12; break;
      default: monthsToShow = 6;
    }
    
    data.trends = data.trends.slice(-monthsToShow);
    return data;
  }, [timeRange]);

  const getTrendIcon = (trend) => {
    return trend === "up" ? 
      <FaTrendingUp className="text-green-400" /> : 
      <FaTrendingDown className="text-red-400" />;
  };

  const getTrendColor = (trend) => {
    return trend === "up" ? "text-green-400" : "text-red-400";
  };

  const getMetricColor = (value) => {
    if (value >= 98) return "text-emerald-400";
    if (value >= 95) return "text-green-400";
    if (value >= 90) return "text-yellow-400";
    if (value >= 85) return "text-orange-400";
    return "text-red-400";
  };

  const getMetricBgColor = (value) => {
    if (value >= 98) return "bg-emerald-500";
    if (value >= 95) return "bg-green-500";
    if (value >= 90) return "bg-yellow-500";
    if (value >= 85) return "bg-orange-500";
    return "bg-red-500";
  };

  const getToastBgColor = (type) => {
    switch (type) {
      case "success": return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "error": return "bg-gradient-to-r from-red-500 to-orange-600";
      case "warning": return "bg-gradient-to-r from-yellow-500 to-amber-600";
      default: return "bg-gradient-to-r from-blue-500 to-cyan-600";
    }
  };

  const exportAnalytics = () => {
    showToast("Analytics data exported successfully", "success");
    // In a real app, this would generate and download a CSV/PDF report
  };

  const refreshAnalytics = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Analytics data refreshed", "success");
    }, 1500);
  };

  // Calculate performance score
  const performanceScore = useMemo(() => {
    const metrics = filteredData.performance;
    const score = (
      metrics.punctuality + 
      metrics.availability + 
      metrics.utilization + 
      metrics.efficiency + 
      metrics.maintenanceCompliance + 
      metrics.costEfficiency
    ) / 6;
    return Math.round(score * 10) / 10;
  }, [filteredData]);

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

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400 rounded-full blur-lg animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/20">
              <FaChartBar className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Analytics & Insights
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <p className="text-cyan-300 text-lg">
                  Deep insights into fleet performance and operations
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Live Data
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
              onClick={refreshAnalytics}
              disabled={loading}
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl border border-gray-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 font-semibold"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <FaSync className="text-cyan-400" />
                  Refresh Data
                </>
              )}
            </button>
            
            <button
              onClick={exportAnalytics}
              className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <FaDownload className="text-lg" />
              Export Report
            </button>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="flex flex-wrap gap-4 mb-8 p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700">
          <div className="flex items-center gap-3">
            <FaFilter className="text-cyan-400 text-lg" />
            <span className="text-white font-semibold">Time Range:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "1m", label: "1 Month" },
              { value: "3m", label: "3 Months" },
              { value: "6m", label: "6 Months" },
              { value: "1y", label: "1 Year" }
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeRange === range.value
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-400 hover:text-white hover:bg-gray-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          
          {/* Left Column - Performance Overview */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Performance Score Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FaChartLine className="text-cyan-400" />
                  Overall Performance Score
                </h2>
                <div className="text-cyan-400 text-sm">
                  Updated: {new Date().toLocaleTimeString('en-IN')}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                    <div className="w-28 h-28 rounded-full bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{performanceScore}%</div>
                        <div className="text-cyan-300 text-sm">Score</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin"></div>
                </div>

                {/* Performance Breakdown */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(filteredData.performance).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`text-2xl font-bold ${getMetricColor(value)}`}>
                        {value}%
                      </div>
                      <div className="text-gray-400 text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${getMetricBgColor(value)}`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI Performance */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <FaTrendingUp className="text-green-400" />
                Key Performance Indicators
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.kpis.map((kpi, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-white font-semibold text-sm">{kpi.name}</div>
                      {getTrendIcon(kpi.trend)}
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <div className="text-2xl font-bold text-white">{kpi.current}{kpi.name.includes('Cost') ? '₹' : '%'}</div>
                      <div className={`text-sm ${getTrendColor(kpi.trend)}`}>
                        vs {kpi.target}{kpi.name.includes('Cost') ? '₹' : '%'} target
                      </div>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          kpi.current >= kpi.target ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(100, (kpi.current / kpi.target) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Charts Placeholder */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FaChartBar className="text-purple-400" />
                  Performance Trends
                </h2>
                <div className="flex gap-2">
                  {["punctuality", "utilization", "maintenance"].map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setActiveMetric(metric)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        activeMetric === metric
                          ? "bg-purple-500 text-white"
                          : "bg-gray-700 text-gray-400 hover:text-white"
                      }`}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Visualization Placeholder */}
              <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-cyan-400 font-semibold">
                    {activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)} Trend ({timeRange})
                  </h3>
                  <div className="text-gray-400 text-sm">
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
                
                {/* Simple bar chart representation */}
                <div className="h-64 flex items-end justify-between gap-2 pt-8">
                  {filteredData.trends.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ 
                          height: `${(data[activeMetric] / Math.max(...filteredData.trends.map(d => d[activeMetric]))) * 80}%`,
                          minHeight: '20px'
                        }}
                      ></div>
                      <div className="text-gray-400 text-xs mt-2">{data.month}</div>
                      <div className="text-white text-sm font-semibold mt-1">
                        {data[activeMetric]}{activeMetric !== 'maintenance' ? '%' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Insights & Details */}
          <div className="space-y-6">
            
            {/* Fleet Overview */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FaTrain className="text-cyan-400" />
                Fleet Overview
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400">{filteredData.fleetMetrics.totalTrains}</div>
                    <div className="text-blue-400 text-sm">Total Trains</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg border border-emerald-500/30">
                    <div className="text-2xl font-bold text-emerald-400">{filteredData.fleetMetrics.activeTrains}</div>
                    <div className="text-emerald-400 text-sm">Active</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
                    <div className="text-2xl font-bold text-amber-400">{filteredData.fleetMetrics.standbyTrains}</div>
                    <div className="text-amber-400 text-sm">Standby</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-rose-500/10 to-rose-600/10 rounded-lg border border-rose-500/30">
                    <div className="text-2xl font-bold text-rose-400">{filteredData.fleetMetrics.maintenanceTrains}</div>
                    <div className="text-rose-400 text-sm">Maintenance</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Average Mileage</span>
                    <span className="text-white">{filteredData.fleetMetrics.avgMileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Avg Operational Hours</span>
                    <span className="text-white">{filteredData.fleetMetrics.avgOperationalHours} hrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintenance Insights */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FaTools className="text-amber-400" />
                Maintenance Analytics
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/30">
                    <div className="text-2xl font-bold text-green-400">{filteredData.maintenance.completed}</div>
                    <div className="text-green-400 text-sm">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
                    <div className="text-2xl font-bold text-amber-400">{filteredData.maintenance.scheduled}</div>
                    <div className="text-amber-400 text-sm">Scheduled</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Overdue Maintenance</span>
                    <span className="text-rose-400 text-sm font-semibold">{filteredData.maintenance.overdue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Critical Issues</span>
                    <span className="text-red-400 text-sm font-semibold">{filteredData.maintenance.critical}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Avg Completion Time</span>
                    <span className="text-cyan-400 text-sm font-semibold">{filteredData.maintenance.avgCompletionTime}</span>
                  </div>
                </div>

                {filteredData.maintenance.critical > 0 && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-rose-400 text-sm">
                      <FaExclamationTriangle />
                      <span>Critical maintenance issues require attention</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Insights */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FaBolt className="text-yellow-400" />
                Quick Insights
              </h2>

              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-lg border border-emerald-500/30">
                  <div className="text-emerald-400 font-semibold text-sm">Excellent Performance</div>
                  <div className="text-gray-300 text-xs mt-1">
                    Punctuality at 99.5% exceeds target by 0.5%
                  </div>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-lg border border-cyan-500/30">
                  <div className="text-cyan-400 font-semibold text-sm">Optimal Utilization</div>
                  <div className="text-gray-300 text-xs mt-1">
                    Fleet utilization improved by 2.7% this quarter
                  </div>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
                  <div className="text-amber-400 font-semibold text-sm">Maintenance Alert</div>
                  <div className="text-gray-300 text-xs mt-1">
                    {filteredData.maintenance.critical} critical maintenance items pending
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/30">
                  <div className="text-purple-400 font-semibold text-sm">Cost Efficiency</div>
                  <div className="text-gray-300 text-xs mt-1">
                    Operating costs reduced by 6.1% vs target
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FaCog className="text-cyan-400" />
                AI Recommendations
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">Optimize Maintenance Schedule</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Reschedule non-critical maintenance to reduce standby time
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">Peak Hour Optimization</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Increase train frequency during 7-10 AM and 5-8 PM slots
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">Energy Efficiency</div>
                    <div className="text-gray-400 text-xs mt-1">
                      Implement regenerative braking on 3 additional trainsets
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 text-center bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 hover:from-cyan-500/20 hover:to-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2">
                  <FaArrowRight />
                  View Detailed Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Status */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Analytics Live
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaDatabase className="text-cyan-400" />
                Data Source: Operational Database
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FaSync className="text-blue-400" />
                Auto-refresh: 5 minutes
              </span>
            </div>
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <FaChartLine className="text-cyan-400" />
              🚇 KMRL Analytics Dashboard • Smart India Hackathon 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}