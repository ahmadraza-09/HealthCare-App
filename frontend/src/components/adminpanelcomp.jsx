import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllPatients from "./patientslist";
import AppointmentList from "./appointmentlist";
import QueriesList from "./querieslist";
import Revenue from "./revenue";
import Dashboard from "./dashboard";
import {
  HomeIcon,
  CalendarIcon,
  MailIcon,
  UsersIcon,
  BarChart3,
  LogOutIcon,
  SettingsIcon,
  Pen,
} from "lucide-react";
import PrescriptionList from "./prescriptionlist";
import Settings from "./settings";
import { toast } from "react-toastify";

const navItems = [
  { label: "Dashboard", icon: <HomeIcon size={20} /> },
  { label: "Patients", icon: <UsersIcon size={20} /> },
  { label: "Appointments", icon: <CalendarIcon size={20} /> },
  { label: "Prescriptions", icon: <Pen size={20} /> },
  { label: "Queries", icon: <MailIcon size={20} /> },
  { label: "Revenue", icon: <BarChart3 size={20} /> },
  { label: "Settings", icon: <SettingsIcon size={20} /> },
];

const AdminPanelComp = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [userCount, setUserCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [prescriptionCount, setPrescriptionCount] = useState(0);

  const handleItemClick = (item) => setSelectedItem(item);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  useEffect(() => {
    getUserCount();
    getQueryCount();
    getAppointmentCount();
    getPrescriptionCount();
  }, []);

  const getUserCount = () => {
    axios
      .get("http://localhost:3050/auth/userlist")
      .then((response) => {
        setUserCount(response.data.message.length);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const getQueryCount = () => {
    axios
      .get("http://localhost:3050/auth/contactlist")
      .then((response) => {
        setQueryCount(response.data.message.length);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const getAppointmentCount = () => {
    axios
      .get("http://localhost:3050/auth/appointmentlist")
      .then((response) => {
        setAppointmentCount(response.data.message.length);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const getPrescriptionCount = () => {
    axios
      .get("http://localhost:3050/auth/showallprescription")
      .then((response) => {
        setPrescriptionCount(response.data.message.length);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f6ff] pt-14 to-[#e0e7ff] flex">
      {/* Fixed Sidebar */}
      <aside className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-20 md:w-60 bg-indigo-700 text-white flex flex-col py-6 px-4 space-y-6 shadow-lg z-10">
        <h1 className="text-2xl md:text-3xl font-bold hidden md:block">
          HealthCare
        </h1>

        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-indigo-600 ${
                selectedItem === item.label
                  ? "bg-white text-indigo-700 font-semibold"
                  : ""
              }`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg w-full"
          >
            <LogOutIcon size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-20 md:ml-60 flex-1 p-6 overflow-y-auto h-[calc(100vh-3.5rem)]">
        {selectedItem === "Dashboard" && (
          <Dashboard
            userCount={userCount}
            queryCount={queryCount}
            appointmentCount={appointmentCount}
            prescriptionCount={prescriptionCount}
          />
        )}
        {selectedItem === "Patients" && <AllPatients />}
        {selectedItem === "Appointments" && <AppointmentList />}
        {selectedItem === "Prescriptions" && <PrescriptionList />}
        {selectedItem === "Queries" && <QueriesList />}
        {selectedItem === "Revenue" && <Revenue />}
        {selectedItem === "Settings" && <Settings />}
      </main>
    </div>
  );
};

export default AdminPanelComp;
