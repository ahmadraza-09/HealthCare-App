import React from "react";

const WorkTutorial = () => {
  return (
    <div className="py-12 px-4 bg-white text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-4">
        How It Works!
      </h2>
      <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-12">
        Discover, book, and experience personalized healthcare effortlessly{" "}
        <br className="hidden sm:block" /> with our user-friendly Doctor
        Appointment Website.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-12 h-12 bg-yellow-400 text-white font-bold rounded-full flex items-center justify-center text-lg">
                1
              </div>
              <i className="fa-solid fa-user-doctor text-teal-600 text-3xl mt-2"></i>
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-2">
              Find a Doctor
            </h3>
            <p className="text-gray-600 text-sm">
              Discover skilled doctors based on{" "}
              <br className="hidden sm:block" /> specialization and location.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-12 h-12 bg-yellow-400 text-white font-bold rounded-full flex items-center justify-center text-lg">
                2
              </div>
              <i className="fa-solid fa-calendar-days text-teal-600 text-3xl mt-2"></i>
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-2">
              Book Appointment
            </h3>
            <p className="text-gray-600 text-sm">
              Effortlessly book appointments at{" "}
              <br className="hidden sm:block" /> your convenience.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-12 h-12 bg-yellow-400 text-white font-bold rounded-full flex items-center justify-center text-lg">
                3
              </div>
              <i className="fa-solid fa-briefcase-medical text-teal-600 text-3xl mt-2"></i>
            </div>
            <h3 className="text-xl font-semibold text-teal-800 mb-2">
              Get Services
            </h3>
            <p className="text-gray-600 text-sm">
              Receive personalized healthcare <br className="hidden sm:block" />{" "}
              services tailored to your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkTutorial;
