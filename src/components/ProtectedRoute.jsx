import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  FaLock, 
  FaExclamationTriangle, 
  FaArrowRight, 
  FaHome,
  FaSync,
  FaUser,
  FaShieldAlt,
  FaClock,
  FaTrain,
  FaUserCircle
} from "react-icons/fa";
import { 
  MdSecurity,
  MdErrorOutline,
  MdRefresh
} from "react-icons/md";

export default function ProtectedRoute({ 
  children, 
  requiredRole = null, 
  requiredPermissions = [],
  fallbackPath = "/login",
  showFallbackUI = true 
}) {
  const { 
    isAuthenticated, 
    user, 
    isLoading, 
    checkPermission,
    hasRole 
  } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate();
  const [accessDenied, setAccessDenied] = useState(false);
  const [deniedReason, setDeniedReason] = useState("");

  // Check access permissions
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      let reason = "";
      
      // Check role requirement
      if (requiredRole && !hasRole(requiredRole)) {
        reason = `This page requires ${requiredRole} privileges.`;
      }
      
      // Check permissions
      if (requiredPermissions.length > 0) {
        const missingPermissions = requiredPermissions.filter(
          permission => !checkPermission(permission)
        );
        
        if (missingPermissions.length > 0) {
          reason = `Insufficient permissions. Required: ${missingPermissions.join(', ')}`;
        }
      }
      
      if (reason) {
        setDeniedReason(reason);
        setAccessDenied(true);
      } else {
        setAccessDenied(false);
      }
    }
  }, [isAuthenticated, isLoading, requiredRole, requiredPermissions, checkPermission, hasRole]);

  // Redirect to intended page after login
  const getRedirectPath = () => {
    return `${fallbackPath}?redirect=${encodeURIComponent(location.pathname + location.search)}`;
  };

  // Handle navigation to login
  const handleLoginRedirect = () => {
    navigate(getRedirectPath());
  };

  // Handle navigation to home
  const handleHomeRedirect = () => {
    navigate("/dashboard");
  };

  // Handle retry (useful for temporary authentication issues)
  const handleRetry = () => {
    window.location.reload();
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20 animate-pulse">
              <FaTrain className="text-white text-4xl" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-white">Verifying Access</div>
            <div className="text-cyan-300">Checking your permissions...</div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show fallback UI or redirect
  if (!isAuthenticated) {
    if (!showFallbackUI) {
      return <Navigate to={getRedirectPath()} replace />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-cyan-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl text-center animate-fadeIn">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl border border-amber-500/30">
                <FaLock className="text-amber-400 text-4xl animate-pulse" />
              </div>
            </div>

            {/* Message */}
            <h1 className="text-3xl font-bold text-white mb-3">
              Authentication Required
            </h1>
            <p className="text-gray-300 text-lg mb-2">
              You need to be logged in to access this page.
            </p>
            <p className="text-cyan-300 text-sm mb-6">
              Please sign in to continue to the KMRL AI Command Center.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4 mb-6">
              <button
                onClick={handleLoginRedirect}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <FaUser />
                Sign In to Continue
                <FaArrowRight />
              </button>
              
              <button
                onClick={handleHomeRedirect}
                className="w-full py-3 text-cyan-400 hover:text-white border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
              >
                <FaHome />
                Return to Home
              </button>
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <FaShieldAlt className="text-emerald-400 flex-shrink-0" />
                <p>
                  Your session has expired or you need to authenticate to access this resource.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FaTrain className="text-cyan-400" />
                  <span>KMRL AI Command Center</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <MdSecurity className="text-amber-400" />
                  <span>Secure Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated but access denied due to permissions
  if (accessDenied) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-rose-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-rose-500/30 shadow-2xl text-center animate-fadeIn">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-rose-500/20 to-red-500/20 rounded-2xl border border-rose-500/30">
                <FaExclamationTriangle className="text-rose-400 text-4xl animate-pulse" />
              </div>
            </div>

            {/* Message */}
            <h1 className="text-3xl font-bold text-white mb-3">
              Access Denied
            </h1>
            <p className="text-gray-300 text-lg mb-2">
              You don't have permission to access this page.
            </p>
            <p className="text-rose-300 text-sm mb-4 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
              {deniedReason}
            </p>

            {/* User Info */}
            <div className="p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 mb-6">
              <div className="text-sm text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>Logged in as:</span>
                  <span className="text-cyan-400">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="text-amber-400">{user?.role || "User"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Department:</span>
                  <span className="text-emerald-400">{user?.department || "Not specified"}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleHomeRedirect}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <FaHome />
                Go to Dashboard
                <FaArrowRight />
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/50 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <MdRefresh />
                  Retry
                </button>
                
                <button
                  onClick={() => navigate('/profile')}
                  className="flex-1 py-3 text-purple-400 hover:text-purple-300 border border-purple-500/30 hover:border-purple-400/50 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <FaUserCircle />
                  Profile
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MdErrorOutline className="text-rose-400" />
                  <span>Permission Restriction</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-amber-400" />
                  <span>Contact Administrator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated and has required permissions, render children
  return children;
}

// Higher Order Component for role-based protection
export const withRole = (Component, requiredRole) => {
  return function WithRoleComponent(props) {
    return (
      <ProtectedRoute requiredRole={requiredRole}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Higher Order Component for permission-based protection
export const withPermission = (Component, requiredPermissions) => {
  return function WithPermissionComponent(props) {
    return (
      <ProtectedRoute requiredPermissions={requiredPermissions}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Custom hook for programmatic access checks
export const useAccessControl = () => {
  const { checkPermission, hasRole, user } = useAuth();
  
  const canAccess = (requiredPermissions = [], requiredRole = null) => {
    if (requiredRole && !hasRole(requiredRole)) {
      return false;
    }
    
    if (requiredPermissions.length > 0) {
      return requiredPermissions.every(permission => checkPermission(permission));
    }
    
    return true;
  };
  
  return {
    canAccess,
    user,
    hasRole,
    checkPermission
  };
};

// Custom CSS for animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);