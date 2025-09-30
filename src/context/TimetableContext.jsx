// src/context/TimetableContext.jsx
import React from "react";
import { initialTrains } from "../utils/dummyData"; // make sure this file exists

// 1️⃣ Create context
const TimetableContext = React.createContext(null);

// 2️⃣ Custom hook for easier access
export const useTimetable = () => {
  const context = React.useContext(TimetableContext);
  if (!context) {
    throw new Error("useTimetable must be used within a TimetableProvider");
  }
  return context;
};

// 3️⃣ Provider component
export const TimetableProvider = ({ children }) => {
  const [trains, setTrains] = React.useState(initialTrains || []);
  const [notifications, setNotifications] = React.useState([]);
  const [history, setHistory] = React.useState([]);

  // --- CRUD Operations ---
  const addTrain = (train) => {
    setTrains((prev) => [...prev, train]);
    addNotification(`Train ${train.train_id} added`);
  };

  const updateTrain = (train_id, patch) => {
    setTrains((prev) =>
      prev.map((t) => (t.train_id === train_id ? { ...t, ...patch } : t))
    );
    addNotification(`Train ${train_id} updated`);
  };

  const deleteTrain = (train_id) => {
    setTrains((prev) => prev.filter((t) => t.train_id !== train_id));
    addNotification(`Train ${train_id} removed`);
  };

  // --- Notifications ---
  const addNotification = (message, type = "info") => {
    const n = {
      id: Date.now(),
      message,
      type,
      time: new Date().toISOString(),
    };
    setNotifications((prev) => [n, ...prev].slice(0, 30)); // keep last 30
  };

  // --- Optimizer ---
  const runOptimizer = (desiredServiceCount = 6) => {
    const reasons = {};
    const maintenance = [];
    const candidates = [];

    trains.forEach((t) => {
      if (t.fitness_clearance !== "yes") {
        maintenance.push(t.train_id);
        reasons[t.train_id] = "Missing fitness clearance";
      } else if (t.job_card_open === "yes") {
        maintenance.push(t.train_id);
        reasons[t.train_id] = "Open job-card";
      } else if (t.needs_cleaning) {
        maintenance.push(t.train_id);
        reasons[t.train_id] = "Requires cleaning";
      } else {
        candidates.push(t);
      }
    });

    // Sort by mileage ascending
    candidates.sort((a, b) => a.mileage - b.mileage);

    const inService = candidates.slice(0, desiredServiceCount).map((t) => t.train_id);
    const standby = candidates.slice(desiredServiceCount).map((t) => t.train_id);

    inService.forEach((id) => (reasons[id] = "Selected for service (mileage balancing)"));
    standby.forEach((id) => (reasons[id] = "Standby - reserve"));

    const plan = { timestamp: new Date().toISOString(), inService, standby, maintenance, reasons };
    setHistory((prev) => [plan, ...prev].slice(0, 20));

    // Update train statuses
    setTrains((prev) =>
      prev.map((t) => {
        if (inService.includes(t.train_id)) return { ...t, status: "Service" };
        if (standby.includes(t.train_id)) return { ...t, status: "Standby" };
        if (maintenance.includes(t.train_id)) return { ...t, status: "Maintenance" };
        return t;
      })
    );

    addNotification(`Optimizer run: Service=${inService.length}, Standby=${standby.length}, Maintenance=${maintenance.length}`);
    return plan;
  };

  const getTrain = (id) => trains.find((t) => t.train_id === id) || null;

  return (
    <TimetableContext.Provider
      value={{
        trains,
        addTrain,
        updateTrain,
        deleteTrain,
        getTrain,
        runOptimizer,
        notifications,
        addNotification,
        history,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};
