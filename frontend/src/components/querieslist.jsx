import React, { useEffect, useState } from "react";
import axios from "axios";

const QueriesList = () => {
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
      .get("http://localhost:3050/auth/contactlist")
      .then((response) => {
        setQueriesData(response.data.message);
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
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="sm:p-6 p-4">
      <div className="flex justify-between items-start mb-4 flex-col sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Contact Queries
        </h2>
        <div className="flex items-start gap-3 flex-col sm:flex-row sm:items-center w-full sm:w-fit">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-3 shadow w-full py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filterType}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border rounded px-3 w-full shadow py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All Queries</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-blue-600 text-white">
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
            </tr>
          </thead>
          <tbody>
            {[...filteredData]
              .sort((a, b) => b.id - a.id)
              .map((query) => (
                <tr key={query.id} className="hover:bg-gray-100 border-b">
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueriesList;
