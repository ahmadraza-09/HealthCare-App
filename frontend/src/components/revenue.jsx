import React from "react";

const Revenue = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Revenue Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Revenue
            </p>
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
              ₹2,50,000
            </h3>
          </div>

          <div className="bg-green-100 dark:bg-green-900 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              This Month
            </p>
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
              ₹40,000
            </h3>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Pending Payments
            </p>
            <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">
              ₹10,000
            </h3>
          </div>

          <div className="bg-red-100 dark:bg-red-900 rounded-xl p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Refunds</p>
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-200">
              ₹5,000
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
