import React, { useState, useEffect } from "react";
import { useTimetable } from "../context/TimetableContext";
import { 
  initialTrains, 
  genTrainId, 
  genTrainName, 
  metroRoutes, 
  stablingBays, 
  brandingOptions,
  maintenanceTypes,
  getFleetStatistics,
  getMaintenanceAlerts
} from "../utils/dummyData";
import { Link } from "react-router-dom";
import { 
  FaPlus, 
  FaTrash, 
  FaSyncAlt, 
  FaCheck, 
  FaTimes, 
  FaEdit, 
  FaTrain,
  FaSearch,
  FaFilter,
  FaSort,
  FaEye,
  FaRoute,
  FaMapMarkerAlt,
  FaClock,
  FaCog,
  FaTachometerAlt,
  FaCertificate,
  FaTools,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaUsers,
  FaChartLine,
  FaCaretDown,
  FaCaretUp,
  FaWarehouse,
  FaShieldAlt,
  FaBolt,
  FaDatabase,
  FaLayerGroup,
  FaInfoCircle,
  FaRobot,
  FaChartBar,
  FaUserCog,
  FaExpand,
  FaCompress
} from "react-icons/fa";

export default function Timetable() {
  const { trains, addTrain, updateTrain, deleteTrain, runOptimizer } = useTimetable();
  const [showNew, setShowNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("train_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("table");
  const [selectedTrains, setSelectedTrains] = useState(new Set());
  const [fleetStats, setFleetStats] = useState({});
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [expandedTrain, setExpandedTrain] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [form, setForm] = useState({
    train_id: "",
    train_name: "",
    status: "Standby",
    mileage: 0,
    fitness_clearance: "yes",
    job_card_open: "no",
    branding: "None",
    needs_cleaning: false,
    stabling_bay: "",
    route: "Aluva to Thykoodam",
    capacity: 375,
    operational_hours: 0,
    branding_hours: 0,
    maintenance_priority: "low",
    last_maintenance: new Date().toISOString().split('T')[0],
    next_maintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    current_location: "Muttom Depot",
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: new Date().getFullYear(),
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    }
  });

  useEffect(() => {
    setFleetStats(getFleetStatistics());
    setMaintenanceAlerts(getMaintenanceAlerts());
  }, [trains]);

  const startNew = () => {
    setForm({
      train_id: genTrainId(),
      train_name: genTrainName(),
      status: "Standby",
      mileage: 0,
      fitness_clearance: "yes",
      job_card_open: "no",
      branding: "None",
      needs_cleaning: false,
      stabling_bay: "",
      route: "Aluva to Thykoodam",
      capacity: 375,
      operational_hours: 0,
      branding_hours: 0,
      maintenance_priority: "low",
      last_maintenance: new Date().toISOString().split('T')[0],
      next_maintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      current_location: "Muttom Depot",
      technical_specs: {
        manufacturer: "Alstom",
        model: "Metropolis",
        year: new Date().getFullYear(),
        max_speed: "80 km/h",
        power_supply: "750V DC Third Rail",
        bogie_type: "SGP-400"
      }
    });
    setShowNew(true);
  };

  const save = async () => {
    setIsAdding(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      addTrain(form);
      setShowNew(false);
      
      const successEvent = new CustomEvent('showToast', {
        detail: {
          message: `Train ${form.train_id} added successfully!`,
          type: 'success'
        }
      });
      window.dispatchEvent(successEvent);
    } catch (error) {
      const errorEvent = new CustomEvent('showToast', {
        detail: {
          message: 'Failed to add train. Please try again.',
          type: 'error'
        }
      });
      window.dispatchEvent(errorEvent);
    } finally {
      setIsAdding(false);
    }
  };

  const resetTimetable = () => {
    if (window.confirm("Are you sure you want to reset all train data? This will restore the original 25 trains.")) {
      trains.forEach(train => deleteTrain(train.train_id));
      setTimeout(() => {
        initialTrains.forEach((train) => addTrain(train));
        
        const successEvent = new CustomEvent('showToast', {
          detail: {
            message: 'Timetable reset successfully! 25 trains loaded.',
            type: 'success'
          }
        });
        window.dispatchEvent(successEvent);
      }, 300);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const toggleTrainSelection = (trainId) => {
    const newSelected = new Set(selectedTrains);
    if (newSelected.has(trainId)) {
      newSelected.delete(trainId);
    } else {
      newSelected.add(trainId);
    }
    setSelectedTrains(newSelected);
  };

  const selectAllTrains = () => {
    if (selectedTrains.size === filteredTrains.length) {
      setSelectedTrains(new Set());
    } else {
      setSelectedTrains(new Set(filteredTrains.map(train => train.train_id)));
    }
  };

  const bulkUpdateStatus = (newStatus) => {
    selectedTrains.forEach(trainId => {
      updateTrain(trainId, { status: newStatus });
    });
    setSelectedTrains(new Set());
    
    const successEvent = new CustomEvent('showToast', {
      detail: {
        message: `Updated ${selectedTrains.size} train(s) to ${newStatus}`,
        type: 'success'
      }
    });
    window.dispatchEvent(successEvent);
  };

  const toggleTrainExpansion = (trainId) => {
    setExpandedTrain(expandedTrain === trainId ? null : trainId);
  };

  const filteredTrains = trains
    .filter(train => {
      const matchesSearch = 
        train.train_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        train.train_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        train.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        train.current_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        train.branding.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || train.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || train.maintenance_priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "mileage":
          aValue = a.mileage;
          bValue = b.mileage;
          break;
        case "operational_hours":
          aValue = a.operational_hours;
          bValue = b.operational_hours;
          break;
        case "train_name":
          aValue = a.train_name;
          bValue = b.train_name;
          break;
        case "next_maintenance":
          aValue = new Date(a.next_maintenance);
          bValue = new Date(b.next_maintenance);
          break;
        case "maintenance_priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.maintenance_priority] || 0;
          bValue = priorityOrder[b.maintenance_priority] || 0;
          break;
        case "branding_hours":
          aValue = a.branding_hours;
          bValue = b.branding_hours;
          break;
        default:
          aValue = a.train_id;
          bValue = b.train_id;
      }

      if (typeof aValue === 'string') {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "Service": return "bg-emerald-500";
      case "Standby": return "bg-amber-500";
      case "Maintenance": return "bg-rose-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Service": return "text-emerald-400 font-semibold";
      case "Standby": return "text-amber-400 font-semibold";
      case "Maintenance": return "text-rose-400 font-semibold";
      default: return "text-gray-400 font-semibold";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Service": return "bg-emerald-500/20 border-emerald-500/30";
      case "Standby": return "bg-amber-500/20 border-amber-500/30";
      case "Maintenance": return "bg-rose-500/20 border-rose-500/30";
      default: return "bg-gray-500/20 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-rose-500";
      case "medium": return "bg-amber-500";
      case "low": return "bg-emerald-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityTextColor = (priority) => {
    switch (priority) {
      case "high": return "text-rose-400 font-semibold";
      case "medium": return "text-amber-400 font-semibold";
      case "low": return "text-emerald-400 font-semibold";
      default: return "text-gray-400 font-semibold";
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "high": return "bg-rose-500/20 border-rose-500/30";
      case "medium": return "bg-amber-500/20 border-amber-500/30";
      case "low": return "bg-emerald-500/20 border-emerald-500/30";
      default: return "bg-gray-500/20 border-gray-500/30";
    }
  };

  const getDaysUntilMaintenance = (date) => {
    const today = new Date();
    const maintenanceDate = new Date(date);
    const diffTime = maintenanceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMaintenanceUrgency = (days) => {
    if (days <= 0) return { level: "overdue", color: "text-rose-400", bg: "bg-rose-500/20", border: "border-rose-500/30" };
    if (days <= 3) return { level: "high", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" };
    if (days <= 7) return { level: "medium", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    return { level: "low", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
  };

  const SortableHeader = ({ column, children, icon: Icon }) => (
    <th 
      className="px-4 py-4 text-left text-gray-300 font-bold cursor-pointer hover:bg-cyan-500/10 transition-colors border-b border-gray-700 bg-gray-800/80"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-cyan-400 text-sm" />}
        <span className="text-gray-300 font-semibold">{children}</span>
        {sortBy === column && (
          sortOrder === "asc" ? <FaCaretUp className="text-cyan-400" /> : <FaCaretDown className="text-cyan-400" />
        )}
      </div>
    </th>
  );

  const totalMileage = trains.reduce((sum, train) => sum + train.mileage, 0);
  const totalOperationalHours = trains.reduce((sum, train) => sum + train.operational_hours, 0);
  const availableBays = stablingBays.filter(bay => !trains.some(train => train.stabling_bay === bay.id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      {/* Toast Notification Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2 max-w-sm"></div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-400 rounded-full blur-2xl animate-pulse-slow delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-purple-400 rounded-full blur-2xl animate-pulse-slow delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20">
              <FaTrain className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Fleet Management Center
              </h1>
              <p className="text-cyan-300 mt-2 text-lg">
                Managing <span className="font-semibold text-cyan-400">{fleetStats.total || 0}</span> trainsets across Kochi Metro network
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={startNew}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <FaPlus className="text-lg" /> 
              <span>Add New Train</span>
            </button>
            <button
              onClick={() => runOptimizer(6)}
              className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <FaBolt className="text-lg" /> 
              <span>Run AI Optimizer</span>
            </button>
            <button
              onClick={resetTimetable}
              className="flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-xl shadow-lg shadow-gray-500/25 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <FaDatabase className="text-lg" /> 
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Enhanced Fleet Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-700 hover:border-cyan-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-white">{fleetStats.total || 0}</div>
              <FaTrain className="text-cyan-400 text-xl" />
            </div>
            <div className="text-cyan-300 text-sm font-medium">Total Fleet</div>
            <div className="text-gray-400 text-xs mt-1">25 trainset capacity</div>
          </div>
          <div className="bg-emerald-500/10 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-emerald-400">{fleetStats.inService || 0}</div>
              <FaClock className="text-emerald-400 text-xl" />
            </div>
            <div className="text-emerald-300 text-sm font-medium">In Service</div>
            <div className="text-emerald-400/70 text-xs mt-1">Active routes</div>
          </div>
          <div className="bg-amber-500/10 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-amber-400">{fleetStats.standby || 0}</div>
              <FaCog className="text-amber-400 text-xl" />
            </div>
            <div className="text-amber-300 text-sm font-medium">On Standby</div>
            <div className="text-amber-400/70 text-xs mt-1">Ready to deploy</div>
          </div>
          <div className="bg-rose-500/10 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-rose-500/20 hover:border-rose-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-rose-400">{fleetStats.maintenance || 0}</div>
              <FaTools className="text-rose-400 text-xl" />
            </div>
            <div className="text-rose-300 text-sm font-medium">Maintenance</div>
            <div className="text-rose-400/70 text-xs mt-1">Under repair</div>
          </div>
          <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-blue-400">{availableBays}</div>
              <FaWarehouse className="text-blue-400 text-xl" />
            </div>
            <div className="text-blue-300 text-sm font-medium">Available Bays</div>
            <div className="text-blue-400/70 text-xs mt-1">For new trains</div>
          </div>
          <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl font-bold text-purple-400">{maintenanceAlerts.length}</div>
              <FaExclamationTriangle className="text-purple-400 text-xl" />
            </div>
            <div className="text-purple-300 text-sm font-medium">Alerts</div>
            <div className="text-purple-400/70 text-xs mt-1">Require attention</div>
          </div>
        </div>

        {/* Enhanced Controls Bar */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 w-full">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search trains, routes, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
              >
                <option value="all">All Status</option>
                <option value="Service">In Service</option>
                <option value="Standby">Standby</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <div className="flex gap-2">
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
                >
                  <option value="table">Table View</option>
                  <option value="grid">Grid View</option>
                  <option value="compact">Compact View</option>
                </select>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
                  title="Advanced Filters"
                >
                  <FaFilter />
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedTrains.size > 0 && (
              <div className="flex items-center gap-3 bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/20 backdrop-blur-sm">
                <span className="text-cyan-300 font-semibold text-sm">
                  {selectedTrains.size} train(s) selected
                </span>
                <select
                  onChange={(e) => bulkUpdateStatus(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-cyan-500/30 rounded-lg text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition text-sm font-medium"
                >
                  <option value="">Bulk Actions</option>
                  <option value="Service">Mark as Service</option>
                  <option value="Standby">Mark as Standby</option>
                  <option value="Maintenance">Mark as Maintenance</option>
                </select>
                <button
                  onClick={() => setSelectedTrains(new Set())}
                  className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-gray-300 transition text-sm font-medium"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-cyan-300 text-sm font-medium mb-2">Mileage Range</label>
                  <div className="flex items-center gap-2">
                    <input type="range" className="flex-1 accent-cyan-500" />
                    <span className="text-white text-sm">0 - 50,000 km</span>
                  </div>
                </div>
                <div>
                  <label className="block text-cyan-300 text-sm font-medium mb-2">Operational Hours</label>
                  <select className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm">
                    <option>Any</option>
                    <option>Less than 1000 hrs</option>
                    <option>1000 - 5000 hrs</option>
                    <option>More than 5000 hrs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-cyan-300 text-sm font-medium mb-2">Branding Status</label>
                  <select className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm">
                    <option>Any</option>
                    <option>Branded</option>
                    <option>Unbranded</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Maintenance Alerts */}
        {maintenanceAlerts.length > 0 && (
          <div className="bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-2xl p-5 border border-rose-500/20 mb-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-500/20 rounded-lg">
                <FaExclamationTriangle className="text-rose-400 text-xl" />
              </div>
              <h3 className="text-rose-300 font-bold text-lg">Upcoming Maintenance Alerts</h3>
              <span className="bg-rose-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                {maintenanceAlerts.length} alerts
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {maintenanceAlerts.slice(0, 4).map(alert => {
                const urgency = getMaintenanceUrgency(alert.days_until);
                return (
                  <div key={alert.train_id} className="bg-gray-800/60 rounded-xl p-4 border border-rose-500/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white font-bold text-sm">{alert.train_id}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${urgency.bg} ${urgency.color} border ${urgency.border}`}>
                        {alert.days_until} days
                      </span>
                    </div>
                    <div className="text-gray-200 text-sm font-medium mb-1">{alert.train_name}</div>
                    <div className="text-rose-400 text-xs font-semibold">Due: {alert.next_maintenance}</div>
                    <div className="text-gray-400 text-xs mt-1">Priority: {alert.priority}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Enhanced New Train Form */}
        {showNew && (
          <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30 mb-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <FaPlus className="text-emerald-400 text-xl" />
                </div>
                Add New Train to Fleet
              </h3>
              <button
                onClick={() => setShowNew(false)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-300 text-lg" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {[
                { label: "Train ID", value: form.train_id, onChange: (e) => setForm({ ...form, train_id: e.target.value }), type: "text" },
                { label: "Train Name", value: form.train_name, onChange: (e) => setForm({ ...form, train_name: e.target.value }), type: "text" },
                { label: "Mileage (km)", value: form.mileage, onChange: (e) => setForm({ ...form, mileage: Number(e.target.value) }), type: "number" },
                { label: "Operational Hours", value: form.operational_hours, onChange: (e) => setForm({ ...form, operational_hours: Number(e.target.value) }), type: "number" },
                { label: "Branding Hours", value: form.branding_hours, onChange: (e) => setForm({ ...form, branding_hours: Number(e.target.value) }), type: "number" },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-cyan-300 font-semibold mb-2 text-sm">{field.label}</label>
                  <input
                    type={field.type}
                    className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              ))}
              
              {[
                { 
                  label: "Status", 
                  value: form.status, 
                  onChange: (e) => setForm({ ...form, status: e.target.value }),
                  options: ["Service", "Standby", "Maintenance"]
                },
                { 
                  label: "Branding", 
                  value: form.branding, 
                  onChange: (e) => setForm({ ...form, branding: e.target.value }),
                  options: brandingOptions.map(opt => opt.name)
                },
                { 
                  label: "Stabling Bay", 
                  value: form.stabling_bay, 
                  onChange: (e) => setForm({ ...form, stabling_bay: e.target.value }),
                  options: ["", ...stablingBays.map(bay => bay.id)]
                },
                { 
                  label: "Route", 
                  value: form.route, 
                  onChange: (e) => setForm({ ...form, route: e.target.value }),
                  options: metroRoutes.map(route => route.name)
                },
                { 
                  label: "Maintenance Priority", 
                  value: form.maintenance_priority, 
                  onChange: (e) => setForm({ ...form, maintenance_priority: e.target.value }),
                  options: ["low", "medium", "high"]
                },
              ].map((select, index) => (
                <div key={index}>
                  <label className="block text-cyan-300 font-semibold mb-2 text-sm">{select.label}</label>
                  <select
                    className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
                    value={select.value}
                    onChange={select.onChange}
                  >
                    {select.options.map(option => (
                      <option key={option} value={option}>
                        {option === "" ? "Select Bay" : option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              
              <div>
                <label className="block text-cyan-300 font-semibold mb-2 text-sm">Next Maintenance</label>
                <input
                  type="date"
                  className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
                  value={form.next_maintenance}
                  onChange={(e) => setForm({ ...form, next_maintenance: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-cyan-300 font-semibold mb-2 text-sm">Current Location</label>
                <input
                  className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 font-medium backdrop-blur-sm"
                  value={form.current_location}
                  onChange={(e) => setForm({ ...form, current_location: e.target.value })}
                />
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600 backdrop-blur-sm">
                <input
                  type="checkbox"
                  checked={form.needs_cleaning}
                  onChange={(e) => setForm({ ...form, needs_cleaning: e.target.checked })}
                  className="w-5 h-5 accent-cyan-500"
                />
                <span className="text-white font-semibold text-sm">Requires Cleaning</span>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
              <h4 className="text-cyan-300 font-semibold mb-4 flex items-center gap-2">
                <FaCog className="text-cyan-400" />
                Technical Specifications
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-cyan-300 text-sm mb-2">Manufacturer</label>
                  <input
                    type="text"
                    value={form.technical_specs.manufacturer}
                    onChange={(e) => setForm({ 
                      ...form, 
                      technical_specs: { ...form.technical_specs, manufacturer: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-gray-600 border border-gray-500 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 text-sm mb-2">Model</label>
                  <input
                    type="text"
                    value={form.technical_specs.model}
                    onChange={(e) => setForm({ 
                      ...form, 
                      technical_specs: { ...form.technical_specs, model: e.target.value }
                    })}
                    className="w-full p-2 rounded-lg bg-gray-600 border border-gray-500 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 text-sm mb-2">Year</label>
                  <input
                    type="number"
                    value={form.technical_specs.year}
                    onChange={(e) => setForm({ 
                      ...form, 
                      technical_specs: { ...form.technical_specs, year: Number(e.target.value) }
                    })}
                    className="w-full p-2 rounded-lg bg-gray-600 border border-gray-500 text-white text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold"
                onClick={() => setShowNew(false)}
              >
                <FaTimes /> Cancel
              </button>
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg shadow-md shadow-emerald-500/25 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={save}
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaCheck /> Add Train to Fleet
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Trains Table */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
                  <th className="px-4 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTrains.size === filteredTrains.length && filteredTrains.length > 0}
                      onChange={selectAllTrains}
                      className="w-4 h-4 accent-cyan-500"
                    />
                  </th>
                  <th className="px-4 py-4 text-left text-gray-300 font-bold border-b border-gray-700 bg-gray-800/80">
                    <div className="flex items-center gap-2">
                      <FaExpand className="text-cyan-400 text-sm" />
                      <span>Details</span>
                    </div>
                  </th>
                  <SortableHeader column="train_id" icon={FaTrain}>
                    Train
                  </SortableHeader>
                  <SortableHeader column="train_name">
                    Name
                  </SortableHeader>
                  <SortableHeader column="status">
                    Status
                  </SortableHeader>
                  <SortableHeader column="maintenance_priority">
                    Priority
                  </SortableHeader>
                  <SortableHeader column="mileage" icon={FaTachometerAlt}>
                    Mileage
                  </SortableHeader>
                  <SortableHeader column="operational_hours" icon={FaClock}>
                    Hours
                  </SortableHeader>
                  <th className="px-4 py-4 text-left text-gray-300 font-bold border-b border-gray-700 bg-gray-800/80">
                    <div className="flex items-center gap-2">
                      <FaRoute className="text-cyan-400 text-sm" />
                      <span>Route</span>
                    </div>
                  </th>
                  <SortableHeader column="next_maintenance" icon={FaCalendarAlt}>
                    Next Maint.
                  </SortableHeader>
                  <th className="px-4 py-4 text-left text-gray-300 font-bold border-b border-gray-700 bg-gray-800/80">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/60">
                {filteredTrains.map((train, index) => {
                  const daysUntilMaintenance = getDaysUntilMaintenance(train.next_maintenance);
                  const maintenanceUrgency = getMaintenanceUrgency(daysUntilMaintenance);
                  const isExpanded = expandedTrain === train.train_id;
                  
                  return (
                    <React.Fragment key={train.train_id}>
                      <tr 
                        className={`hover:bg-cyan-500/5 transition-all duration-300 ${
                          selectedTrains.has(train.train_id) ? 'bg-cyan-500/10' : 
                          index % 2 === 0 ? 'bg-gray-700/30' : 'bg-gray-800/30'
                        } backdrop-blur-sm`}
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={selectedTrains.has(train.train_id)}
                            onChange={() => toggleTrainSelection(train.train_id)}
                            className="w-4 h-4 accent-cyan-500"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => toggleTrainExpansion(train.train_id)}
                            className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
                            title={isExpanded ? "Collapse details" : "Expand details"}
                          >
                            {isExpanded ? <FaCompress className="text-cyan-400" /> : <FaExpand className="text-cyan-400" />}
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-cyan-500/20 rounded-lg">
                              <FaTrain className="text-cyan-400" />
                            </div>
                            <div>
                              <Link 
                                to={`/t/${train.train_id}`}
                                className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors block text-sm"
                              >
                                {train.train_id}
                              </Link>
                              <div className="text-gray-400 text-xs mt-1 font-medium">
                                {train.technical_specs?.manufacturer} • {train.technical_specs?.model}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-white font-semibold text-sm">{train.train_name}</div>
                          <div className="text-gray-400 text-xs font-medium">
                            Cap: {train.capacity} passengers
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${getStatusBgColor(train.status)} border backdrop-blur-sm`}>
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(train.status)}`}></div>
                            <span className={`text-sm font-semibold ${getStatusTextColor(train.status)}`}>
                              {train.status}
                            </span>
                          </div>
                          {train.needs_cleaning && (
                            <div className="text-amber-400 text-xs mt-1 flex items-center gap-1 font-medium">
                              <FaCog /> Needs cleaning
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getPriorityBgColor(train.maintenance_priority)} border ${getPriorityTextColor(train.maintenance_priority)} backdrop-blur-sm`}>
                            {train.maintenance_priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-white font-bold">{train.mileage.toLocaleString()} km</div>
                          <div className="text-gray-400 text-xs font-medium">
                            {Math.round((train.mileage / 15000) * 100)}% of lifecycle
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-white font-semibold">{train.operational_hours} hrs</div>
                          <div className="text-gray-400 text-xs font-medium">
                            Branding: {train.branding_hours} hrs
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-gray-200 text-sm font-semibold">{train.route}</div>
                          <div className="text-gray-400 text-xs flex items-center gap-1 font-medium">
                            <FaShieldAlt className={train.fitness_clearance === 'yes' ? 'text-emerald-400' : 'text-rose-400'} />
                            {train.fitness_clearance === 'yes' ? 'Certified' : 'Needs certification'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className={`text-sm font-bold ${maintenanceUrgency.color}`}>
                            {train.next_maintenance}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full font-semibold ${maintenanceUrgency.bg} ${maintenanceUrgency.color} border ${maintenanceUrgency.border} backdrop-blur-sm`}>
                            {daysUntilMaintenance > 0 ? `${daysUntilMaintenance} days` : 'OVERDUE'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">
                            <Link
                              to={`/t/${train.train_id}`}
                              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-3 py-2 rounded-lg transition-all duration-300 text-sm font-semibold shadow-sm shadow-cyan-500/25"
                            >
                              <FaEye className="text-sm" /> Details
                            </Link>
                            <div className="flex gap-2">
                              <button
                                className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-2 py-2 rounded transition-all duration-300 text-xs font-semibold shadow-sm shadow-amber-500/25"
                                onClick={() => updateTrain(train.train_id, { needs_cleaning: !train.needs_cleaning })}
                                title={train.needs_cleaning ? "Mark as cleaned" : "Mark as dirty"}
                              >
                                {train.needs_cleaning ? <FaCheck /> : <FaEdit />}
                              </button>
                              <button
                                className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-2 py-2 rounded transition-all duration-300 text-xs font-semibold shadow-sm shadow-rose-500/25"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete ${train.train_id}? This action cannot be undone.`)) {
                                    deleteTrain(train.train_id);
                                  }
                                }}
                                title="Delete train"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr className="bg-gray-700/20 backdrop-blur-sm">
                          <td colSpan="11" className="px-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                              <div>
                                <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                                  <FaInfoCircle />
                                  Technical Details
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Manufacturer:</span>
                                    <span className="text-white">{train.technical_specs?.manufacturer}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Model:</span>
                                    <span className="text-white">{train.technical_specs?.model}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Max Speed:</span>
                                    <span className="text-white">{train.technical_specs?.max_speed}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                                  <FaChartBar />
                                  Operational Metrics
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Stabling Bay:</span>
                                    <span className="text-white">{train.stabling_bay || 'Not assigned'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Location:</span>
                                    <span className="text-white">{train.current_location}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Job Card:</span>
                                    <span className={train.job_card_open === 'yes' ? 'text-rose-400' : 'text-emerald-400'}>
                                      {train.job_card_open === 'yes' ? 'Open' : 'Closed'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                                  <FaUserCog />
                                  Compliance
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Fitness Clearance:</span>
                                    <span className={train.fitness_clearance === 'yes' ? 'text-emerald-400' : 'text-rose-400'}>
                                      {train.fitness_clearance === 'yes' ? 'Valid' : 'Required'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Branding:</span>
                                    <span className="text-white">{train.branding}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Last Maintenance:</span>
                                    <span className="text-white">{train.last_maintenance}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredTrains.length === 0 && (
            <div className="text-center py-16">
              <div className="p-4 bg-cyan-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaTrain className="text-cyan-400 text-2xl" />
              </div>
              <div className="text-white text-lg font-semibold mb-2">No trains found matching your criteria</div>
              <div className="text-gray-400 mb-4">Try adjusting your search or filters</div>
              <button
                onClick={startNew}
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold text-sm"
              >
                + Add your first train to get started
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Summary Footer */}
        <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20 shadow-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            <div>
              <div className="text-xl font-bold text-white">{filteredTrains.length}</div>
              <div className="text-cyan-300 text-sm font-semibold">Filtered Trains</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400">
                {filteredTrains.filter(t => t.status === "Service").length}
              </div>
              <div className="text-emerald-300 text-sm font-semibold">In Service</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-400">
                {filteredTrains.filter(t => t.status === "Standby").length}
              </div>
              <div className="text-amber-300 text-sm font-semibold">On Standby</div>
            </div>
            <div>
              <div className="text-xl font-bold text-rose-400">
                {filteredTrains.filter(t => t.status === "Maintenance").length}
              </div>
              <div className="text-rose-300 text-sm font-semibold">Maintenance</div>
            </div>
            <div>
              <div className="text-xl font-bold text-cyan-400">
                {filteredTrains.filter(t => t.maintenance_priority === "high").length}
              </div>
              <div className="text-cyan-300 text-sm font-semibold">High Priority</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-400">
                {maintenanceAlerts.length}
              </div>
              <div className="text-purple-300 text-sm font-semibold">Maintenance Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Toast Notification Component */}
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
              const textColor = 'text-white';
              
              toast.className = \`\${bgColor} \${textColor} p-4 rounded-xl shadow-lg font-semibold transform transition-all duration-300 translate-x-full backdrop-blur-sm border border-white/20\`;
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

      {/* Add custom animations to tailwind config */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}