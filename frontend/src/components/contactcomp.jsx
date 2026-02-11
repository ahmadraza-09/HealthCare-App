/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import toast from "react-hot-toast";

const ContactSection = () => {
  const API_URL = process.env.REACT_APP_API_URL
  const [name, setName] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormerror] = useState("");

  const nameregex = /^[a-zA-Z ]{2,30}$/;
  const mobilenumberregex = /^[0-9]{10}$/;
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name)
      return setFormerror("Enter your Name"), toast.error("Enter your Name");
    if (!nameregex.test(name))
      return (
        setFormerror("Name should only contain letters"),
        toast.error("Name should only contain letters")
      );

    if (!email)
      return setFormerror("Enter your Email"), toast.error("Enter your Email");
    if (!emailregex.test(email))
      return (
        setFormerror("Enter a valid Email"), toast.error("Enter a valid Email")
      );

    if (!mobilenumber)
      return (
        setFormerror("Enter your Mobile Number"),
        toast.error("Enter your Mobile Number")
      );
    if (!mobilenumberregex.test(mobilenumber))
      return (
        setFormerror("Invalid Mobile Number"),
        toast.error("Invalid Mobile Number")
      );

    const contactData = { name, mobilenumber, email, message };

    axios
      .post(`${API_URL}/query/contact`, contactData)
      .then((res) => {
        const msg = res.data.message;
        if (
          msg === "Please fill the form" ||
          msg.includes("already submitted")
        ) {
          setFormerror(msg);
        } else {
          toast.success("Message Sent Successfully");
          setName("");
          setMobileNumber("");
          setEmail("");
          setMessage("");
          setFormerror("");
        }
      })
      .catch(() => {
        setFormerror("Contact request failed. Please try again later.");
      });
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to take the next step in your healthcare journey? Contact us
            today to schedule your consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                Contact Information
              </h3>
              <div className="space-y-5 sm:space-y-6">
                <InfoItem
                  icon={<Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  bg="from-blue-600 to-cyan-600"
                  label="Mobile Number"
                  value="+1 (555) 123-4567"
                />
                <InfoItem
                  icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  bg="from-green-600 to-emerald-600"
                  label="Email"
                  value="info@medicareplus.com"
                />
                <InfoItem
                  icon={<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  bg="from-purple-600 to-pink-600"
                  label="Address"
                  value="123 Healthcare Ave, Medical District"
                />
                <InfoItem
                  icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                  bg="from-orange-600 to-red-600"
                  label="Hours"
                  value="Mon-Fri: 8AM-8PM"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Emergency Care
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Need immediate medical attention? Our emergency department is
                open 24/7.
              </p>
              <button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                Emergency Contact
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 transition-colors">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Contact Us
            </h3>

            {formError && (
              <p className="text-red-600 dark:text-red-400 text-sm mb-4">
                {formError}
              </p>
            )}

            <form className="space-y-5 sm:space-y-6" onSubmit={submitHandler}>
              <InputField
                label="Name"
                value={name}
                onChange={setName}
                placeholder="John"
              />

              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="john@gmail.com"
              />

              <InputField
                label="Mobile Number"
                type="tel"
                value={mobilenumber}
                onChange={setMobileNumber}
                placeholder="+1 (555) 123-4567"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
                  placeholder="Tell us about your concern..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoItem = ({ icon, bg, label, value }) => (
  <div className="flex items-center space-x-3 sm:space-x-4">
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
        {label}
      </div>
      <div className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white break-words">
        {value}
      </div>
    </div>
  </div>
);

const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 dark:bg-gray-900 dark:text-gray-100 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
    />
  </div>
);

export default ContactSection;
