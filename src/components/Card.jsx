import React from "react";
import { 
  FaInfoCircle, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaClock,
  FaCog,
  FaChartLine,
  FaTrain,
  FaRobot,
  FaBell,
  FaUserCircle,
  FaShieldAlt,
  FaTools,
  FaCalendarAlt,
  FaBolt,
  FaCloud,
  FaDatabase,
  FaNetworkWired,
  FaMicrochip
} from "react-icons/fa";
import { 
  MdAssessment,
  MdSpeed,
  MdBarChart,
  MdShowChart,
  MdPieChart,
  MdTimeline,
  MdWarning,
  MdError,
  MdInfo
} from "react-icons/md";

/**
 * Enhanced Professional Card Component
 * 
 * Props:
 *  - children: content inside the card
 *  - title: optional card header title
 *  - footer: optional footer content (string or JSX)
 *  - style: custom inline styles
 *  - shadow: boolean, adds shadow if true
 *  - className: additional tailwind classes
 *  - icon: optional icon in header
 *  - hoverEffect: boolean, enables hover scale/shadow
 *  - variant: 'default' | 'gradient' | 'bordered' | 'glass'
 *  - color: 'cyan' | 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'gray'
 *  - padding: 'sm' | 'md' | 'lg' | 'xl'
 *  - borderRadius: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 *  - loading: boolean, shows loading state
 *  - action: JSX element for header action button
 *  - badge: string or JSX for badge display
 *  - gradientDirection: 'br' | 'tr' | 'bl' | 'tl' (bottom-right, top-right, etc.)
 */

export default function Card({
  children,
  title,
  footer,
  style = {},
  shadow = true,
  className = "",
  icon = null,
  hoverEffect = true,
  variant = "default",
  color = "cyan",
  padding = "md",
  borderRadius = "xl",
  loading = false,
  action = null,
  badge = null,
  gradientDirection = "br",
}) {
  // Color variants with your project's theme
  const colorSchemes = {
    cyan: {
      bg: "from-cyan-500/10 to-cyan-600/10",
      border: "border-cyan-500/30",
      hover: "hover:border-cyan-400/50",
      text: "text-cyan-400",
      gradient: "from-cyan-500 to-blue-600",
      icon: "text-cyan-400",
    },
    blue: {
      bg: "from-blue-500/10 to-blue-600/10",
      border: "border-blue-500/30",
      hover: "hover:border-blue-400/50",
      text: "text-blue-400",
      gradient: "from-blue-500 to-indigo-600",
      icon: "text-blue-400",
    },
    emerald: {
      bg: "from-emerald-500/10 to-emerald-600/10",
      border: "border-emerald-500/30",
      hover: "hover:border-emerald-400/50",
      text: "text-emerald-400",
      gradient: "from-emerald-500 to-green-600",
      icon: "text-emerald-400",
    },
    amber: {
      bg: "from-amber-500/10 to-amber-600/10",
      border: "border-amber-500/30",
      hover: "hover:border-amber-400/50",
      text: "text-amber-400",
      gradient: "from-amber-500 to-orange-600",
      icon: "text-amber-400",
    },
    purple: {
      bg: "from-purple-500/10 to-purple-600/10",
      border: "border-purple-500/30",
      hover: "hover:border-purple-400/50",
      text: "text-purple-400",
      gradient: "from-purple-500 to-pink-600",
      icon: "text-purple-400",
    },
    rose: {
      bg: "from-rose-500/10 to-rose-600/10",
      border: "border-rose-500/30",
      hover: "hover:border-rose-400/50",
      text: "text-rose-400",
      gradient: "from-rose-500 to-red-600",
      icon: "text-rose-400",
    },
    gray: {
      bg: "from-gray-500/10 to-gray-600/10",
      border: "border-gray-500/30",
      hover: "hover:border-gray-400/50",
      text: "text-gray-400",
      gradient: "from-gray-500 to-gray-600",
      icon: "text-gray-400",
    }
  };

  // Variant styles
  const variantStyles = {
    default: `bg-gray-800/60 backdrop-blur-sm ${colorSchemes[color].border} ${colorSchemes[color].hover}`,
    gradient: `bg-gradient-to-${gradientDirection} ${colorSchemes[color].bg} backdrop-blur-sm border ${colorSchemes[color].border} ${colorSchemes[color].hover}`,
    bordered: `bg-gray-800/60 backdrop-blur-sm border-2 ${colorSchemes[color].border} ${colorSchemes[color].hover}`,
    glass: `bg-gray-800/30 backdrop-blur-xl border border-white/10 ${colorSchemes[color].hover}`
  };

  // Padding sizes
  const paddingSizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  // Border radius sizes
  const borderRadiusSizes = {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    "2xl": "rounded-[2rem]"
  };

  // Default icon based on color
  const getDefaultIcon = () => {
    const icons = {
      cyan: <FaInfoCircle className={colorSchemes[color].icon} />,
      blue: <MdInfo className={colorSchemes[color].icon} />,
      emerald: <FaCheckCircle className={colorSchemes[color].icon} />,
      amber: <FaExclamationTriangle className={colorSchemes[color].icon} />,
      purple: <FaRobot className={colorSchemes[color].icon} />,
      rose: <FaExclamationCircle className={colorSchemes[color].icon} />,
      gray: <FaCog className={colorSchemes[color].icon} />
    };
    return icons[color];
  };

  // Get icon based on title (smart icon detection)
  const getSmartIcon = () => {
    if (icon) return icon;
    
    const titleLower = title?.toLowerCase() || '';
    
    if (titleLower.includes('train') || titleLower.includes('fleet')) 
      return <FaTrain className={colorSchemes[color].icon} />;
    if (titleLower.includes('ai') || titleLower.includes('optimiz')) 
      return <FaRobot className={colorSchemes[color].icon} />;
    if (titleLower.includes('analytics') || titleLower.includes('chart')) 
      return <MdAssessment className={colorSchemes[color].icon} />;
    if (titleLower.includes('notification') || titleLower.includes('alert')) 
      return <FaBell className={colorSchemes[color].icon} />;
    if (titleLower.includes('setting') || titleLower.includes('config')) 
      return <FaCog className={colorSchemes[color].icon} />;
    if (titleLower.includes('profile') || titleLower.includes('user')) 
      return <FaUserCircle className={colorSchemes[color].icon} />;
    if (titleLower.includes('security') || titleLower.includes('shield')) 
      return <FaShieldAlt className={colorSchemes[color].icon} />;
    if (titleLower.includes('maintenance') || titleLower.includes('tool')) 
      return <FaTools className={colorSchemes[color].icon} />;
    if (titleLower.includes('schedule') || titleLower.includes('calendar')) 
      return <FaCalendarAlt className={colorSchemes[color].icon} />;
    if (titleLower.includes('performance') || titleLower.includes('speed')) 
      return <MdSpeed className={colorSchemes[color].icon} />;
    if (titleLower.includes('system') || titleLower.includes('status')) 
      return <FaNetworkWired className={colorSchemes[color].icon} />;
    
    return getDefaultIcon();
  };

  return (
    <div
      className={`
        w-full max-w-full transition-all duration-300 relative
        ${variantStyles[variant]}
        ${paddingSizes[padding]}
        ${borderRadiusSizes[borderRadius]}
        ${shadow ? 'shadow-lg' : ''}
        ${hoverEffect ? `hover:scale-[1.02] hover:shadow-2xl ${colorSchemes[color].hover}` : ''}
        ${loading ? 'opacity-70 pointer-events-none' : ''}
        ${className}
      `}
      style={style}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-inherit flex items-center justify-center z-10">
          <div className="flex items-center gap-3 text-cyan-400">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-semibold">Loading...</span>
          </div>
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className={`absolute -top-2 -right-2 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${colorSchemes[color].gradient} text-white shadow-lg z-20`}>
          {badge}
        </div>
      )}

      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-700/50 rounded-lg">
              {getSmartIcon()}
            </div>
            <div>
              <h3 className={`font-bold text-lg ${colorSchemes[color].text}`}>
                {title}
              </h3>
            </div>
          </div>
          
          {/* Header Action */}
          {action && (
            <div className="flex items-center gap-2">
              {action}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="overflow-x-auto relative">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className={`mt-6 pt-4 border-t border-gray-700/50 flex items-center justify-between text-sm`}>
          <div className="flex items-center gap-2 text-gray-400">
            {footer.icon && <span className={colorSchemes[color].icon}>{footer.icon}</span>}
            <span>{footer.text || footer}</span>
          </div>
          
          {/* Footer additional content */}
          {footer.additional && (
            <div className="text-gray-500 text-xs">
              {footer.additional}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Additional specialized card components for common use cases
export const StatsCard = ({ title, value, subtitle, trend, icon, color = "cyan", ...props }) => (
  <Card color={color} variant="gradient" padding="lg" {...props}>
    <div className="text-center space-y-3">
      <div className="flex justify-center">
        <div className="p-3 bg-gray-700/50 rounded-2xl">
          {icon || <FaChartLine className={`text-2xl ${colorSchemes[color].icon}`} />}
        </div>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-gray-300 font-semibold">{title}</div>
      {subtitle && (
        <div className="text-gray-400 text-sm">{subtitle}</div>
      )}
      {trend && (
        <div className={`text-sm ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend}
        </div>
      )}
    </div>
  </Card>
);

export const AlertCard = ({ title, message, type = "info", actions, ...props }) => {
  const alertTypes = {
    info: { color: "cyan", icon: <FaInfoCircle /> },
    warning: { color: "amber", icon: <FaExclamationTriangle /> },
    error: { color: "rose", icon: <FaExclamationCircle /> },
    success: { color: "emerald", icon: <FaCheckCircle /> }
  };

  const config = alertTypes[type];

  return (
    <Card color={config.color} variant="bordered" {...props}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-gray-700/50 rounded-lg mt-1">
          {React.cloneElement(config.icon, { className: `text-xl ${colorSchemes[config.color].icon}` })}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${colorSchemes[config.color].text} mb-2`}>
            {title}
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {message}
          </p>
          {actions && (
            <div className="flex gap-2 mt-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export const MetricCard = ({ title, value, change, percentage, description, color = "blue", ...props }) => (
  <Card color={color} variant="default" padding="md" {...props}>
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        {change && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            change > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
          }`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {percentage !== undefined && (
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${colorSchemes[color].gradient} transition-all duration-1000`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
      {description && (
        <div className="text-gray-400 text-xs">{description}</div>
      )}
    </div>
  </Card>
);