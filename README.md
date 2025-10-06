# 🚇 KMRL AI Scheduler

An **AI-powered metro scheduling and simulation system** built for **Smart India Hackathon (SIH)**.  
This project focuses on **Kochi Metro Rail Limited (KMRL)** but is designed to scale to other metro networks across India.  

The aim is to **optimize train operations, predict demand, reduce delays, and provide real-time monitoring** using a combination of **React (Frontend), Django/FastAPI (Backend), AI Models, and PostgreSQL (Database).**

--
---

## 🌍 Overview

Metro systems face challenges in:
- Inefficient handling of **peak-hour passenger demand**
- Poor **resource allocation** and timetable planning
- **Delays** due to static schedules
- Difficulty in **testing timetables before deployment**

🚀 **KMRL AI Scheduler** solves this by:
- 📊 Predicting **passenger demand**
- 🛠 Optimizing **train schedules**
- 🚦 Simulating operations in a **virtual environment**
- 🔔 Sending **real-time alerts for breakdowns & delays**
- 📡 Providing a **live dashboard for operators**

---

## ✨ Features

- 🔐 **Authentication** (JWT-based, role-based operator/admin access)
- 🏠 **Home Page** – Overview of the system with modern UI
- 📊 **Dashboard** – KPIs for trains (in-service, standby, maintenance)
- 📅 **Timetable Page** – Manage daily schedules (CRUD supported)
- 🚂 **Train Details** – View train info, routes, and maintenance logs
- 🔔 **Notifications** – Delay/breakdown/demand alerts
- 🧪 **Simulation** – Test AI-generated timetables before deployment
- ⚙️ **Settings & Profile** – User management & customization
- 🌐 **Responsive Glassy UI** – Works across all devices

---

## 🛠 Tech Stack

| Layer        | Technology                                    | Purpose                              |
|--------------|-----------------------------------------------|--------------------------------------|
| **Frontend** | React.js, TailwindCSS, ShadCN/UI              | Interactive dashboard with modern UI |
| **Routing**  | React Router                                  | Smooth navigation between pages      |
| **Backend**  | Django REST / FastAPI                         | API + AI endpoints                   |
| **Database** | PostgreSQL                                    | Persistent storage of schedules      |
| **Cache**    | Redis                                         | Real-time schedule caching           |
| **AI/ML**    | Scikit-learn, TensorFlow, PyTorch             | Demand & delay prediction            |
| **Optimization** | Google OR-Tools                          | Resource & timetable optimization    |
| **DevOps**   | Docker, Netlify, Render, AWS                  | Deployment & hosting                 |

---

## 📄 Pages & Components

| Page            | Description |
|-----------------|-------------|
| **Home.jsx**    | Glassy hero section with system overview |
| **Dashboard.jsx** | KPIs, service trains, latest plan |
| **Timetable.jsx** | CRUD timetable management |
| **TrainDetails.jsx** | Train-level status, routes, maintenance |
| **Simulation.jsx** | Virtual testing of schedules |
| **Notifications.jsx** | Alerts for delays/breakdowns |
| **Profile.jsx** | User profile & preferences |
| **Settings.jsx** | Admin settings |
| **Navbar.jsx** | Responsive glassy navbar |
| **ProtectedRoute.jsx** | Auth-based route guard |

---
### to run this project (Vite React)
```bash
npm install
npm run dev
```
### Live Demo (on browser)
```bash
https://kochimetro09.netlify.app/
```
