import React, { useEffect, useState } from "react";
import axios from "axios";

const QueriesList = () => {
  const [queriesData, setQueriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getContactList();
  }, []);

  const getContactList = () => {
    axios
      .get("http://localhost:3050/auth/contactlist")
      .then((response) => {
        setQueriesData(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching user data");
        setLoading(false);
        console.error("Error fetching user data:", error);
      });
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Contact Queries
      </h2>
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
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Mobile Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold uppercase">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {queriesData.map((query) => (
              <tr key={query.id} className="hover:bg-gray-100 border-b">
                <td className="px-6 py-4">{query.name}</td>
                <td className="px-6 py-4">{query.email}</td>
                <td className="px-6 py-4">{query.mobilenumber}</td>
                <td className="px-6 py-4">{query.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueriesList;
