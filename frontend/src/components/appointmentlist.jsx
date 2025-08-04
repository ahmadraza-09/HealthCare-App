import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAppointmentList();
  }, []);

  const getAppointmentList = () => {
    axios
      .get("http://localhost:3050/auth/appointmentlist")
      .then((response) => {
        setAppointmentData(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching user data");
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-blue-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Appointment List
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-bold text-white uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-left font-bold text-white uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left font-bold text-white uppercase tracking-wider">
                Concern
              </th>
              <th className="px-6 py-3 text-left font-bold text-white uppercase tracking-wider">
                Mobile Number
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointmentData.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{appointment.name}</td>
                <td className="px-6 py-4 text-gray-800">
                  {new Date(appointment.dateofbirth).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {appointment.gender}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {appointment.concern}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {appointment.mobilenumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
