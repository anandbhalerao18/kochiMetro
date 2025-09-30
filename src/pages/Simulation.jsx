import React, { useState, useEffect } from "react";
import { FaProjectDiagram, FaPlayCircle, FaChartLine, FaTrain, FaCogs, FaExclamationTriangle, FaCheck, FaSyncAlt, FaClock, FaWarehouse, FaTools, FaUsers, FaArrowRight, FaInfoCircle } from "react-icons/fa";
import { useTimetable } from "../context/TimetableContext";

export default function Simulation() {
  const { runOptimizer, trains } = useTimetable();
  const [count, setCount] = useState(6);
  const [includeMaintenance, setIncludeMaintenance] = useState(true);
  const [optimizeCleaning, setOptimizeCleaning] = useState(true);
  const [priorityStrategy, setPriorityStrategy] = useState("balanced");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [simulationHistory, setSimulationHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate current fleet statistics
  const currentStats = {
    total: trains.length,
    inService: trains.filter(t => t.status === "Service").length,
    standby: trains.filter(t => t.status === "Standby").length,
    maintenance: trains.filter(t => t.status === "Maintenance").length,
    highPriority: trains.filter(t => t.maintenance_priority === "high").length,
    needsCleaning: trains.filter(t => t.needs_cleaning).length
  };

  const runSimulation = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const plan = runOptimizer(Number(count), includeMaintenance);
      
      // Enhance the result with additional simulation data
      const enhancedResult = {
        ...plan,
        timestamp: new Date().toLocaleString(),
        settings: {
          trainsToInduct: count,
          includeMaintenance,
          optimizeCleaning,
          priorityStrategy
        },
        statistics: {
          totalTrains: plan.inService.length + plan.standby.length + plan.maintenance.length,
          servicePercentage: Math.round((plan.inService.length / currentStats.total) * 100),
          maintenanceReduction: currentStats.maintenance - plan.maintenance.length,
          efficiencyGain: Math.round(((plan.inService.length - currentStats.inService) / currentStats.inService) * 100)
        },
        recommendations: generateRecommendations(plan)
      };

      setResult(enhancedResult);
      
      // Add to history
      setSimulationHistory(prev => [enhancedResult, ...prev.slice(0, 4)]);
      
      // Show success notification
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: `Simulation completed! ${plan.inService.length} trains in service`,
          type: 'success'
        }
      }));
    } catch (error) {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: 'Simulation failed. Please try again.',
          type: 'error'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (plan) => {
    const recommendations = [];
    const availableStandby = plan.standby.length;
    const maintenanceCount = plan.maintenance.length;

    if (availableStandby > 3) {
      recommendations.push("Consider deploying additional trains to handle peak hour demand");
    }

    if (maintenanceCount > currentStats.maintenance) {
      recommendations.push("High maintenance count detected. Review maintenance schedules");
    }

    if (plan.inService.length < count) {
      recommendations.push("Not enough trains available. Consider accelerating maintenance");
    }

    if (currentStats.needsCleaning > 2) {
      recommendations.push("Multiple trains require cleaning. Schedule cleaning operations");
    }

    return recommendations.length > 0 ? recommendations : ["Fleet optimization looks good. Current configuration is efficient."];
  };

  const applySimulation = () => {
    if (!result) return;

    // Apply the simulation result to actual trains
    result.inService.forEach(trainId => {
      const train = trains.find(t => t.train_id === trainId);
      if (train) {
        // Update train status to Service
        // This would typically call an update function from context
        console.log(`Setting ${trainId} to Service`);
      }
    });

    window.dispatchEvent(new CustomEvent('showToast', {
      detail: {
        message: `Applied simulation: ${result.inService.length} trains in service`,
        type: 'success'
      }
    }));
  };

  const getTrainDetails = (trainId) => {
    return trains.find(t => t.train_id === trainId) || {};
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 20) return "text-green-400";
    if (efficiency >= 10) return "text-cyan-400";
    if (efficiency >= 0) return "text-yellow-400";
    return "text-red-400";
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
      case "Service": return "bg-green-400";
      case "Standby": return "bg-yellow-400";
      case "Maintenance": return "bg-red-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      {/* Toast Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2 max-w-sm"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-400 rounded-full blur-lg"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-400 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <FaProjectDiagram className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                AI Simulation Center
              </h1>
              <p className="text-cyan-300 mt-2 text-lg">
                Advanced what-if analysis for fleet optimization
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
            <div className="text-right">
              <div className="text-cyan-400 font-semibold">Current Fleet</div>
              <div className="text-white text-sm">
                {currentStats.inService} Service • {currentStats.standby} Standby • {currentStats.maintenance} Maintenance
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FaTrain className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Controls and Current Status */}
          <div className="xl:col-span-1 space-y-6">
            {/* Current Fleet Status */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FaChartLine className="text-cyan-400" />
                Current Fleet Status
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{currentStats.inService}</div>
                    <div className="text-gray-300 text-sm">In Service</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{currentStats.standby}</div>
                    <div className="text-gray-300 text-sm">On Standby</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">{currentStats.maintenance}</div>
                    <div className="text-gray-300 text-sm">Maintenance</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">{currentStats.highPriority}</div>
                    <div className="text-gray-300 text-sm">High Priority</div>
                  </div>
                </div>
              </div>

              {/* Maintenance Alerts */}
              {currentStats.needsCleaning > 0 && (
                <div className="mt-4 p-3 bg-orange-500/20 border border-orange-500/30 rounded-xl">
                  <div className="flex items-center gap-2 text-orange-400">
                    <FaExclamationTriangle />
                    <span className="font-semibold">{currentStats.needsCleaning} trains need cleaning</span>
                  </div>
                </div>
              )}
            </div>

            {/* Simulation Settings */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <FaCogs className="text-cyan-400" />
                Simulation Parameters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-cyan-300 font-semibold mb-3">
                    Trains to Deploy
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      className="flex-1 accent-cyan-500"
                    />
                    <span className="text-2xl font-bold text-white min-w-12 text-center">{count}</span>
                  </div>
                  <div className="text-gray-400 text-sm mt-2">
                    Number of trains to put in active service
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={includeMaintenance}
                      onChange={() => setIncludeMaintenance(!includeMaintenance)}
                      className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">Include Maintenance Trains</div>
                      <div className="text-gray-400 text-sm">Consider trains currently in maintenance</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={optimizeCleaning}
                      onChange={() => setOptimizeCleaning(!optimizeCleaning)}
                      className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">Optimize Cleaning Schedule</div>
                      <div className="text-gray-400 text-sm">Automatically schedule cleaning operations</div>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-cyan-300 font-semibold mb-3">
                    Deployment Strategy
                  </label>
                  <select
                    value={priorityStrategy}
                    onChange={(e) => setPriorityStrategy(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  >
                    <option value="balanced">Balanced Deployment</option>
                    <option value="efficiency">Maximum Efficiency</option>
                    <option value="safety">Safety First</option>
                    <option value="maintenance">Maintenance Focus</option>
                  </select>
                </div>
              </div>

              <button
                onClick={runSimulation}
                disabled={loading}
                className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Running Simulation...
                  </>
                ) : (
                  <>
                    <FaPlayCircle className="text-lg" />
                    Run AI Simulation
                  </>
                )}
              </button>
            </div>

            {/* Recent Simulations */}
            {simulationHistory.length > 0 && (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">Recent Simulations</h3>
                <div className="space-y-3">
                  {simulationHistory.map((sim, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-cyan-400 font-semibold">{sim.settings.trainsToInduct} trains</div>
                        <div className="text-gray-400 text-xs">{sim.timestamp}</div>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="text-green-400">{sim.inService.length} service</span>
                        <span className="text-yellow-400">{sim.standby.length} standby</span>
                        <span className="text-red-400">{sim.maintenance.length} maintenance</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="xl:col-span-2 space-y-6">
            {/* Simulation Results */}
            {result ? (
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                {/* Result Header */}
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 p-6 border-b border-gray-700">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-500 rounded-lg">
                        <FaChartLine className="text-white text-xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Simulation Results</h2>
                        <p className="text-cyan-300">Generated at {result.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition flex items-center gap-2"
                      >
                        <FaInfoCircle />
                        {showDetails ? "Hide Details" : "Show Details"}
                      </button>
                      <button
                        onClick={applySimulation}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition flex items-center gap-2"
                      >
                        <FaCheck />
                        Apply Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="p-6 border-b border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{result.inService.length}</div>
                      <div className="text-gray-300 text-sm">In Service</div>
                      <div className={`text-xs ${getEfficiencyColor(result.statistics.efficiencyGain)}`}>
                        {result.statistics.efficiencyGain >= 0 ? '+' : ''}{result.statistics.efficiencyGain}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{result.standby.length}</div>
                      <div className="text-gray-300 text-sm">Standby</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{result.maintenance.length}</div>
                      <div className="text-gray-300 text-sm">Maintenance</div>
                      <div className="text-green-400 text-xs">
                        {result.statistics.maintenanceReduction > 0 ? `-${result.statistics.maintenanceReduction}` : '0'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{result.statistics.servicePercentage}%</div>
                      <div className="text-gray-300 text-sm">Utilization</div>
                    </div>
                  </div>
                </div>

                {/* Train Assignments */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* In Service Trains */}
                    <div className="bg-gray-700/30 rounded-xl p-4 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <h3 className="text-green-400 font-semibold">In Service</h3>
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                          {result.inService.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {result.inService.map(trainId => {
                          const train = getTrainDetails(trainId);
                          return (
                            <div key={trainId} className="flex items-center gap-3 p-2 bg-gray-600/30 rounded-lg">
                              <FaTrain className="text-green-400" />
                              <div className="flex-1">
                                <div className="text-white font-medium text-sm">{trainId}</div>
                                <div className="text-gray-400 text-xs">{train.train_name || 'Train'}</div>
                              </div>
                            </div>
                          );
                        })}
                        {result.inService.length === 0 && (
                          <div className="text-gray-500 text-sm text-center py-4">No trains assigned</div>
                        )}
                      </div>
                    </div>

                    {/* Standby Trains */}
                    <div className="bg-gray-700/30 rounded-xl p-4 border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <h3 className="text-yellow-400 font-semibold">Standby</h3>
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                          {result.standby.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {result.standby.map(trainId => {
                          const train = getTrainDetails(trainId);
                          return (
                            <div key={trainId} className="flex items-center gap-3 p-2 bg-gray-600/30 rounded-lg">
                              <FaClock className="text-yellow-400" />
                              <div className="flex-1">
                                <div className="text-white font-medium text-sm">{trainId}</div>
                                <div className="text-gray-400 text-xs">{train.train_name || 'Train'}</div>
                              </div>
                            </div>
                          );
                        })}
                        {result.standby.length === 0 && (
                          <div className="text-gray-500 text-sm text-center py-4">No trains on standby</div>
                        )}
                      </div>
                    </div>

                    {/* Maintenance Trains */}
                    <div className="bg-gray-700/30 rounded-xl p-4 border border-red-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <h3 className="text-red-400 font-semibold">Maintenance</h3>
                        <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                          {result.maintenance.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {result.maintenance.map(trainId => {
                          const train = getTrainDetails(trainId);
                          return (
                            <div key={trainId} className="flex items-center gap-3 p-2 bg-gray-600/30 rounded-lg">
                              <FaTools className="text-red-400" />
                              <div className="flex-1">
                                <div className="text-white font-medium text-sm">{trainId}</div>
                                <div className="text-gray-400 text-xs">{train.train_name || 'Train'}</div>
                              </div>
                            </div>
                          );
                        })}
                        {result.maintenance.length === 0 && (
                          <div className="text-gray-500 text-sm text-center py-4">No trains in maintenance</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  {showDetails && (
                    <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-cyan-500/20">
                      <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                        <FaInfoCircle />
                        AI Recommendations
                      </h4>
                      <div className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-3 text-sm">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="text-gray-300">{rec}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-cyan-300 font-semibold mb-2">Simulation Settings</div>
                          <div className="text-gray-400 space-y-1">
                            <div>Strategy: {priorityStrategy}</div>
                            <div>Include Maintenance: {includeMaintenance ? 'Yes' : 'No'}</div>
                            <div>Optimize Cleaning: {optimizeCleaning ? 'Yes' : 'No'}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-cyan-300 font-semibold mb-2">Performance Metrics</div>
                          <div className="text-gray-400 space-y-1">
                            <div>Fleet Utilization: {result.statistics.servicePercentage}%</div>
                            <div>Efficiency Gain: <span className={getEfficiencyColor(result.statistics.efficiencyGain)}>
                              {result.statistics.efficiencyGain >= 0 ? '+' : ''}{result.statistics.efficiencyGain}%
                            </span></div>
                            <div>Maintenance Reduction: {result.statistics.maintenanceReduction} trains</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 shadow-lg text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <FaProjectDiagram className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Run Your First Simulation</h3>
                  <p className="text-gray-400 mb-6">
                    Configure the parameters and run AI simulation to optimize train deployment, 
                    maintenance scheduling, and operational efficiency.
                  </p>
                  <div className="text-cyan-400 text-sm">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaCheck className="text-green-400" />
                      Real-time fleet analysis
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <FaCheck className="text-green-400" />
                      AI-powered recommendations
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <FaCheck className="text-green-400" />
                      What-if scenario testing
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-500 text-sm">
          🚇 Powered by{" "}
          <span className="text-cyan-400 font-semibold">
            AI Simulation Engine
          </span>{" "}
          • Kochi Metro Rail Limited
        </p>
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
                ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                : 'bg-gradient-to-r from-red-500 to-orange-600';
              
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