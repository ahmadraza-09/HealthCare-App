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
  NotebookText,
  Heart,
} from "lucide-react";
import PrescriptionList from "./prescriptionlist";
import Settings from "./settings";
import toast from "react-hot-toast";

const navItems = [
  { label: "Dashboard", icon: <HomeIcon size={20} /> },
  { label: "Patients", icon: <UsersIcon size={20} /> },
  { label: "Appointments", icon: <CalendarIcon size={20} /> },
  { label: "Prescriptions", icon: <NotebookText size={20} /> },
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
    <div className="min-h-screen bg-gradient-to-br from-[#f2f6ff] to-[#e0e7ff] flex">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 h-screen w-20 md:w-60 bg-indigo-700 text-white flex flex-col py-4 px-4 space-y-4 shadow-lg z-10">
        {/* <h1 className="text-2xl md:text-3xl font-bold hidden md:block bg-[#135D66] px-4 py-2 rounded-lg border-white border-2">
          Health<span className="text-yellow-500">Care</span>
        </h1> */}

        <div className="flex items-center space-x-2 cursor-pointer bg-white p-2 rounded-lg">
          <div className="w-10 md:h-10 h-8 bg-gradient-to-r from-blue-600 to-blue-800 md:rounded-xl rounded-md flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            MediCare+
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.label)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
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
      <main className="ml-20 md:ml-60 flex-1 py-6 px-0 overflow-y-auto h-screen">
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
