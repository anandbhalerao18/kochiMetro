import React from "react";
import { FaBell, FaExclamationCircle, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

export default function NotificationItem({ n }) {
  const time = new Date(n.time).toLocaleString();

  // Decide icon and color based on notification type
  let Icon = FaInfoCircle;
  let iconColor = "text-blue-400";
  if (n.type === "warning") {
    Icon = FaExclamationCircle;
    iconColor = "text-yellow-400";
  } else if (n.type === "success") {
    Icon = FaCheckCircle;
    iconColor = "text-green-400";
  } else if (n.type === "alert") {
    Icon = FaBell;
    iconColor = "text-red-400";
  }

  return (
    <div className="flex items-start justify-between p-4 border-b border-gray-700 hover:bg-gray-800 rounded-lg transition duration-300 animate-fadeIn">
      {/* Left Section: Icon and message */}
      <div className="flex items-start gap-3">
        <Icon className={`mt-1 ${iconColor} text-xl flex-shrink-0`} />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-100">{n.message}</span>
          <span className="text-gray-400 text-sm mt-1">
            {n.type.charAt(0).toUpperCase() + n.type.slice(1)} • {time}
          </span>
        </div>
      </div>
    </div>
  );
}
