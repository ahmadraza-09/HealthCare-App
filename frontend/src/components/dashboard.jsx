/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  UsersIcon,
  CalendarIcon,
  NotepadText,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { useTheme } from "../contexts/themeContext";

const Dashboard = ({
  userCount,
  queryCount,
  appointmentCount,
  prescriptionCount,
}) => {
  const API_URL = process.env.REACT_APP_API_URL
  const [weeklyData, setWeeklyData] = useState([]);
  const name = localStorage.getItem("name");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/appointment/appointmentlist`
        );
        const appointments = res.data;

        const now = new Date();
        const currentMonth = now.getMonth();
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 6);

        const filteredAppointments = appointments.filter((item) => {
          const date = new Date(item.created_at);
          return (
            date.getMonth() === currentMonth && date >= lastWeek && date <= now
          );
        });

        const dayCount = {
          Sun: 0,
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
        };

        filteredAppointments.forEach((item) => {
          const day = new Date(item.created_at).toLocaleDateString("en-US", {
            weekday: "short",
          });
          if (day in dayCount) {
            dayCount[day]++;
          }
        });

        const chartData = Object.entries(dayCount).map(([day, count]) => ({
          day,
          appointments: count,
        }));

        setWeeklyData(chartData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div
      className={`flex-1 px-6 overflow-y-auto transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Welcome */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-indigo-900"
            }`}
          >
            Welcome Back, {name} 👋
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Here’s an overview of today’s performance
          </p>
        </div>
        <div>
          {theme === "dark" ? (
            <button
              className="flex items-center bg-white text-gray-800 px-3 py-2 rounded-lg shadow"
              onClick={toggleTheme}
            >
              <Sun className="w-6 h-6" />
              <span className="ml-2">Light</span>
            </button>
          ) : (
            <button
              className="flex items-center bg-gray-800 text-white px-3 py-2 rounded-lg shadow"
              onClick={toggleTheme}
            >
              <Moon className="w-6 h-6" />
              <span className="ml-2">Dark</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<UsersIcon size={40} />}
          label="Total Patients"
          value={userCount}
          color="text-indigo-500"
          theme={theme}
        />
        <StatCard
          icon={<Mail size={40} />}
          label="Queries"
          value={queryCount}
          color="text-orange-400"
          theme={theme}
        />
        <StatCard
          icon={<CalendarIcon size={40} />}
          label="Appointments"
          value={appointmentCount}
          color="text-green-400"
          theme={theme}
        />
        <StatCard
          icon={<NotepadText size={40} />}
          label="Prescriptions"
          value={prescriptionCount}
          color="text-red-400"
          theme={theme}
        />
      </div>

      {/* Weekly Chart */}
      <div
        className={`shadow rounded-xl p-6 hidden sm:flex sm:flex-col transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3
          className={`text-lg font-bold mb-4 ${
            theme === "dark" ? "text-gray-200" : "text-indigo-900"
          }`}
        >
          Week Appointment Data
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#555" : "#ccc"}
            />
            <XAxis dataKey="day" stroke={theme === "dark" ? "#ccc" : "#000"} />
            <YAxis stroke={theme === "dark" ? "#ccc" : "#000"} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#333" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            />
            <Bar
              dataKey="appointments"
              fill={theme === "dark" ? "#4f46e5" : "#6366f1"}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ icon, label, value, color, theme }) => (
  <div
    className={`shadow rounded-xl p-4 flex gap-5 items-center transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white"
    }`}
  >
    {icon}
    <div>
      <h3
        className={`text-md font-bold ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {label}
      </h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

export default Dashboard;
