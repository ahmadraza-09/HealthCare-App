import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, FilePen } from "lucide-react";
import toast from "react-hot-toast";

const AppointmentList = () => {
  const API_URL = process.env.REACT_APP_API_URL
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
      .get(`${API_URL}/appointment/appointmentlist`)
      .then((response) => {
        setAppointmentData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching user data");
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  };

  const handleDelete = (id) => {
    toast
      .promise(
        new Promise((resolve, reject) => {
          if (
            window.confirm("Are you sure you want to delete this appointment?")
          ) {
            resolve();
          } else {
            reject();
          }
        }),
        {
          pending: "Awaiting confirmation...",
          success: "Appointment deleted successfully",
          error: "Appointment deletion cancelled",
        }
      )
      .then(() => {
        return axios.delete(
          `http://localhost:3050/appointment/deleteappointment/${id}`
        );
      })
      .then((response) => {
        setAppointmentData((prevData) =>
          prevData.filter((appointment) => appointment.id !== id)
        );
        console.log("Appointment deleted successfully:", response.data);
        getAppointmentList(); // Refresh the prescription list after deletion
      })
      .catch((error) => {
        if (error) {
          console.error("Error deleting prescription:", error);
          toast.error("Error deleting prescription");
        }
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
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-blue-600 dark:text-blue-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="sm:p-6 p-4 min-h-screen bg-transparent text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="flex justify-between sm:items-center items-start gap-4 mb-4 flex-col sm:flex-row">
        <h2 className="text-2xl font-bold">Appointment List</h2>
        <div className="flex sm:items-center items-start gap-3 flex-col sm:flex-row sm:w-fit w-full">
          <input
            type="text"
            placeholder="Search Appointments..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-3 py-1 w-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white border-gray-300 text-gray-800 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          />
          <select
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border rounded w-full px-3 py-1 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          >
            <option value="all">All Appointments</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-blue-600 text-white dark:bg-blue-700">
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
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider truncate">
                Mobile Number
              </th>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider truncate">
                Appointment Date
              </th>
              <th className="px-6 py-3 text-left font-bold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...filteredData]
              .sort((a, b) => b.id - a.id)
              .map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 truncate">{appointment.name}</td>
                  <td className="px-6 py-4">
                    {new Date(appointment.dateofbirth).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-6 py-4">{appointment.gender}</td>
                  <td className="px-6 py-4">{appointment.concern}</td>
                  <td className="px-6 py-4">{appointment.mobilenumber}</td>
                  <td className="px-6 py-4">
                    {new Date(appointment.created_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="py-5 flex gap-4 items-center justify-center dark:text-gray-200">
                    <button onClick={() => handleDelete(appointment.id)}>
                      <Trash2 className="text-red-500" />
                    </button>
                    <button>
                      <FilePen className="text-green-500" />
                    </button>
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
