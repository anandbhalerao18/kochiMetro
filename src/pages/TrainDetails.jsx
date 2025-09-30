import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTimetable } from "../context/TimetableContext";
import { metroRoutes, stablingBays, brandingOptions, maintenanceTypes } from "../utils/dummyData";
import { 
  FaArrowLeft, 
  FaSave, 
  FaUndo, 
  FaInfoCircle, 
  FaTrain,
  FaRoute,
  FaMapMarkerAlt,
  FaClock,
  FaTachometerAlt,
  FaCertificate,
  FaTools,
  FaCalendarAlt,
  FaUserCog,
  FaShieldAlt,
  FaCog,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaHistory,
  FaChartLine,
  FaWarehouse,
  FaBolt,
  FaSyncAlt,
  FaExpand,
  FaCompress,
  FaDatabase,
  FaMobileAlt,
  FaCloud,
  FaMicrochip
} from "react-icons/fa";

export default function TrainDetails() {
  const { tId } = useParams(); 
  const navigate = useNavigate();
  const { getTrain, updateTrain, trains } = useTimetable();
  const train = getTrain(tId);
  const [form, setForm] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (train) {
      setForm({ 
        ...train,
        certification: train.certification || {
          rolling_stock: "",
          signalling: "",
          telecom: ""
        }
      });
    }
  }, [train]);

  if (!train)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 text-center max-w-md shadow-2xl">
          <div className="w-20 h-20 bg-red-500/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <FaTrain className="text-red-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Train Not Found</h2>
          <p className="text-gray-400 mb-6">The requested train {tId} could not be found in the system.</p>
          <button
            onClick={() => navigate("/timetable")}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 mx-auto transform hover:scale-105"
          >
            <FaArrowLeft /> Return to Fleet Management
          </button>
        </div>
      </div>
    );

  const saveChanges = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      updateTrain(train.train_id, form);
      setIsEditing(false);
      
      // Show success toast
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: `Train ${train.train_id} updated successfully!`,
          type: 'success'
        }
      }));
    } catch (error) {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          message: 'Failed to update train. Please try again.',
          type: 'error'
        }
      }));
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm(train);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Service": return "text-emerald-400";
      case "Standby": return "text-amber-400";
      case "Maintenance": return "text-rose-400";
      default: return "text-gray-400";
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
      case "high": return "text-rose-400";
      case "medium": return "text-amber-400";
      case "low": return "text-emerald-400";
      default: return "text-gray-400";
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
    if (days <= 0) return { level: "overdue", color: "text-rose-400", bg: "bg-rose-500/20" };
    if (days <= 3) return { level: "high", color: "text-rose-400", bg: "bg-rose-500/10" };
    if (days <= 7) return { level: "medium", color: "text-amber-400", bg: "bg-amber-500/10" };
    return { level: "low", color: "text-emerald-400", bg: "bg-emerald-500/10" };
  };

  const maintenanceUrgency = form?.next_maintenance ? getMaintenanceUrgency(getDaysUntilMaintenance(form.next_maintenance)) : null;

  // Calculate statistics
  const totalTrains = trains.length;
  const similarStatusTrains = trains.filter(t => t.status === form?.status).length;
  const highPriorityTrains = trains.filter(t => t.maintenance_priority === "high").length;

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
              <FaTrain className="text-white text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  {form?.train_name}
                </h1>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusBgColor(form?.status)} border ${getStatusColor(form?.status)}`}>
                  {form?.status}
                </span>
              </div>
              <p className="text-cyan-300 text-lg">
                Train ID: <span className="font-mono font-bold">{train.train_id}</span> • Kochi Metro Rail Limited
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/timetable")}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <FaArrowLeft /> Back to Fleet
            </button>
            {isEditing ? (
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <FaUndo /> Cancel Edit
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <FaEdit /> Edit Train
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="text-cyan-300 text-sm font-medium mb-1">Total Mileage</div>
            <div className="text-white font-bold text-xl">{form?.mileage?.toLocaleString()} km</div>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="text-cyan-300 text-sm font-medium mb-1">Operational Hours</div>
            <div className="text-white font-bold text-xl">{form?.operational_hours} hrs</div>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="text-cyan-300 text-sm font-medium mb-1">Next Maintenance</div>
            <div className="text-white font-bold text-xl">{form?.next_maintenance ? getDaysUntilMaintenance(form.next_maintenance) : 'N/A'} days</div>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="text-cyan-300 text-sm font-medium mb-1">Maintenance Priority</div>
            <div className={`font-bold text-xl ${getPriorityColor(form?.maintenance_priority)}`}>
              {form?.maintenance_priority?.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
              {/* Navigation Tabs */}
              <div className="border-b border-gray-700">
                <div className="flex overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview", icon: FaInfoCircle },
                    { id: "operations", label: "Operations", icon: FaTachometerAlt },
                    { id: "maintenance", label: "Maintenance", icon: FaTools },
                    { id: "certification", label: "Certification", icon: FaShieldAlt },
                    { id: "technical", label: "Technical", icon: FaCog }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-cyan-500 text-cyan-400 bg-cyan-500/10"
                          : "border-transparent text-gray-400 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <tab.icon className="text-lg" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FaInfoCircle className="text-cyan-400" />
                        Train Overview & Configuration
                      </h2>
                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                      >
                        {showAdvanced ? <FaCompress /> : <FaExpand />}
                        {showAdvanced ? "Basic View" : "Advanced View"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Basic Information
                        </h3>
                        
                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Train ID</label>
                          <input
                            value={form?.train_id || ""}
                            onChange={(e) => setForm({ ...form, train_id: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Train Name</label>
                          <input
                            value={form?.train_name || ""}
                            onChange={(e) => setForm({ ...form, train_name: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Operational Status</label>
                          <select
                            value={form?.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="Service">In Service</option>
                            <option value="Standby">On Standby</option>
                            <option value="Maintenance">Under Maintenance</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Assigned Route</label>
                          <select
                            value={form?.route}
                            onChange={(e) => setForm({ ...form, route: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {metroRoutes.map(route => (
                              <option key={route.id} value={route.name}>{route.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Location & Branding */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Location & Branding
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Current Location</label>
                          <input
                            value={form?.current_location || ""}
                            onChange={(e) => setForm({ ...form, current_location: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Stabling Bay</label>
                          <select
                            value={form?.stabling_bay}
                            onChange={(e) => setForm({ ...form, stabling_bay: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select Stabling Bay</option>
                            {stablingBays.map(bay => (
                              <option key={bay.id} value={bay.id}>{bay.id} - {bay.type} ({bay.location})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Branding</label>
                          <select
                            value={form?.branding}
                            onChange={(e) => setForm({ ...form, branding: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {brandingOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Passenger Capacity</label>
                          <input
                            type="number"
                            value={form?.capacity || 375}
                            onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Advanced Technical Details */}
                    {showAdvanced && (
                      <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                        <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                          <FaMicrochip className="text-cyan-400" />
                          Advanced Technical Configuration
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-cyan-300 text-sm mb-2">Manufacturer</label>
                            <input
                              value={form?.technical_specs?.manufacturer || ""}
                              onChange={(e) => setForm({ 
                                ...form, 
                                technical_specs: { ...form.technical_specs, manufacturer: e.target.value }
                              })}
                              disabled={!isEditing}
                              className="w-full p-2 rounded-lg bg-gray-600 border border-gray-500 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-cyan-300 text-sm mb-2">Model</label>
                            <input
                              value={form?.technical_specs?.model || ""}
                              onChange={(e) => setForm({ 
                                ...form, 
                                technical_specs: { ...form.technical_specs, model: e.target.value }
                              })}
                              disabled={!isEditing}
                              className="w-full p-2 rounded-lg bg-gray-600 border border-gray-500 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-cyan-300 text-sm mb-2">Year</label>
                            <input
                              type="number"
                              value={form?.technical_specs?.year || new Date().getFullYear()}
                              onChange={(e) => setForm({ 
                                ...form, 
                                technical_specs: { ...form.technical_specs, year: Number(e.target.value) }
                              })}
                              disabled={!isEditing}
                              className="w-full p-2 rounded-lg bg-gray-600 border border-gray-500 text-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-cyan-300 text-sm mb-2">Max Speed</label>
                            <input
                              value={form?.technical_specs?.max_speed || ""}
                              onChange={(e) => setForm({ 
                                ...form, 
                                technical_specs: { ...form.technical_specs, max_speed: e.target.value }
                              })}
                              disabled={!isEditing}
                              className="w-full p-2 rounded-lg bg-gray-600 border border-gray-500 text-white text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Operations Tab */}
                {activeTab === "operations" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                      <FaTachometerAlt className="text-cyan-400" />
                      Operational Performance & Metrics
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Usage Metrics
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Total Mileage (km)</label>
                          <input
                            type="number"
                            value={form?.mileage || 0}
                            onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <div className="text-gray-400 text-sm mt-1">
                            Lifecycle: {Math.round((form?.mileage / 15000) * 100)}% completed
                          </div>
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Operational Hours</label>
                          <input
                            type="number"
                            value={form?.operational_hours || 0}
                            onChange={(e) => setForm({ ...form, operational_hours: Number(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Branding & Additional
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Branding Hours</label>
                          <input
                            type="number"
                            value={form?.branding_hours || 0}
                            onChange={(e) => setForm({ ...form, branding_hours: Number(e.target.value) })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <div className="text-gray-400 text-sm mt-1">
                            Contract exposure: {Math.round((form?.branding_hours / 1500) * 100)}% utilized
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                          <input
                            type="checkbox"
                            checked={form?.needs_cleaning || false}
                            onChange={(e) => setForm({ ...form, needs_cleaning: e.target.checked })}
                            disabled={!isEditing}
                            className="w-5 h-5 accent-cyan-500"
                          />
                          <div>
                            <span className="text-white font-medium">Requires Cleaning</span>
                            <div className="text-gray-400 text-sm">Interior deep-cleaning required</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Charts Placeholder */}
                    <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                        <FaChartLine className="text-cyan-400" />
                        Performance Analytics
                      </h3>
                      <div className="text-gray-400 text-center py-8">
                        <FaChartLine className="text-4xl text-gray-600 mx-auto mb-2" />
                        <p>Performance charts and analytics would be displayed here</p>
                        <p className="text-sm">Showing operational efficiency, maintenance history, and utilization metrics</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Maintenance Tab */}
                {activeTab === "maintenance" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                      <FaTools className="text-cyan-400" />
                      Maintenance & Service History
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Current Status
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Maintenance Priority</label>
                          <select
                            value={form?.maintenance_priority}
                            onChange={(e) => setForm({ ...form, maintenance_priority: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Fitness Clearance</label>
                          <select
                            value={form?.fitness_clearance}
                            onChange={(e) => setForm({ ...form, fitness_clearance: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="yes">Cleared for Service</option>
                            <option value="no">Not Cleared</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Job Card Status</label>
                          <select
                            value={form?.job_card_open}
                            onChange={(e) => setForm({ ...form, job_card_open: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="no">All Jobs Closed</option>
                            <option value="yes">Open Jobs Exist</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Schedule & History
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Last Maintenance Date</label>
                          <input
                            type="date"
                            value={form?.last_maintenance || ""}
                            onChange={(e) => setForm({ ...form, last_maintenance: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Next Maintenance Date</label>
                          <input
                            type="date"
                            value={form?.next_maintenance || ""}
                            onChange={(e) => setForm({ ...form, next_maintenance: e.target.value })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          {maintenanceUrgency && (
                            <div className={`text-sm mt-1 px-3 py-1 rounded-full font-semibold ${maintenanceUrgency.bg} ${maintenanceUrgency.color}`}>
                              {getDaysUntilMaintenance(form.next_maintenance) > 0 
                                ? `${getDaysUntilMaintenance(form.next_maintenance)} days until maintenance`
                                : 'MAINTENANCE OVERDUE'
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Maintenance History Placeholder */}
                    <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                        <FaHistory className="text-cyan-400" />
                        Maintenance History
                      </h3>
                      <div className="text-gray-400 text-center py-8">
                        <FaHistory className="text-4xl text-gray-600 mx-auto mb-2" />
                        <p>Maintenance history and service records would be displayed here</p>
                        <p className="text-sm">Showing past maintenance events, parts replaced, and service costs</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Certification Tab */}
                {activeTab === "certification" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                      <FaShieldAlt className="text-cyan-400" />
                      Certification & Compliance
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Department Certifications
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Rolling Stock Certificate</label>
                          <input
                            type="date"
                            value={form?.certification?.rolling_stock || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              certification: { 
                                ...form.certification, 
                                rolling_stock: e.target.value 
                              } 
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Signalling Certificate</label>
                          <input
                            type="date"
                            value={form?.certification?.signalling || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              certification: { 
                                ...form.certification, 
                                signalling: e.target.value 
                              } 
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Telecom Certificate</label>
                          <input
                            type="date"
                            value={form?.certification?.telecom || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              certification: { 
                                ...form.certification, 
                                telecom: e.target.value 
                              } 
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Compliance Status
                        </h3>
                        
                        <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-medium">Overall Compliance Status</span>
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <FaCheckCircle /> Compliant
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Safety Standards</span>
                              <span className="text-emerald-400">Met</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Operational Readiness</span>
                              <span className="text-emerald-400">Ready</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Maintenance Compliance</span>
                              <span className={form?.maintenance_priority === "high" ? "text-amber-400" : "text-emerald-400"}>
                                {form?.maintenance_priority === "high" ? "Monitoring" : "Compliant"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <div className="flex items-center gap-2 text-amber-400 mb-2">
                            <FaExclamationTriangle />
                            <span className="font-semibold">Attention Required</span>
                          </div>
                          <p className="text-amber-300 text-sm">
                            {form?.next_maintenance && getDaysUntilMaintenance(form.next_maintenance) <= 7 
                              ? `Scheduled maintenance due in ${getDaysUntilMaintenance(form.next_maintenance)} days`
                              : "All certifications are current and valid"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Tab */}
                {activeTab === "technical" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                      <FaCog className="text-cyan-400" />
                      Technical Specifications
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Core Specifications
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Manufacturer</label>
                          <input
                            value={form?.technical_specs?.manufacturer || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              technical_specs: { ...form.technical_specs, manufacturer: e.target.value }
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Model</label>
                          <input
                            value={form?.technical_specs?.model || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              technical_specs: { ...form.technical_specs, model: e.target.value }
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Year of Manufacture</label>
                          <input
                            type="number"
                            value={form?.technical_specs?.year || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              technical_specs: { ...form.technical_specs, year: Number(e.target.value) }
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-cyan-300 border-b border-gray-700 pb-2">
                          Performance Specs
                        </h3>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Maximum Speed</label>
                          <input
                            value={form?.technical_specs?.max_speed || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              technical_specs: { ...form.technical_specs, max_speed: e.target.value }
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Power Supply</label>
                          <input
                            value={form?.technical_specs?.power_supply || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              technical_specs: { ...form.technical_specs, power_supply: e.target.value }
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-cyan-300 font-medium mb-2">Bogie Type</label>
                          <input
                            value={form?.technical_specs?.bogie_type || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              technical_specs: { ...form.technical_specs, bogie_type: e.target.value }
                            })}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* System Information */}
                    <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                        <FaMicrochip className="text-cyan-400" />
                        System Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 bg-gray-600/30 rounded-lg">
                          <div className="text-cyan-300 font-medium mb-1">Car Configuration</div>
                          <div className="text-white">4-car trainset</div>
                        </div>
                        <div className="p-3 bg-gray-600/30 rounded-lg">
                          <div className="text-cyan-300 font-medium mb-1">Train Length</div>
                          <div className="text-white">~80 meters</div>
                        </div>
                        <div className="p-3 bg-gray-600/30 rounded-lg">
                          <div className="text-cyan-300 font-medium mb-1">Weight</div>
                          <div className="text-white">~140 tons</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
                    <button
                      onClick={resetForm}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    >
                      <FaUndo /> Discard Changes
                    </button>
                    <button
                      onClick={saveChanges}
                      disabled={saving}
                      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Overview Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-cyan-400" />
                Status Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Operational Status</span>
                  <span className={`font-semibold ${getStatusColor(form?.status)}`}>
                    {form?.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Maintenance Priority</span>
                  <span className={`font-semibold ${getPriorityColor(form?.maintenance_priority)}`}>
                    {form?.maintenance_priority?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Fitness Clearance</span>
                  <span className={form?.fitness_clearance === "yes" ? "text-emerald-400" : "text-rose-400"}>
                    {form?.fitness_clearance === "yes" ? 
                      <FaCheckCircle className="text-lg" /> : 
                      <FaTimesCircle className="text-lg" />
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Job Card Status</span>
                  <span className={form?.job_card_open === "no" ? "text-emerald-400" : "text-amber-400"}>
                    {form?.job_card_open === "no" ? "Closed" : "Open"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cleaning Required</span>
                  <span className={form?.needs_cleaning ? "text-amber-400" : "text-emerald-400"}>
                    {form?.needs_cleaning ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaChartLine className="text-cyan-400" />
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Mileage Utilization</span>
                    <span>{Math.round((form?.mileage / 15000) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((form?.mileage / 15000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Operational Hours</span>
                    <span>{form?.operational_hours} hrs</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((form?.operational_hours / 400) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Branding Exposure</span>
                    <span>{form?.branding_hours} hrs</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((form?.branding_hours / 1500) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fleet Context Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaDatabase className="text-cyan-400" />
                Fleet Context
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Fleet Size</span>
                  <span className="text-white">{totalTrains} trains</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Same Status</span>
                  <span className="text-white">{similarStatusTrains} trains</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">High Priority</span>
                  <span className="text-rose-400">{highPriorityTrains} trains</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fleet Utilization</span>
                  <span className="text-emerald-400">
                    {Math.round((trains.filter(t => t.status === "Service").length / totalTrains) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaBolt className="text-cyan-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 p-3 rounded-lg transition-all duration-300 border border-cyan-500/30"
                >
                  <FaEdit />
                  {isEditing ? "Finish Editing" : "Edit Train Details"}
                </button>
                <button
                  onClick={() => navigate("/simulation")}
                  className="w-full flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 p-3 rounded-lg transition-all duration-300 border border-purple-500/30"
                >
                  <FaSyncAlt />
                  Run Simulation
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-3 rounded-lg transition-all duration-300 border border-gray-600"
                >
                  <FaSave />
                  Export Report
                </button>
              </div>
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
    </div>
  );
}