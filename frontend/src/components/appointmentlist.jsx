import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAppointmentList();
  }, []);

  const getAppointmentList = () => {
    axios
      .get("http://localhost:3050/auth/appointmentlist")
      .then((response) => {
        setAppointmentData(response.data.message);
        setFilteredData(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching user data");
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
    applyFilters(value, searchTerm);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(filterType, term);
  };

  const applyFilters = (filter, search) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let data = [...appointmentData];

    if (filter === "today") {
      data = data.filter((a) => {
        const appointmentDate = new Date(a.created_at);
        return appointmentDate.toDateString() === today.toDateString();
      });
    } else if (filter === "yesterday") {
      data = data.filter((a) => {
        const appointmentDate = new Date(a.created_at);
        return appointmentDate.toDateString() === yesterday.toDateString();
      });
    }

    if (search.trim() !== "") {
      data = data.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.mobilenumber.toLowerCase().includes(search.toLowerCase()) ||
          a.concern.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(data);
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
    <div className="sm:p-6 p-4 bg-transparent min-h-screen">
      <div className="flex justify-between sm:items-center items-start gap-4  mb-4 flex-col sm:flex-row">
        <h2 className="text-2xl font-bold text-gray-800">Appointment List</h2>
        <div className="flex sm:items-center items-start gap-3 flex-col sm:flex-row sm:w-fit w-full">
          <input
            type="text"
            placeholder="Search Appointments..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-3 py-1 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border rounded w-full px-3 py-1 focus:outline-none shadow focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Appointments</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider truncate">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider">
                Concern
              </th>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider">
                Appointment Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...filteredData]
              .sort((a, b) => b.id - a.id)
              .map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800 truncate">
                    {appointment.name}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(appointment.dateofbirth).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
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
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(appointment.created_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
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
