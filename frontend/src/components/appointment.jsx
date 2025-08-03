import React from "react";

const Appointment = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-6 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-xl shadow-md">
      <input
        type="date"
        className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        className="px-4 py-2 w-full md:w-64 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter your health query here."
      />
      <input
        type="text"
        className="px-4 py-2 w-full md:w-64 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search Doctors, Specialist."
      />
      <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
        Search
      </button>
    </div>
  );
};

export default Appointment;
