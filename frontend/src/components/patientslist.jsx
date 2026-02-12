import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, FilePen } from "lucide-react";
import { toast } from "react-hot-toast";

const PatientsList = () => {
  const API_URL = process.env.REACT_APP_API_URL
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios
      .get(`${API_URL}/auth/userlist`)
      .then((response) => {
        setUserdata(response.data);
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
          if (window.confirm("Are you sure you want to delete this user?")) {
            resolve();
          } else {
            reject();
          }
        }),
        {
          pending: "Awaiting confirmation...",
          success: "User deleted successfully",
          error: "User deletion cancelled",
        }
      )
      .then(() => {
        return axios.delete(`${API_URL}/auth/deleteuser/${id}`);
      })
      .then((response) => {
        setUserdata(userdata.filter((user) => user.id !== id));
        console.log("User deleted successfully:", response.data);
        getUserList(); // Refresh the user list after deletion
      })
      .catch((error) => {
        if (error) {
          console.error("Error deleting user:", error);
          toast.error("Error deleting user");
        }
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-medium text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
        Patients List
      </h2>
      <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-gray-800">
        <table className="min-w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">
                Gender
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600 truncate">
                Date of Birth
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">
                Email
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600 truncate">
                Mobile Number
              </th>
              <th className="py-3 px-4 text-left border-b border-gray-200 dark:border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {[...userdata]
              .sort((a, b) => b.id - a.id)
              .map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4 border-b truncate border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    {user.gender}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    {new Date(user.dateofbirth).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    {user.mobilenumber}
                  </td>
                  <td className="py-5 flex gap-4 items-center border-b border-gray-200 dark:border-gray-600 justify-center dark:text-gray-200">
                    <button onClick={() => handleDelete(user.id)}>
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

export default PatientsList;
