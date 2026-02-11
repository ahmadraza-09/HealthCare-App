import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AppointmentPage = () => {
  const API_URL = process.env.REACT_APP_API_URL
  const [name, getName] = useState("");
  const [dateofbirth, getDateofbirth] = useState("");
  const [gender, getGender] = useState("");
  const [concern, getConcern] = useState("");
  const [mobilenumber, getMobilenumber] = useState("");
  const [formerror, getFormerror] = useState("");

  const nameregex = /^[a-z A-Z]{2,15}$/;
  const mobilenumberregex = /^[0-9]{10}$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name)
      return getFormerror("Enter your Name"), toast.error("Name is required");
    if (!nameregex.test(name))
      return getFormerror("Enter Name in Letters"), toast.error("Invalid Name");
    if (!mobilenumber)
      return (
        getFormerror("Enter your Mobile Number"),
        toast.error("Mobile Number is required")
      );
    if (!mobilenumberregex.test(mobilenumber))
      return (
        getFormerror("Invalid Mobile Number"),
        toast.error("Mobile Number must be 10 digits")
      );
    if (!dateofbirth)
      return (
        getFormerror("Select your Date of Birth"),
        toast.error("Date of Birth is required")
      );
    if (!gender)
      return getFormerror("Select your Gender"), toast.error("Select Gender");
    if (!concern)
      return (
        getFormerror("Select Your Health Concern"),
        toast.error("Health Concern is required")
      );

    const appointmentData = {
      name,
      dateofbirth,
      gender,
      concern,
      mobilenumber,
    };

    axios
      .post(`${API_URL}/appointment/appointment`, appointmentData)
      .then((response) => {
        const msg = response.data.message;
        if (
          msg === "All fields are required" ||
          msg.includes("limit reached")
        ) {
          getFormerror(msg);
        } else {
          toast.success("Appointment Booked Successfully");
          getName("");
          getDateofbirth("");
          getGender("");
          getConcern("");
          getMobilenumber("");
          getFormerror("");
        }
      })
      .catch(() => {
        getFormerror("Appointment request failed");
      });
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Book Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Appointment
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Schedule a consultation with our experienced doctors in just a few
            easy steps.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto transition-colors duration-300">
          {formerror && (
            <p className="text-red-600 dark:text-red-400 text-sm mb-4 text-center">
              {formerror}
            </p>
          )}

          <form className="space-y-6" onSubmit={submitHandler}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => getName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                value={mobilenumber}
                onChange={(e) => getMobilenumber(e.target.value)}
                placeholder="Enter Mobile Number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateofbirth}
                onChange={(e) => getDateofbirth(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => getGender(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Health Concern */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Health Concern
              </label>
              <select
                value={concern}
                onChange={(e) => getConcern(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select</option>
                <option value="Headache">Headache</option>
                <option value="Fever">Fever</option>
                <option value="Cough">Cough</option>
                <option value="Back Pain">Back Pain</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentPage;
