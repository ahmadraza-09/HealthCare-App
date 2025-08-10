import React from "react";

const WorkTutorial = () => {
  const steps = [
    {
      number: 1,
      icon: "fa-user-doctor",
      title: "Find a Doctor",
      desc: "Discover skilled doctors based on specialization and location.",
    },
    {
      number: 2,
      icon: "fa-calendar-days",
      title: "Book Appointment",
      desc: "Effortlessly book appointments at your convenience.",
    },
    {
      number: 3,
      icon: "fa-briefcase-medical",
      title: "Get Services",
      desc: "Receive personalized healthcare services tailored to your needs.",
    },
  ];

  return (
    <div className="py-14 px-6 bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-center transition-colors duration-300">
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4">
        How It Works!
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-12">
        Discover, book, and experience personalized healthcare effortlessly with
        our user-friendly Doctor Appointment Website.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 flex flex-col items-center">
                <div className="w-14 h-14 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-lg shadow-md">
                  {step.number}
                </div>
                <i
                  className={`fa-solid ${step.icon} text-teal-600 dark:text-teal-400 text-3xl mt-3`}
                ></i>
              </div>
              <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-300 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkTutorial;
