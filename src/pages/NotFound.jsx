import React from "react";
import { Link } from "react-router-dom";
import { 
  FaExclamationTriangle, 
  FaTrain, 
  FaHome, 
  FaCompass,
  FaBolt,
  FaCloud,
  FaSatelliteDish
} from "react-icons/fa";
import { 
  MdSignalWifiOff,
  MdLocationOff,
  MdErrorOutline
} from "react-icons/md";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-30 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-25 animate-float animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/3 w-5 h-5 bg-indigo-400 rounded-full opacity-20 animate-float animation-delay-1500"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#00ffff 1px, transparent 1px),
                             linear-gradient(90deg, #00ffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Satellite dish animation */}
      <div className="absolute top-10 right-10 opacity-10">
        <FaSatelliteDish className="text-6xl text-cyan-400 animate-spin-slow" />
      </div>

      <div className="text-center space-y-8 p-8 bg-gray-800/60 backdrop-blur-lg rounded-3xl border border-gray-700/50 shadow-2xl max-w-lg w-full relative z-10 transform hover:scale-105 transition-all duration-500 animate-fadeIn">
        
        {/* Error Icon with Animation */}
        <div className="relative flex justify-center">
          <div className="absolute w-24 h-24 bg-red-500/20 rounded-full animate-ping"></div>
          <div className="relative p-6 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl border border-red-500/30">
            <FaExclamationTriangle className="text-red-400 text-4xl animate-bounce" />
          </div>
        </div>

        {/* Error Code with Glow Effect */}
        <div className="relative">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500 drop-shadow-2xl animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl font-black text-red-400/20 blur-md animate-pulse">
            404
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Track Not Found
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            The route you're looking for seems to have been diverted or is temporarily out of service.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <MdSignalWifiOff className="text-yellow-400" />
            <span>Navigation signal lost</span>
            <MdLocationOff className="text-yellow-400 ml-4" />
            <span>Destination unreachable</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/40"
          >
            <FaHome className="group-hover:scale-110 transition-transform" />
            <span>Return to Command Center</span>
          </Link>
          
          <Link
            to="/timetable"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
          >
            <FaCompass className="group-hover:scale-110 transition-transform" />
            <span>View Timetable</span>
          </Link>
        </div>

        {/* Technical Details */}
        <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
            <MdErrorOutline className="text-cyan-400" />
            <span>Technical Details</span>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Error Code:</span>
              <span className="text-cyan-400">404_NOT_FOUND</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="text-cyan-400">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <span>System Status:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Operational
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <FaTrain className="text-cyan-400" />
              <span>KMRL AI Scheduler</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaCloud className="text-blue-400" />
              <span>v2.1.0</span>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaBolt className="text-yellow-400" />
              <span>Smart India Hackathon 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}