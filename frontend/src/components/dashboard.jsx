import React, { useEffect, useState } from "react";
import { UsersIcon, CalendarIcon, NotepadText, Mail } from "lucide-react";
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

const Dashboard = ({
  userCount,
  queryCount,
  appointmentCount,
  prescriptionCount,
}) => {
  const [weeklyData, setWeeklyData] = useState([]);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3050/auth/appointmentlist"
        ); // Replace with your endpoint
        const appointments = res.data.message;

        const now = new Date();
        const currentMonth = now.getMonth();
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 6); // Last 7 days including today

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
    <div className="flex-1 px-6 overflow-y-auto">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">
          Welcome Back, {name} 👋
        </h2>
        <p className="text-gray-500">
          Here’s an overview of today’s performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<UsersIcon size={40} />}
          label="Total Patients"
          value={userCount}
          color="text-indigo-700"
        />
        <StatCard
          icon={<Mail size={40} />}
          label="Queries"
          value={queryCount}
          color="text-orange-500"
        />
        <StatCard
          icon={<CalendarIcon size={40} />}
          label="Appointments"
          value={appointmentCount}
          color="text-green-500"
        />
        <StatCard
          icon={<NotepadText size={40} />}
          label="Prescriptions"
          value={prescriptionCount}
          color="text-red-500"
        />
      </div>

      {/* Weekly Chart */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-4">
          Week Appointment Data
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="appointments" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white shadow rounded-xl p-4 flex gap-5 items-center">
    {icon}
    <div>
      <h3 className="text-md text-gray-500 font-bold">{label}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

export default Dashboard;
