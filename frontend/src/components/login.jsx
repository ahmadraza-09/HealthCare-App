/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RefreshCw } from "lucide-react";

const Login = () => {
  const API_URL = "https://apimedicare.razasoftwares.in"
  const navigate = useNavigate();
  const location = useLocation();

  const [name, getName] = useState("");
  const [dateofbirth, getDateofbirth] = useState("");
  const [gender, getGender] = useState("");
  const [mobilenumber, getMobilenumber] = useState("");
  const [identifier, getIdentifier] = useState("");
  const [password, getPassword] = useState("");
  const [email, getEmail] = useState("");
  const [heading, getHeading] = useState("Sign Up");
  const [changebutton, getChangebutton] = useState("Register");
  const [linktext, getLinktext] = useState("Login");
  const [textlink, getTextlink] = useState("Already have an Account?");
  const [formerror, getFormerror] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, getOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);

  const nameregex = /^[a-z A-Z]{2,15}$/;
  const mobilenumberregex = /^[0-9]{10}$/;
  const emailregex = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,6}$/;
  const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;

  useEffect(() => {
    if (location.pathname === "/login") {
      getChangebutton("Login");
      getLinktext("Register");
      getTextlink("Not Registered Yet?");
      getHeading("Sign In");
    }
  }, [location.pathname]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (changebutton !== "Login") {
      if (!name.match(nameregex))
        return getFormerror("Enter Name"), toast.error("Enter Name");
      if (!dateofbirth)
        return getFormerror("Enter DOB"), toast.error("Enter DOB");
      if (!gender)
        return getFormerror("Select gender"), toast.error("Select Gender");
      if (!email.match(emailregex))
        return getFormerror("Invalid Email"), toast.error("Invalid Email");
      if (!mobilenumber.match(mobilenumberregex))
        return getFormerror(
          "Invalid Mobile Number",
          toast.error("Invalid Mobile Number")
        );
    }

    if (!identifier && changebutton === "Login")
      return (
        getFormerror("Enter Mobile/Email"), toast.error("Enter Mobile/Email")
      );
    if (!password.match(passwordRegex))
      return (
        getFormerror("Password must be at least 8 characters"),
        toast.error("Password must be at least 8 characters")
      );

    try {
      if (location.pathname === "/login") {
        const loginData = { identifier, password };

        const { data } = await axios.post(
          `${API_URL}/auth/login`,
          loginData
        );

        if (
          typeof data.message === "string" &&
          data.message.includes("Invalid")
        ) {
          getFormerror(data.message);
          return;
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.user.id);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("mobileNumber", data.user.mobilenumber);
          localStorage.setItem("dateofbirth", data.user.dateofbirth);
          localStorage.setItem("gender", data.user.gender);
          toast.success("Logged In Successfully");
          getFormerror("");
          navigate("/");
        }
      } else {
        const newUser = {
          name,
          gender,
          dateofbirth,
          mobilenumber,
          email,
          password,
        };
        const { data } = await axios.post(
          `${API_URL}/auth/sendotp`,
          newUser
        );

        if (
          typeof data.message === "string" &&
          data.message.includes("exists")
        ) {
          getFormerror(data.message);
          return;
        } else {
          getFormerror("");
          // localStorage.setItem("email", data.user.email);
          setIsOtpSent(true);
          toast.success("OTP sent to your email Successfully");
        }
      }
    } catch (err) {
      if (err.response?.data?.message) {
        getFormerror(err.response.data.message);
      } else {
        getFormerror("Something went wrong. Try again.");
      }
      console.error(err);
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();

    if (!otp) {
      return getFormerror("Please Enter OTP");
    }

    try {
      const OtpData = {
        email,
        otp,
      };

      const { data } = await axios.post(
        `${API_URL}/auth/verifyotp`,
        OtpData
      );

      if (
        typeof data.message === "string" &&
        data.message.includes("Invalid")
      ) {
        getFormerror(data.message);
        return;
      }
      setIsOtpSent(false);
      navigate("/login");
      getFormerror("");
      toast.success("Registered Successfully");
    } catch (err) {
      if (err.response?.data?.message) {
        getFormerror(err.response.data.message);
      } else {
        getFormerror("Something went wrong. Try again.");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, [timeLeft]);

  // Format MM:SS
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            {heading}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Patient
            </span>
          </h2>
          {changebutton !== "Register" && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Hello!{" "}
              <span className="text-blue-600 font-semibold">Welcome</span> Back
              😎
            </p>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
          {formerror && (
            <p className="text-red-600 dark:text-red-400 text-sm mb-4 text-center">
              {formerror}
            </p>
          )}
          {isOtpSent ? (
            <form onSubmit={verifyOtpHandler}>
              <h2 className="dark:text-white font-bold text-2xl text-center">
                Verify OTP
              </h2>
              {/* Timer for 10 Minutes */}
              <div className="mt-6">
                {timeLeft > 0 ? (
                  <p className="text-sm ml-2 font-medium text-blue-600 dark:text-gray-400">
                    Expires in: {formatTime(timeLeft)}
                  </p>
                ) : (
                  <p className="text-md font-semibold text-red-600">
                    OTP expired
                  </p>
                )}
              </div>
              <input
                type="text"
                placeholder="Type OTP"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                maxLength={6}
                value={otp}
                onChange={(e) => getOtp(e.target.value)}
              />
              <p className="dark:text-gray-400 mt-4 ml-2 text-sm flex gap-2 items-center">
                Note: Don't Refresh <RefreshCw size={14} /> the page before
                Verify OTP
              </p>
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={submitHandler}>
              {changebutton !== "Login" && (
                <>
                  <InputField
                    label="Name"
                    value={name}
                    onChange={(e) => getName(e.target.value)}
                  />
                  <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => getEmail(e.target.value)}
                  />
                  <InputField
                    label="Mobile Number"
                    value={mobilenumber}
                    onChange={(e) => getMobilenumber(e.target.value)}
                  />
                  <InputField
                    label="Date of Birth"
                    type="date"
                    value={dateofbirth}
                    onChange={(e) => getDateofbirth(e.target.value)}
                  />
                  <SelectField
                    label="Gender"
                    value={gender}
                    onChange={(e) => getGender(e.target.value)}
                    options={["male", "female", "other"]}
                  />
                </>
              )}

              {changebutton === "Login" && (
                <InputField
                  label="Email or Mobile"
                  value={identifier}
                  onChange={(e) => getIdentifier(e.target.value)}
                />
              )}

              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => getPassword(e.target.value)}
              />

              {changebutton === "Login" && (
                <>
                  <br />
                  <span className="text-sm text-blue-800 dark:text-blue-400 cursor-pointer">
                    Forgot Password?{" "}
                  </span>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {changebutton}
              </button>
            </form>
          )}

          {!isOtpSent && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">{textlink}</p>
              <button
                onClick={() => navigate(`/${linktext.toLowerCase()}`)}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                {linktext}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;

const InputField = ({ label, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  </div>
);
