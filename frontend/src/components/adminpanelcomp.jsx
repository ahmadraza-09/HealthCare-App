import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllPatients from "./patientslist";
import AppointmentList from "./appointmentlist";
import QueriesList from "./querieslist";
import Revenue from "./revenue";
import {
  HomeIcon,
  CalendarIcon,
  MailIcon,
  UsersIcon,
  BarChart3,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";

const navItems = [
  { label: "Patients", icon: <UsersIcon size={20} /> },
  { label: "Appointments", icon: <CalendarIcon size={20} /> },
  { label: "Queries", icon: <MailIcon size={20} /> },
  { label: "Revenue", icon: <BarChart3 size={20} /> },
];

const AdminPanelComp = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Patients");

  const handleItemClick = (item) => setSelectedItem(item);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f2f6ff] pt-14 to-[#e0e7ff]">
      {/* Sidebar */}
      <aside className="w-20 md:w-60 bg-indigo-700 text-white flex flex-col py-6 px-4 space-y-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold hidden md:block">
          HealthCare
        </h1>

        <nav className="flex flex-col gap-4">
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
        </nav>

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
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">
            Welcome Back, Admin 👋
          </h2>
          <p className="text-gray-500">
            Here’s an overview of today’s performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-sm text-gray-500">Total Patients</h3>
            <p className="text-2xl font-bold text-indigo-700">580</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-sm text-gray-500">Phone Calls</h3>
            <p className="text-2xl font-bold text-orange-500">356</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-sm text-gray-500">Appointments</h3>
            <p className="text-2xl font-bold text-green-500">288</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-sm text-gray-500">Unread Mails</h3>
            <p className="text-2xl font-bold text-red-500">05</p>
          </div>
        </div>

        <div>
          {selectedItem === "Patients" && <AllPatients />}
          {selectedItem === "Appointments" && <AppointmentList />}
          {selectedItem === "Queries" && <QueriesList />}
          {selectedItem === "Revenue" && <Revenue />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanelComp;
