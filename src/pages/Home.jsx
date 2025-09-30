import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaTrain, 
  FaClock, 
  FaCogs, 
  FaTools, 
  FaRobot,
  FaChartLine,
  FaDatabase,
  FaBrain,
  FaChartBar,
  FaPlayCircle,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSyncAlt,
  FaShieldAlt,
  FaBalanceScale
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTrainCount, setActiveTrainCount] = useState(18);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate active train count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrainCount(prev => {
        const newCount = prev + (Math.random() > 0.5 ? 1 : -1);
        return Math.max(15, Math.min(22, newCount));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      name: "Total Trainsets", 
      value: 25, 
      icon: <FaTrain className="text-3xl text-blue-400" />,
      description: "Four-car trainsets in fleet",
      growth: "→ 40 by 2027"
    },
    { 
      name: "Active Now", 
      value: activeTrainCount, 
      icon: <FaClock className="text-3xl text-green-400" />,
      description: "Currently in service",
      growth: "Real-time tracking"
    },
    { 
      name: "Decision Window", 
      value: "21:00-23:00", 
      icon: <FaCogs className="text-3xl text-yellow-400" />,
      description: "Nightly planning timeframe",
      growth: "IST"
    },
    { 
      name: "System Status", 
      value: "Online", 
      icon: <FaTools className="text-3xl text-emerald-400" />,
      description: "AI Platform",
      growth: "All systems operational"
    },
  ];

  const challenges = [
    {
      icon: <FaExclamationTriangle className="text-red-400 text-2xl" />,
      title: "Siloed Data Systems",
      description: "Manual logbooks, spreadsheets, and WhatsApp updates create information gaps"
    },
    {
      icon: <FaSyncAlt className="text-yellow-400 text-2xl" />,
      title: "Manual Reconciliation",
      description: "Supervisors manually reconcile six interdependent variables every night"
    },
    {
      icon: <FaShieldAlt className="text-orange-400 text-2xl" />,
      title: "Compliance Risks",
      description: "Single clearance miss can affect 99.5% punctuality KPI"
    },
    {
      icon: <FaBalanceScale className="text-purple-400 text-2xl" />,
      title: "Cost Optimization",
      description: "Uneven mileage assignment increases maintenance costs"
    }
  ];

  const solutions = [
    {
      icon: <FaDatabase className="text-blue-400 text-4xl" />,
      title: "Unified Data Platform",
      description: "Integrates all data sources in real-time",
      path: "/dashboard",
      buttonText: "View Data"
    },
    {
      icon: <FaBrain className="text-green-400 text-4xl" />,
      title: "AI Optimization",
      description: "Multi-objective optimization engine",
      path: "/simulation",
      buttonText: "Run AI"
    },
    {
      icon: <FaChartBar className="text-cyan-400 text-4xl" />,
      title: "Decision Support",
      description: "Intelligent recommendations and alerts",
      path: "/analytics",
      buttonText: "See Insights"
    }
  ];

  const handleQuickAction = (path) => {
    navigate(path);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Simple Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                    <FaTrain className="text-white text-2xl" />
                  </div>
                  <span className="text-blue-400 font-semibold text-lg">Kochi Metro Rail Limited</span>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                    Live
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  AI-Powered Train Induction
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Optimization System
                  </span>
                </h1>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Transforming Kochi Metro's nightly train induction planning from manual processes to 
                  <span className="text-blue-400 font-semibold"> AI-driven intelligent decision making</span>. 
                  Ensuring operational excellence while optimizing maintenance and resource utilization.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={() => handleQuickAction("/dashboard")}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaPlayCircle className="text-lg" />
                    Launch Dashboard
                  </button>
                  <button
                    onClick={() => handleQuickAction("/simulation")}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl border border-gray-600 transition-all duration-300"
                  >
                    <FaChartLine className="text-lg" />
                    Try Simulation
                  </button>
                </div>

                {/* Live Status Bar */}
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400">System Online</span>
                      </div>
                      <div className="text-gray-400">
                        Current Time: <span className="text-white">{formatTime(currentTime)} IST</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-400" />
                        <span>Smart India Hackathon 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      onClick={() => handleQuickAction("/simulation")}
                      className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-xl p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
                    >
                      <FaRobot className="text-blue-400 text-4xl mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-bold mb-2">AI Optimization</h3>
                      <p className="text-gray-300 text-sm">Smart decision engine</p>
                    </button>
                    <button 
                      onClick={() => handleQuickAction("/dashboard")}
                      className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-xl p-6 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer group"
                    >
                      <FaSyncAlt className="text-green-400 text-4xl mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-bold mb-2">Live Dashboard</h3>
                      <p className="text-gray-300 text-sm">Real-time monitoring</p>
                    </button>
                    <button 
                      onClick={() => handleQuickAction("/analytics")}
                      className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
                    >
                      <FaChartLine className="text-purple-400 text-4xl mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-bold mb-2">Analytics</h3>
                      <p className="text-gray-300 text-sm">Performance insights</p>
                    </button>
                    <button 
                      onClick={() => handleQuickAction("/maintenance")}
                      className="bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-xl p-6 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 cursor-pointer group"
                    >
                      <FaShieldAlt className="text-orange-400 text-4xl mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-bold mb-2">Maintenance</h3>
                      <p className="text-gray-300 text-sm">Fleet management</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Stats Section */}
        <section className="py-12 px-4 md:px-8 bg-gray-800/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Operational Overview
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Real-time monitoring of Kochi Metro's fleet operations and AI system performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.name}
                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-gray-700 hover:border-blue-400/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      {stat.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-blue-400 text-xs font-semibold">{stat.growth}</div>
                      </div>
                      <div className="text-gray-300 text-sm font-medium">{stat.name}</div>
                      <div className="text-gray-500 text-xs mt-1">{stat.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Challenges */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  The Challenge
                </h2>
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <div
                      key={challenge.title}
                      className="bg-gray-800/40 rounded-xl p-5 border border-gray-700 hover:border-red-400/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-red-400/10 rounded-lg mt-1">
                          {challenge.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{challenge.title}</h3>
                          <p className="text-gray-300 text-sm">{challenge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Our Solution
                </h2>
                <div className="space-y-6">
                  {solutions.map((solution, index) => (
                    <div
                      key={solution.title}
                      className="bg-gray-800/40 rounded-xl p-6 border border-gray-700 hover:border-green-400/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-green-400/10 rounded-lg">
                          {solution.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2">{solution.title}</h3>
                          <p className="text-gray-300 text-sm mb-4">{solution.description}</p>
                          <button
                            onClick={() => handleQuickAction(solution.path)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-all duration-300 text-sm font-medium"
                          >
                            {solution.buttonText}
                            <FaArrowRight className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-800/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Experience AI-Powered Metro Operations?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore our intelligent train induction system designed specifically for Kochi Metro's operational needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleQuickAction("/dashboard")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300"
              >
                <FaPlayCircle className="text-lg" />
                Launch Main Dashboard
              </button>
              <button
                onClick={() => handleQuickAction("/demo")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl border border-gray-600 transition-all duration-300"
              >
                <FaChartLine className="text-lg" />
                View Live Demo
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Smart India Hackathon 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Kochi Metro Rail Limited</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                <span>Government of Kerala</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 md:px-8 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                  <FaTrain className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-white font-bold">KMRL AI Scheduler</div>
                  <div className="text-gray-400 text-sm">Smart India Hackathon 2025</div>
                </div>
              </div>
              
              <div className="text-gray-400 text-sm text-center md:text-right">
                <div>AI-Powered Metro Operations Optimization</div>
                <div className="mt-1">© 2025 Kochi Metro Rail Limited. All rights reserved.</div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}