import React from "react";
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

const Dashboard = () => {
  return (
    <div className="flex-1 px-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">
          Welcome Back, Admin 👋
        </h2>
        <p className="text-gray-500">
          Here’s an overview of today’s performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4 flex gap-5 items-center">
          <UsersIcon size={40} />
          <div>
            <h3 className="text-md text-gray-500 font-bold">Total Patients</h3>
            <p className="text-2xl font-bold text-indigo-700">580</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex gap-5 items-center">
          <Mail size={40} />
          <div>
            <h3 className="text-md text-gray-500 font-bold">Queries</h3>
            <p className="text-2xl font-bold text-orange-500">356</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex gap-5 items-center">
          <CalendarIcon size={40} />
          <div>
            <h3 className="text-md text-gray-500 font-bold">Appointments</h3>
            <p className="text-2xl font-bold text-green-500">288</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-4 flex gap-5 items-center">
          <NotepadText size={40} />
          <div>
            <h3 className="text-md text-gray-500 font-bold">Prescriptions</h3>
            <p className="text-2xl font-bold text-red-500">85</p>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-4">
          Weekly Patient Visits
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { day: "Mon", patients: 35 },
              { day: "Tue", patients: 50 },
              { day: "Wed", patients: 40 },
              { day: "Thu", patients: 65 },
              { day: "Fri", patients: 30 },
              { day: "Sat", patients: 45 },
              { day: "Sun", patients: 20 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="patients" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
