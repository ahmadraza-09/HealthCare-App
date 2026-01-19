import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, FilePen } from "lucide-react";
import { toast } from "react-hot-toast";

const QueriesList = () => {
  const API_URL = "https://apimedicare.razasoftwares.in"
  const [queriesData, setQueriesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getContactList();
  }, []);

  const getContactList = () => {
    axios
      .get(`${API_URL}/query/contactlist`)
      .then((response) => {
        setQueriesData(response.data.message);
        setFilteredData(response.data.message);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching user data");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    toast
      .promise(
        new Promise((resolve, reject) => {
          if (window.confirm("Are you sure you want to delete this query?")) {
            resolve();
          } else {
            reject();
          }
        }),
        {
          pending: "Awaiting confirmation...",
          success: "Query deleted successfully",
          error: "Query deletion cancelled",
        }
      )
      .then(() => {
        return axios.delete(`${API_URL}/query/deletequery/${id}`);
      })
      .then((response) => {
        setFilteredData(filteredData.filter((query) => query.id !== id));
        console.log("Query deleted successfully:", response.data);
        getContactList(); // Refresh the user list after deletion
      })
      .catch((error) => {
        if (error) {
          console.error("Error deleting query:", error);
          toast.error("Error deleting query");
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

    let data = [...queriesData];

    if (filter === "today") {
      data = data.filter((q) => {
        const queryDate = new Date(q.created_at);
        return queryDate.toDateString() === today.toDateString();
      });
    } else if (filter === "yesterday") {
      data = data.filter((q) => {
        const queryDate = new Date(q.created_at);
        return queryDate.toDateString() === yesterday.toDateString();
      });
    }

    if (search.trim() !== "") {
      data = data.filter(
        (q) =>
          q.name.toLowerCase().includes(search.toLowerCase()) ||
          q.email.toLowerCase().includes(search.toLowerCase()) ||
          q.mobilenumber.toLowerCase().includes(search.toLowerCase()) ||
          q.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(data);
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-lg text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-600 dark:text-red-400 text-center mt-10">
        {error}
      </div>
    );

  return (
    <div className="sm:p-6 p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-start mb-4 flex-col sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Contact Queries
        </h2>
        <div className="flex items-start gap-3 flex-col sm:flex-row sm:items-center w-full sm:w-fit">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border dark:border-gray-700 rounded px-3 shadow w-full py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200"
          />
          <select
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border dark:border-gray-700 rounded px-3 w-full shadow py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="all">All Queries</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 dark:text-gray-200">
          <thead className="bg-blue-600 dark:bg-blue-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase truncate">
                Mobile Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Message
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Query Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[...filteredData]
              .sort((a, b) => b.id - a.id)
              .map((query) => (
                <tr
                  key={query.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 truncate">{query.name}</td>
                  <td className="px-6 py-4">{query.email}</td>
                  <td className="px-6 py-4">{query.mobilenumber}</td>
                  <td className="px-6 py-4">{query.message}</td>
                  <td className="px-6 py-4 truncate">
                    {new Date(query.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-5 flex gap-4 items-center justify-center dark:text-gray-200">
                    <button onClick={() => handleDelete(query.id)}>
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

export default QueriesList;
