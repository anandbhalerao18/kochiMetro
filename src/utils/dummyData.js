// src/utils/dummyData.js

// Enhanced initial train data with detailed information for 25 trains
export const initialTrains = [
  {
    train_id: "T-001",
    train_name: "Metro Express",
    status: "Service",
    mileage: 12450,
    branding: "Cochin Shipyard",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "A1",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-15",
    next_maintenance: "2024-02-15",
    capacity: 375,
    current_location: "Aluva Station",
    operational_hours: 286,
    branding_hours: 1200,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-01",
      signalling: "2024-03-15",
      telecom: "2024-02-28"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-15", type: "Scheduled", duration: "8 hours", cost: "₹85,000" },
      { date: "2023-12-01", type: "Brake Inspection", duration: "4 hours", cost: "₹45,000" }
    ],
    performance_metrics: {
      punctuality: 99.2,
      reliability: 98.7,
      passenger_capacity: 375,
      avg_daily_riders: 2850
    }
  },
  {
    train_id: "T-002",
    train_name: "Marine Drive",
    status: "Maintenance",
    mileage: 8450,
    branding: "None",
    fitness_clearance: "no",
    job_card_open: "yes",
    needs_cleaning: true,
    stabling_bay: "IB-02",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-20",
    next_maintenance: "2024-02-20",
    capacity: 375,
    current_location: "Maintenance Bay",
    operational_hours: 195,
    branding_hours: 0,
    maintenance_priority: "high",
    certification: {
      rolling_stock: "2024-02-20",
      signalling: "2024-03-10",
      telecom: "2024-02-25"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-20", type: "Emergency", duration: "12 hours", cost: "₹1,20,000" },
      { date: "2023-12-10", type: "HVAC Repair", duration: "6 hours", cost: "₹65,000" }
    ],
    performance_metrics: {
      punctuality: 98.5,
      reliability: 97.8,
      passenger_capacity: 375,
      avg_daily_riders: 2700
    }
  },
  {
    train_id: "T-003",
    train_name: "Vytila Mobility",
    status: "Standby",
    mileage: 6780,
    branding: "KL-07 Tourism",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "B3",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-25",
    next_maintenance: "2024-02-25",
    capacity: 375,
    current_location: "Muttom Depot",
    operational_hours: 156,
    branding_hours: 850,
    maintenance_priority: "medium",
    certification: {
      rolling_stock: "2024-03-05",
      signalling: "2024-03-20",
      telecom: "2024-03-01"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-25", type: "Routine", duration: "6 hours", cost: "₹72,000" }
    ],
    performance_metrics: {
      punctuality: 99.1,
      reliability: 98.9,
      passenger_capacity: 375,
      avg_daily_riders: 2600
    }
  },
  {
    train_id: "T-004",
    train_name: "Kochi Water Metro",
    status: "Service",
    mileage: 11200,
    branding: "Dubai Tourism",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "A4",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-18",
    next_maintenance: "2024-02-18",
    capacity: 375,
    current_location: "Maharaja's College",
    operational_hours: 268,
    branding_hours: 1100,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-12",
      signalling: "2024-03-25",
      telecom: "2024-03-08"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-18", type: "Scheduled", duration: "7 hours", cost: "₹78,000" }
    ],
    performance_metrics: {
      punctuality: 99.4,
      reliability: 99.0,
      passenger_capacity: 375,
      avg_daily_riders: 2900
    }
  },
  {
    train_id: "T-005",
    train_name: "Fort Kochi",
    status: "Maintenance",
    mileage: 9250,
    branding: "None",
    fitness_clearance: "no",
    job_card_open: "yes",
    needs_cleaning: true,
    stabling_bay: "IB-05",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-22",
    next_maintenance: "2024-02-22",
    capacity: 375,
    current_location: "Inspection Bay",
    operational_hours: 210,
    branding_hours: 0,
    maintenance_priority: "high",
    certification: {
      rolling_stock: "2024-02-18",
      signalling: "2024-03-05",
      telecom: "2024-02-20"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-22", type: "Bogie Repair", duration: "10 hours", cost: "₹95,000" }
    ],
    performance_metrics: {
      punctuality: 98.8,
      reliability: 98.2,
      passenger_capacity: 375,
      avg_daily_riders: 2750
    }
  },
  {
    train_id: "T-006",
    train_name: "Edapally Express",
    status: "Standby",
    mileage: 5980,
    branding: "KMRL Campaign",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "C2",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-28",
    next_maintenance: "2024-02-28",
    capacity: 375,
    current_location: "CUSAT Station",
    operational_hours: 142,
    branding_hours: 720,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-18",
      signalling: "2024-04-01",
      telecom: "2024-03-12"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2019,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-28", type: "Routine", duration: "5 hours", cost: "₹68,000" }
    ],
    performance_metrics: {
      punctuality: 99.3,
      reliability: 98.8,
      passenger_capacity: 375,
      avg_daily_riders: 2650
    }
  },
  {
    train_id: "T-007",
    train_name: "Kaloor Sports",
    status: "Service",
    mileage: 13450,
    branding: "Kerala Blasters",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: true,
    stabling_bay: "A7",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-12",
    next_maintenance: "2024-02-12",
    capacity: 375,
    current_location: "Kaloor Station",
    operational_hours: 312,
    branding_hours: 1450,
    maintenance_priority: "medium",
    certification: {
      rolling_stock: "2024-02-28",
      signalling: "2024-03-12",
      telecom: "2024-02-22"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-12", type: "Scheduled", duration: "8 hours", cost: "₹82,000" }
    ],
    performance_metrics: {
      punctuality: 99.0,
      reliability: 98.5,
      passenger_capacity: 375,
      avg_daily_riders: 3000
    }
  },
  {
    train_id: "T-008",
    train_name: "MG Road",
    status: "Standby",
    mileage: 5120,
    branding: "None",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "D1",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-02-01",
    next_maintenance: "2024-03-01",
    capacity: 375,
    current_location: "MG Road Station",
    operational_hours: 125,
    branding_hours: 0,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-22",
      signalling: "2024-04-05",
      telecom: "2024-03-15"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2019,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-02-01", type: "Routine", duration: "4 hours", cost: "₹58,000" }
    ],
    performance_metrics: {
      punctuality: 99.5,
      reliability: 99.1,
      passenger_capacity: 375,
      avg_daily_riders: 2550
    }
  },
  {
    train_id: "T-009",
    train_name: "JLN Stadium",
    status: "Maintenance",
    mileage: 8750,
    branding: "Asianet",
    fitness_clearance: "no",
    job_card_open: "yes",
    needs_cleaning: true,
    stabling_bay: "IB-03",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-24",
    next_maintenance: "2024-02-24",
    capacity: 375,
    current_location: "Maintenance Bay",
    operational_hours: 198,
    branding_hours: 950,
    maintenance_priority: "high",
    certification: {
      rolling_stock: "2024-02-22",
      signalling: "2024-03-08",
      telecom: "2024-02-26"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-24", type: "Electrical Repair", duration: "9 hours", cost: "₹88,000" }
    ],
    performance_metrics: {
      punctuality: 98.7,
      reliability: 98.0,
      passenger_capacity: 375,
      avg_daily_riders: 2720
    }
  },
  {
    train_id: "T-010",
    train_name: "Palarivattom",
    status: "Service",
    mileage: 11850,
    branding: "KMRL Green Initiative",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "B5",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-16",
    next_maintenance: "2024-02-16",
    capacity: 375,
    current_location: "Palarivattom Station",
    operational_hours: 275,
    branding_hours: 1250,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-08",
      signalling: "2024-03-22",
      telecom: "2024-03-04"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-16", type: "Scheduled", duration: "7 hours", cost: "₹76,000" }
    ],
    performance_metrics: {
      punctuality: 99.4,
      reliability: 98.9,
      passenger_capacity: 375,
      avg_daily_riders: 2850
    }
  },
  {
    train_id: "T-011",
    train_name: "Aluva Metro",
    status: "Service",
    mileage: 15600,
    branding: "Kochi Smart City",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "A2",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-10",
    next_maintenance: "2024-02-10",
    capacity: 375,
    current_location: "Aluva Station",
    operational_hours: 345,
    branding_hours: 1600,
    maintenance_priority: "medium",
    certification: {
      rolling_stock: "2024-02-25",
      signalling: "2024-03-08",
      telecom: "2024-02-18"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-10", type: "Major Service", duration: "12 hours", cost: "₹1,15,000" }
    ],
    performance_metrics: {
      punctuality: 98.9,
      reliability: 98.3,
      passenger_capacity: 375,
      avg_daily_riders: 3100
    }
  },
  {
    train_id: "T-012",
    train_name: "Thykoodam Express",
    status: "Service",
    mileage: 14200,
    branding: "Kerala Tourism",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: true,
    stabling_bay: "A3",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-14",
    next_maintenance: "2024-02-14",
    capacity: 375,
    current_location: "Thykoodam Station",
    operational_hours: 328,
    branding_hours: 1550,
    maintenance_priority: "medium",
    certification: {
      rolling_stock: "2024-02-28",
      signalling: "2024-03-14",
      telecom: "2024-02-22"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-14", type: "Scheduled", duration: "9 hours", cost: "₹92,000" }
    ],
    performance_metrics: {
      punctuality: 99.1,
      reliability: 98.6,
      passenger_capacity: 375,
      avg_daily_riders: 2950
    }
  },
  {
    train_id: "T-013",
    train_name: "CUSAT Connect",
    status: "Standby",
    mileage: 4850,
    branding: "None",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "B1",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-02-05",
    next_maintenance: "2024-03-05",
    capacity: 375,
    current_location: "CUSAT Station",
    operational_hours: 118,
    branding_hours: 0,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-25",
      signalling: "2024-04-08",
      telecom: "2024-03-18"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2020,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-02-05", type: "Routine", duration: "4 hours", cost: "₹55,000" }
    ],
    performance_metrics: {
      punctuality: 99.6,
      reliability: 99.2,
      passenger_capacity: 375,
      avg_daily_riders: 2400
    }
  },
  {
    train_id: "T-014",
    train_name: "Smart City",
    status: "Service",
    mileage: 10800,
    branding: "Kochi Smart City",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "A5",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-19",
    next_maintenance: "2024-02-19",
    capacity: 375,
    current_location: "Smart City Station",
    operational_hours: 258,
    branding_hours: 1050,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-10",
      signalling: "2024-03-24",
      telecom: "2024-03-06"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-19", type: "Scheduled", duration: "6 hours", cost: "₹71,000" }
    ],
    performance_metrics: {
      punctuality: 99.3,
      reliability: 98.8,
      passenger_capacity: 375,
      avg_daily_riders: 2800
    }
  },
  {
    train_id: "T-015",
    train_name: "Green Metro",
    status: "Standby",
    mileage: 6250,
    branding: "KMRL Green Initiative",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "B2",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-30",
    next_maintenance: "2024-02-28",
    capacity: 375,
    current_location: "Muttom Depot",
    operational_hours: 148,
    branding_hours: 680,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-20",
      signalling: "2024-04-02",
      telecom: "2024-03-14"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2019,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-30", type: "Routine", duration: "5 hours", cost: "₹62,000" }
    ],
    performance_metrics: {
      punctuality: 99.4,
      reliability: 99.0,
      passenger_capacity: 375,
      avg_daily_riders: 2500
    }
  },
  {
    train_id: "T-016",
    train_name: "Rapid Transit",
    status: "Service",
    mileage: 13200,
    branding: "Cochin Shipyard",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: true,
    stabling_bay: "A6",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-13",
    next_maintenance: "2024-02-13",
    capacity: 375,
    current_location: "Town Hall Station",
    operational_hours: 305,
    branding_hours: 1400,
    maintenance_priority: "medium",
    certification: {
      rolling_stock: "2024-02-26",
      signalling: "2024-03-11",
      telecom: "2024-02-20"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-13", type: "Scheduled", duration: "8 hours", cost: "₹84,000" }
    ],
    performance_metrics: {
      punctuality: 99.0,
      reliability: 98.4,
      passenger_capacity: 375,
      avg_daily_riders: 2900
    }
  },
  {
    train_id: "T-017",
    train_name: "Ernakulam North",
    status: "Standby",
    mileage: 5420,
    branding: "None",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "C1",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-02-03",
    next_maintenance: "2024-03-03",
    capacity: 375,
    current_location: "Ernakulam North Station",
    operational_hours: 132,
    branding_hours: 0,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-28",
      signalling: "2024-04-10",
      telecom: "2024-03-20"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2020,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-02-03", type: "Routine", duration: "4 hours", cost: "₹57,000" }
    ],
    performance_metrics: {
      punctuality: 99.5,
      reliability: 99.1,
      passenger_capacity: 375,
      avg_daily_riders: 2450
    }
  },
  {
    train_id: "T-018",
    train_name: "Kadavanthra",
    status: "Maintenance",
    mileage: 8950,
    branding: "Asianet",
    fitness_clearance: "no",
    job_card_open: "yes",
    needs_cleaning: true,
    stabling_bay: "IB-04",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-23",
    next_maintenance: "2024-02-23",
    capacity: 375,
    current_location: "Maintenance Bay",
    operational_hours: 205,
    branding_hours: 920,
    maintenance_priority: "high",
    certification: {
      rolling_stock: "2024-02-24",
      signalling: "2024-03-09",
      telecom: "2024-02-27"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-23", type: "Door System Repair", duration: "11 hours", cost: "₹1,05,000" }
    ],
    performance_metrics: {
      punctuality: 98.6,
      reliability: 97.9,
      passenger_capacity: 375,
      avg_daily_riders: 2680
    }
  },
  {
    train_id: "T-019",
    train_name: "Pathadipalam",
    status: "Service",
    mileage: 11600,
    branding: "KMRL Campaign",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "B4",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-17",
    next_maintenance: "2024-02-17",
    capacity: 375,
    current_location: "Pathadipalam Station",
    operational_hours: 272,
    branding_hours: 1180,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-06",
      signalling: "2024-03-21",
      telecom: "2024-03-02"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-17", type: "Scheduled", duration: "7 hours", cost: "₹77,000" }
    ],
    performance_metrics: {
      punctuality: 99.2,
      reliability: 98.7,
      passenger_capacity: 375,
      avg_daily_riders: 2820
    }
  },
  {
    train_id: "T-020",
    train_name: "Elamkulam",
    status: "Standby",
    mileage: 4680,
    branding: "Kerala Tourism",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "B6",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-02-07",
    next_maintenance: "2024-03-07",
    capacity: 375,
    current_location: "Elamkulam Station",
    operational_hours: 112,
    branding_hours: 520,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-30",
      signalling: "2024-04-12",
      telecom: "2024-03-22"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2020,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-02-07", type: "Routine", duration: "4 hours", cost: "₹53,000" }
    ],
    performance_metrics: {
      punctuality: 99.7,
      reliability: 99.3,
      passenger_capacity: 375,
      avg_daily_riders: 2350
    }
  },
  {
    train_id: "T-021",
    train_name: "Vyttila Hub",
    status: "Service",
    mileage: 12800,
    branding: "Dubai Tourism",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: true,
    stabling_bay: "A8",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-11",
    next_maintenance: "2024-02-11",
    capacity: 375,
    current_location: "Vyttila Station",
    operational_hours: 298,
    branding_hours: 1350,
    maintenance_priority: "medium",
    certification: {
      rolling_stock: "2024-02-27",
      signalling: "2024-03-13",
      telecom: "2024-02-21"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-11", type: "Scheduled", duration: "9 hours", cost: "₹89,000" }
    ],
    performance_metrics: {
      punctuality: 98.8,
      reliability: 98.2,
      passenger_capacity: 375,
      avg_daily_riders: 3050
    }
  },
  {
    train_id: "T-022",
    train_name: "Pettah Station",
    status: "Standby",
    mileage: 5150,
    branding: "None",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "C3",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-02-04",
    next_maintenance: "2024-03-04",
    capacity: 375,
    current_location: "Pettah Station",
    operational_hours: 126,
    branding_hours: 0,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-26",
      signalling: "2024-04-09",
      telecom: "2024-03-16"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2020,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-02-04", type: "Routine", duration: "4 hours", cost: "₹56,000" }
    ],
    performance_metrics: {
      punctuality: 99.6,
      reliability: 99.2,
      passenger_capacity: 375,
      avg_daily_riders: 2420
    }
  },
  {
    train_id: "T-023",
    train_name: "Kalamassery",
    status: "Service",
    mileage: 12100,
    branding: "KL-07 Tourism",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: false,
    stabling_bay: "A9",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-16",
    next_maintenance: "2024-02-16",
    capacity: 375,
    current_location: "Kalamassery Station",
    operational_hours: 284,
    branding_hours: 1220,
    maintenance_priority: "low",
    certification: {
      rolling_stock: "2024-03-04",
      signalling: "2024-03-18",
      telecom: "2024-02-26"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-16", type: "Scheduled", duration: "7 hours", cost: "₹79,000" }
    ],
    performance_metrics: {
      punctuality: 99.3,
      reliability: 98.8,
      passenger_capacity: 375,
      avg_daily_riders: 2780
    }
  },
  {
    train_id: "T-024",
    train_name: "SN Junction",
    status: "Maintenance",
    mileage: 8650,
    branding: "Kerala Blasters",
    fitness_clearance: "no",
    job_card_open: "yes",
    needs_cleaning: true,
    stabling_bay: "IB-01",
    route: "Thykoodam to Aluva",
    last_maintenance: "2024-01-21",
    next_maintenance: "2024-02-21",
    capacity: 375,
    current_location: "Maintenance Bay",
    operational_hours: 202,
    branding_hours: 890,
    maintenance_priority: "high",
    certification: {
      rolling_stock: "2024-02-23",
      signalling: "2024-03-07",
      telecom: "2024-02-24"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2018,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-21", type: "Brake System Overhaul", duration: "13 hours", cost: "₹1,25,000" }
    ],
    performance_metrics: {
      punctuality: 98.5,
      reliability: 97.8,
      passenger_capacity: 375,
      avg_daily_riders: 2710
    }
  },
  {
    train_id: "T-025",
    train_name: "Maharaja's College",
    status: "Service",
    mileage: 13900,
    branding: "Cochin Shipyard",
    fitness_clearance: "yes",
    job_card_open: "no",
    needs_cleaning: true,
    stabling_bay: "A10",
    route: "Aluva to Thykoodam",
    last_maintenance: "2024-01-09",
    next_maintenance: "2024-02-09",
    capacity: 375,
    current_location: "Maharaja's College Station",
    operational_hours: 322,
    branding_hours: 1520,
    maintenance_priority: "medium",
    certification: {
      rolling_stock: "2024-02-29",
      signalling: "2024-03-16",
      telecom: "2024-02-23"
    },
    technical_specs: {
      manufacturer: "Alstom",
      model: "Metropolis",
      year: 2017,
      max_speed: "80 km/h",
      power_supply: "750V DC Third Rail",
      bogie_type: "SGP-400"
    },
    maintenance_history: [
      { date: "2024-01-09", type: "Major Service", duration: "11 hours", cost: "₹1,10,000" }
    ],
    performance_metrics: {
      punctuality: 98.7,
      reliability: 98.1,
      passenger_capacity: 375,
      avg_daily_riders: 3150
    }
  }
];

// Available routes for Kochi Metro
export const metroRoutes = [
  { 
    id: "R1", 
    name: "Aluva to Thykoodam", 
    stations: 22, 
    distance: "25.6 km", 
    duration: "45 min",
    stations_list: [
      "Aluva", "Pulinchodu", "Companypady", "Ambattukavu", 
      "Muttom", "Kalamassery", "CUSAT", "Pathadipalam", 
      "Edapally", "Changampuzha Park", "Palarivattom", 
      "JLN Stadium", "Kaloor", "Lissie", "MG Road", 
      "Maharaja's College", "Ernakulam South", "Kadavanthra", 
      "Elamkulam", "Vyttila", "Thaikoodam", "Pettah", 
      "SN Junction", "Thykoodam"
    ]
  },
  { 
    id: "R2", 
    name: "Thykoodam to Aluva", 
    stations: 22, 
    distance: "25.6 km", 
    duration: "45 min",
    stations_list: [
      "Thykoodam", "SN Junction", "Pettah", "Thaikoodam",
      "Vyttila", "Elamkulam", "Kadavanthra", "Ernakulam South",
      "Maharaja's College", "MG Road", "Lissie", "Kaloor",
      "JLN Stadium", "Palarivattom", "Changampuzha Park", "Edapally",
      "Pathadipalam", "CUSAT", "Kalamassery", "Muttom",
      "Ambattukavu", "Companypady", "Pulinchodu", "Aluva"
    ]
  }
];

// Stabling bays and capacities
export const stablingBays = [
  { id: "A1", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A2", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A3", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A4", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A5", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A6", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A7", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A8", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A9", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "A10", type: "Service", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "B1", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "B2", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "B3", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "B4", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "B5", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "B6", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "C1", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "C2", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "C3", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "D1", type: "Standby", capacity: 1, location: "Main Depot", status: "occupied" },
  { id: "IB-01", type: "Maintenance", capacity: 1, location: "Inspection Bay", status: "occupied" },
  { id: "IB-02", type: "Maintenance", capacity: 1, location: "Inspection Bay", status: "occupied" },
  { id: "IB-03", type: "Maintenance", capacity: 1, location: "Inspection Bay", status: "occupied" },
  { id: "IB-04", type: "Maintenance", capacity: 1, location: "Inspection Bay", status: "occupied" },
  { id: "IB-05", type: "Maintenance", capacity: 1, location: "Inspection Bay", status: "occupied" }
];

// Branding options with contract details
export const brandingOptions = [
  { name: "None", contract_value: 0, contract_end: null },
  { name: "Cochin Shipyard", contract_value: 2500000, contract_end: "2024-12-31" },
  { name: "KL-07 Tourism", contract_value: 1800000, contract_end: "2024-11-30" },
  { name: "Dubai Tourism", contract_value: 3200000, contract_end: "2025-03-31" },
  { name: "KMRL Campaign", contract_value: 0, contract_end: null },
  { name: "Kerala Blasters", contract_value: 2800000, contract_end: "2024-10-31" },
  { name: "Asianet", contract_value: 2200000, contract_end: "2024-09-30" },
  { name: "KMRL Green Initiative", contract_value: 0, contract_end: null },
  { name: "Kochi Smart City", contract_value: 1500000, contract_end: "2024-08-31" },
  { name: "Kerala Tourism", contract_value: 1900000, contract_end: "2024-12-31" }
];

// Maintenance types and costs
export const maintenanceTypes = [
  { type: "Routine", avg_duration: "4-6 hours", avg_cost: "₹50,000 - ₹70,000", frequency: "Monthly" },
  { type: "Scheduled", avg_duration: "6-8 hours", avg_cost: "₹70,000 - ₹90,000", frequency: "Quarterly" },
  { type: "Major Service", avg_duration: "10-12 hours", avg_cost: "₹1,00,000 - ₹1,20,000", frequency: "Bi-annual" },
  { type: "Emergency", avg_duration: "12+ hours", avg_cost: "₹1,20,000+", frequency: "As needed" },
  { type: "Bogie Repair", avg_duration: "8-10 hours", avg_cost: "₹80,000 - ₹1,00,000", frequency: "As needed" },
  { type: "HVAC Repair", avg_duration: "5-7 hours", avg_cost: "₹60,000 - ₹80,000", frequency: "As needed" },
  { type: "Electrical Repair", avg_duration: "8-10 hours", avg_cost: "₹85,000 - ₹1,05,000", frequency: "As needed" },
  { type: "Door System Repair", avg_duration: "10-12 hours", avg_cost: "₹95,000 - ₹1,15,000", frequency: "As needed" },
  { type: "Brake System Overhaul", avg_duration: "12-14 hours", avg_cost: "₹1,20,000 - ₹1,40,000", frequency: "Annual" }
];

// Function to generate unique train IDs
export const genTrainId = () => {
  const usedIds = initialTrains.map(train => train.train_id);
  let newId;
  do {
    newId = "T-" + Math.floor(100 + Math.random() * 900);
  } while (usedIds.includes(newId));
  return newId;
};

// Function to generate train name
export const genTrainName = () => {
  const names = [
    "Metro Express", "Marine Drive", "Vytila Mobility", "Kochi Water Metro", 
    "Fort Kochi", "Edapally Express", "Kaloor Sports", "MG Road", 
    "JLN Stadium", "Palarivattom", "Aluva Metro", "Thykoodam Express",
    "CUSAT Connect", "Smart City", "Green Metro", "Rapid Transit",
    "Ernakulam North", "Kadavanthra", "Pathadipalam", "Elamkulam",
    "Vyttila Hub", "Pettah Station", "Kalamassery", "SN Junction",
    "Maharaja's College", "Lulu Mall", "Infopark", "Kakkanad",
    "Chottanikkara", "Angamaly"
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Function to calculate fleet statistics
export const getFleetStatistics = () => {
  const total = initialTrains.length;
  const inService = initialTrains.filter(t => t.status === "Service").length;
  const standby = initialTrains.filter(t => t.status === "Standby").length;
  const maintenance = initialTrains.filter(t => t.status === "Maintenance").length;
  
  const totalMileage = initialTrains.reduce((sum, train) => sum + train.mileage, 0);
  const avgMileage = Math.round(totalMileage / total);
  
  const totalOperationalHours = initialTrains.reduce((sum, train) => sum + train.operational_hours, 0);
  const avgOperationalHours = Math.round(totalOperationalHours / total);
  
  const highPriority = initialTrains.filter(t => t.maintenance_priority === "high").length;
  const mediumPriority = initialTrains.filter(t => t.maintenance_priority === "medium").length;
  const lowPriority = initialTrains.filter(t => t.maintenance_priority === "low").length;

  return {
    total,
    inService,
    standby,
    maintenance,
    avgMileage,
    avgOperationalHours,
    highPriority,
    mediumPriority,
    lowPriority
  };
};

// Function to get maintenance alerts
export const getMaintenanceAlerts = () => {
  const today = new Date();
  const alerts = [];
  
  initialTrains.forEach(train => {
    const nextMaintenance = new Date(train.next_maintenance);
    const daysUntilMaintenance = Math.ceil((nextMaintenance - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilMaintenance <= 7) {
      alerts.push({
        train_id: train.train_id,
        train_name: train.train_name,
        next_maintenance: train.next_maintenance,
        days_until: daysUntilMaintenance,
        priority: daysUntilMaintenance <= 3 ? "high" : daysUntilMaintenance <= 7 ? "medium" : "low"
      });
    }
  });
  
  return alerts.sort((a, b) => a.days_until - b.days_until);
};