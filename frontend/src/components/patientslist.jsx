import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientsList = () => {
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios
      .get("http://localhost:3050/auth/userlist")
      .then((response) => {
        setUserdata(response.data.message);
        // setUserCount(response.data.message.length);
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
      <div className="text-center mt-10 text-lg font-medium text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Patients List</h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left border-b">Name</th>
              <th className="py-3 px-4 text-left border-b">Gender</th>
              <th className="py-3 px-4 text-left border-b">Date of Birth</th>
              <th className="py-3 px-4 text-left border-b">Email</th>
              <th className="py-3 px-4 text-left border-b">Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {[...userdata]
              .sort((a, b) => b.id - a.id)
              .map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.gender}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(user.dateofbirth).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.mobilenumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsList;
