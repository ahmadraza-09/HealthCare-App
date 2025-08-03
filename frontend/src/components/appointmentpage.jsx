import React, { useState } from "react";
import axios from "axios";

const AppointmentPage = () => {
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

    if (!name) return getFormerror("Enter your Name");
    if (!nameregex.test(name)) return getFormerror("Enter Name in Letters");
    if (!dateofbirth) return getFormerror("Select your Date of Birth");
    if (!gender) return getFormerror("Select your Gender");
    if (!concern) return getFormerror("Select Your Health Concern");
    if (!mobilenumber) return getFormerror("Enter your Mobile Number");
    if (!mobilenumberregex.test(mobilenumber))
      return getFormerror("Invalid Mobile Number");

    const appointmentData = {
      name,
      dateofbirth,
      gender,
      concern,
      mobilenumber,
    };

    axios
      .post("http://localhost:3050/auth/appointment", appointmentData)
      .then((response) => {
        const msg = response.data.message;
        if (
          msg === "All fields are required" ||
          msg.includes("limit reached")
        ) {
          getFormerror(msg);
        } else {
          alert("Appointment Booked Successfully");
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
    <div className="bg-gradient-to-br from-cyan-100 via-white to-blue-100 min-h-screen py-10 px-4 pt-32">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 bg-white rounded-2xl shadow-lg p-8">
        {/* Left Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="images/appointment2.png"
            alt="Appointment"
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-[#135D66] mb-6 text-center">
            Book Your Appointment
          </h2>

          {formerror && (
            <p className="text-red-600 text-sm text-center mb-4">{formerror}</p>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium">Name</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2"
                placeholder="Name"
                value={name}
                onChange={(e) => getName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Date of Birth</label>
              <input
                type="date"
                className="border rounded-lg px-4 py-2"
                value={dateofbirth}
                onChange={(e) => getDateofbirth(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Gender</label>
              <select
                className="border rounded-lg px-4 py-2"
                value={gender}
                onChange={(e) => getGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Health Concern</label>
              <select
                className="border rounded-lg px-4 py-2"
                value={concern}
                onChange={(e) => getConcern(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Headache">Headache</option>
                <option value="Fever">Fever</option>
                <option value="Cough">Cough</option>
                <option value="Back Pain">Back Pain</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Mobile Number</label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2"
                placeholder="Enter Mobile Number"
                value={mobilenumber}
                onChange={(e) => getMobilenumber(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-[#135D66] text-white w-full py-2 rounded-lg mt-4 hover:bg-[#104c55] transition"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
