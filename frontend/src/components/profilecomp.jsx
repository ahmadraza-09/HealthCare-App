import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileComp = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) getProfileData();
  }, [id]);

  const getProfileData = () => {
    axios
      .get(`http://localhost:3050/auth/singleuserlist/${id}`)
      .then((response) => {
        const userData = response.data.message[0];
        userData.dateofbirth = new Date(userData.dateofbirth)
          .toISOString()
          .split("T")[0];
        setName(userData.name);
        setGender(userData.gender);
        setDateofbirth(userData.dateofbirth);
        setEmail(userData.email);
        setMobilenumber(userData.mobilenumber);
        setImage(userData.image);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEdit = () => setIsEditing(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { name, gender, dateofbirth, mobilenumber, email };
    axios
      .put(`http://localhost:3050/auth/updateuser/${id}`, userData)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl pt-32">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
          />
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">User Profile</p>
          </div>
        </div>
        <div className="space-x-2">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <h2 className="text-lg font-medium text-indigo-800 border-b pb-2 mb-4">
        Information
      </h2>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateofbirth}
              onChange={(e) => setDateofbirth(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              value={mobilenumber}
              onChange={(e) => setMobilenumber(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <p className="mt-1">{name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <p className="mt-1">{email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Gender
            </label>
            <p className="mt-1">{gender}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Date of Birth
            </label>
            <p className="mt-1">{dateofbirth}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Mobile Number
            </label>
            <p className="mt-1">{mobilenumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComp;
