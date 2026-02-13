/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL =
  process.env.REACT_APP_API_URL || "https://apimedicare.razasoftwares.in";

const ProfileComp = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!id || !token) {
      navigate("/login");
      return;
    }
    getProfileData();
  }, [id]);

  const getProfileData = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/auth/singleuserlist/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("API Response:", response.data);

    const apiData = response.data;

    let user =
      Array.isArray(apiData) ? apiData[0] :
      Array.isArray(apiData?.data) ? apiData.data[0] :
      apiData;

    if (!user) {
      toast.error("User not found");
      return;
    }

    let formattedDate = "";

    if (user.dateofbirth) {
      const parsedDate = new Date(user.dateofbirth);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toISOString().split("T")[0];
      }
    }

    setName(user.name || "");
    setGender(user.gender || "");
    setDateofbirth(formattedDate);
    setEmail(user.email || "");
    setMobilenumber(user.mobilenumber || "");
    setImage(user.image || "");

  } catch (error) {
    console.error("Error fetching profile:", error);
    toast.error("Failed to load profile");
  }
  };



  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.clear();
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `${API_URL}/auth/updateuser/${id}`,
        { name, gender, dateofbirth, mobilenumber, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
      toast.success("Profile Updated Successfully");
      getProfileData();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <section className="py-20 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 min-h-screen dark:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border dark:border-gray-700">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 mb-10">
            <div className="flex items-center gap-6">
              {image ? (
                <img
                  src={image}
                  alt="User"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
                />
              ) : (
                <div className="flex items-center justify-center w-20 h-20 bg-blue-400 rounded-full text-white font-semibold text-4xl">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="dark:text-gray-400">User Profile</p>
              </div>
            </div>

            <div className="flex gap-3">
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2 rounded-xl bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  Edit Profile
                </button>
              )}

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Info */}
          {isEditing ? (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <InputField label="Name" value={name} onChange={setName} />
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <InputField
                label="Date of Birth"
                type="date"
                value={dateofbirth}
                onChange={setDateofbirth}
              />
              <InputField
                label="Mobile Number"
                value={mobilenumber}
                onChange={setMobilenumber}
              />

              <div>
                <label className="block text-sm mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-full flex justify-end">
                <button
                  type="submit"
                  className="mt-4 px-8 py-3 bg-green-600 text-white rounded-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Name" value={name} />
              <InfoItem label="Email" value={email} />
              <InfoItem label="Gender" value={gender} />
              <InfoItem label="Date of Birth" value={dateofbirth} />
              <InfoItem label="Mobile Number" value={mobilenumber} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="p-4 rounded-xl dark:bg-gray-700 shadow-sm">
    <div className="text-sm text-gray-400">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

const InputField = ({ label, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl border"
    />
  </div>
);

export default ProfileComp;
