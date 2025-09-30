import React from "react";
import Card from "../components/Card";
import { 
  FaTrain, 
  FaCogs, 
  FaClock, 
  FaChartLine, 
  FaTools,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBolt,
  FaCalendarAlt,
  FaShieldAlt,
  FaTachometerAlt
} from "react-icons/fa";
import { 
  MdSpeed, 
  MdAssessment, 
  MdTrendingUp,
  MdBarChart
} from "react-icons/md";

export default function Example() {
  // Sample data for demonstration
  const fleetData = {
    totalTrains: 25,
    inService: 18,
    standby: 4,
    maintenance: 3,
    utilization: 72,
    avgMileage: 15420,
    operationalHours: 2840
  };

  const performanceMetrics = [
    { label: "Punctuality", value: "99.2%", trend: "+0.3%", color: "text-emerald-400" },
    { label: "Efficiency", value: "94.7%", trend: "+1.2%", color: "text-cyan-400" },
    { label: "Availability", value: "88%", trend: "+2.1%", color: "text-blue-400" },
    { label: "Reliability", value: "98.5%", trend: "+0.5%", color: "text-green-400" }
  ];

  const maintenanceAlerts = [
    { id: 1, train: "T-07", issue: "Brake system inspection", priority: "high", days: 2 },
    { id: 2, train: "T-12", issue: "Scheduled maintenance", priority: "medium", days: 5 },
    { id: 3, train: "T-19", issue: "Bogie inspection", priority: "medium", days: 7 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            KMRL Fleet Management
          </h1>
          <p className="text-cyan-300 text-lg">
            Advanced monitoring and optimization dashboard
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Fleet Overview Card */}
          <Card 
            title="Fleet Overview" 
            icon={<FaTrain className="text-cyan-400" />} 
            footer={
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Last updated: Just now</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  Live
                </span>
              </div>
            }
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">{fleetData.totalTrains}</div>
                  <div className="text-blue-400 text-xs">Total Fleet</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg border border-emerald-500/30">
                  <div className="text-2xl font-bold text-emerald-400">{fleetData.inService}</div>
                  <div className="text-emerald-400 text-xs">In Service</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/30">
                  <div className="text-2xl font-bold text-amber-400">{fleetData.standby}</div>
                  <div className="text-amber-400 text-xs">Standby</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-rose-500/10 to-rose-600/10 rounded-lg border border-rose-500/30">
                  <div className="text-2xl font-bold text-rose-400">{fleetData.maintenance}</div>
                  <div className="text-rose-400 text-xs">Maintenance</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Fleet Utilization</span>
                  <span className="text-cyan-400">{fleetData.utilization}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${fleetData.utilization}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card 
            title="Performance Metrics" 
            icon={<MdAssessment className="text-emerald-400" />}
            footer="Real-time performance monitoring"
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="grid grid-cols-2 gap-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className={`text-xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-gray-400 text-xs mb-1">{metric.label}</div>
                  <div className="text-emerald-400 text-xs flex items-center justify-center gap-1">
                    <MdTrendingUp />
                    {metric.trend}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Maintenance Alerts */}
          <Card 
            title="Maintenance Alerts" 
            icon={<FaTools className="text-amber-400" />}
            footer={
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">3 pending actions</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <FaExclamationTriangle />
                  Attention Required
                </span>
              </div>
            }
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-amber-500/30 transition-all duration-300"
          >
            <div className="space-y-3">
              {maintenanceAlerts.map(alert => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.priority === 'high' 
                      ? 'bg-gradient-to-r from-rose-500/10 to-red-500/10 border-rose-500/30' 
                      : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-white text-sm">{alert.train}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.priority === 'high' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{alert.issue}</p>
                  <div className="text-rose-400 text-xs">
                    Due in {alert.days} day{alert.days !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Train Details */}
          <Card 
            title="Train T-07 Details" 
            icon={<FaTrain className="text-blue-400" />}
            footer="Muttom Depot • Last updated 5 mins ago"
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3">
                  <FaTachometerAlt className="text-blue-400" />
                  <div>
                    <div className="text-white font-semibold">Mileage</div>
                    <div className="text-blue-400">{fleetData.avgMileage.toLocaleString()} km</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg border border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <FaClock className="text-emerald-400" />
                  <div>
                    <div className="text-white font-semibold">Operational Hours</div>
                    <div className="text-emerald-400">{fleetData.operationalHours} hrs</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-cyan-400" />
                  <div>
                    <div className="text-white font-semibold">Status</div>
                    <div className="text-cyan-400 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      In Service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Optimizer Status */}
          <Card 
            title="AI Optimizer Status" 
            icon={<FaBolt className="text-yellow-400" />}
            footer="Smart scheduling algorithm v2.1"
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/30">
                <FaBolt className="text-yellow-400 text-2xl mx-auto mb-2" />
                <div className="text-white font-bold text-lg">AI Ready</div>
                <div className="text-gray-400 text-sm">Optimizer standing by</div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-emerald-500/20 rounded border border-emerald-500/30">
                  <div className="text-emerald-400 font-bold">{fleetData.inService}</div>
                  <div className="text-emerald-400 text-xs">In Service</div>
                </div>
                <div className="p-2 bg-amber-500/20 rounded border border-amber-500/30">
                  <div className="text-amber-400 font-bold">{fleetData.standby}</div>
                  <div className="text-amber-400 text-xs">Standby</div>
                </div>
                <div className="p-2 bg-rose-500/20 rounded border border-rose-500/30">
                  <div className="text-rose-400 font-bold">{fleetData.maintenance}</div>
                  <div className="text-rose-400 text-xs">Maintenance</div>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <FaBolt />
                Run Optimizer
              </button>
            </div>
          </Card>

          {/* System Analytics */}
          <Card 
            title="System Analytics" 
            icon={<MdBarChart className="text-purple-400" />}
            footer="Real-time data analytics dashboard"
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-green-400" />
                  <div>
                    <div className="text-white font-semibold">Network Efficiency</div>
                    <div className="text-green-400 text-sm">96.3% (+2.1%)</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaCogs className="text-cyan-400" />
                  <div>
                    <div className="text-white font-semibold">System Uptime</div>
                    <div className="text-cyan-400 text-sm">99.9%</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-blue-400" />
                  <div>
                    <div className="text-white font-semibold">Daily Trips</div>
                    <div className="text-blue-400 text-sm">284 scheduled</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg border border-gray-600">
                <div className="text-center text-gray-400 text-sm">
                  <FaCheckCircle className="text-emerald-400 mx-auto mb-1" />
                  All systems operational
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats Footer */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">25</div>
              <div className="text-gray-400 text-sm">Total Trains</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">18</div>
              <div className="text-gray-400 text-sm">Active Service</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">4</div>
              <div className="text-gray-400 text-sm">Ready Standby</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-rose-400">3</div>
              <div className="text-gray-400 text-sm">Maintenance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}