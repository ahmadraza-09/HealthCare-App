import React, { useState } from "react";
import axios from "axios";

const ContactComp = () => {
  const [name, getName] = useState("");
  const [mobilenumber, getMobilenumber] = useState("");
  const [email, getEmail] = useState("");
  const [message, getMessage] = useState("");
  const [formerror, getFormerror] = useState("");

  const nameregex = /^[a-zA-Z ]{2,30}$/;
  const mobilenumberregex = /^[0-9]{10}$/;
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name) return getFormerror("Enter your Name");
    if (!nameregex.test(name))
      return getFormerror("Name should only contain letters");

    if (!email) return getFormerror("Enter your Email");
    if (!emailregex.test(email)) return getFormerror("Enter a valid Email");

    if (!mobilenumber) return getFormerror("Enter your Mobile Number");
    if (!mobilenumberregex.test(mobilenumber))
      return getFormerror("Invalid Mobile Number");

    const contactData = { name, mobilenumber, email, message };

    axios
      .post("http://localhost:3050/auth/contact", contactData)
      .then((res) => {
        const msg = res.data.message;
        if (
          msg === "Please fill the form" ||
          msg.includes("already submitted")
        ) {
          getFormerror(msg);
        } else {
          alert("Message Sent Successfully");
          getName("");
          getMobilenumber("");
          getEmail("");
          getMessage("");
          getFormerror("");
        }
      })
      .catch(() => {
        getFormerror("Contact request failed. Please try again later.");
      });
  };

  return (
    <div className="bg-gradient-to-br from-cyan-100 via-white to-blue-50 min-h-screen py-10 pt-32 px-4 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <img
            src="images/contact.png"
            alt="Contact"
            className="w-24 mx-auto mb-6"
          />
          <form onSubmit={submitHandler} className="space-y-5">
            <h2 className="text-2xl font-bold text-center text-[#135D66]">
              Contact Us
            </h2>
            {formerror && (
              <p className="text-red-600 text-center text-sm">{formerror}</p>
            )}

            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => getName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => getEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your mobile number"
                value={mobilenumber}
                onChange={(e) => getMobilenumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-300"
                placeholder="Enter your query here..."
                value={message}
                onChange={(e) => getMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-[#135D66] text-white w-full py-2 rounded-lg hover:bg-[#0e4e55] transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <InfoBox
            icon="fa-phone"
            title="Call Us"
            lines={["1(234)567-891", "1(234)384-023"]}
          />
          <InfoBox
            icon="fa-location-dot"
            title="Location"
            lines={["121 Rock Street, 21 Avenue, New York, NY 92103-9000"]}
          />
          <InfoBox
            icon="fa-clock"
            title="Hours"
            lines={[
              "Mon - Fri .... 11 am - 8 pm",
              "Sat - Sun .... 6 am - 8 pm",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ icon, title, lines }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
    <div className="text-2xl text-[#135D66]">
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <h4 className="font-semibold text-[#135D66]">{title}</h4>
      {lines.map((line, index) => (
        <p key={index} className="text-gray-700 text-sm">
          {line}
        </p>
      ))}
    </div>
  </div>
);

export default ContactComp;
