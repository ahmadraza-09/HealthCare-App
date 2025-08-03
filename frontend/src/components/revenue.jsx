import React from "react";

const Revenue = () => {
  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Revenue Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <h3 className="text-xl font-semibold text-blue-800">₹2,50,000</h3>
          </div>

          <div className="bg-green-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">This Month</p>
            <h3 className="text-xl font-semibold text-green-800">₹40,000</h3>
          </div>

          <div className="bg-yellow-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Pending Payments</p>
            <h3 className="text-xl font-semibold text-yellow-800">₹10,000</h3>
          </div>

          <div className="bg-red-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Refunds</p>
            <h3 className="text-xl font-semibold text-red-800">₹5,000</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
