import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [name, getName] = useState("");
  const [dateofbirth, getDateofbirth] = useState("");
  const [gender, getGender] = useState("");
  const [mobilenumber, getMobilenumber] = useState("");
  const [identifier, getIdentifier] = useState("");
  const [password, getPassword] = useState("");
  const [email, getEmail] = useState("");
  const [role, getRole] = useState("patient");
  const [heading, getHeading] = useState("Sign Up");
  const [changebutton, getChangebutton] = useState("Register");
  const [linktext, getLinktext] = useState("Login");
  const [textlink, getTextlink] = useState("Already have an Account?");
  const [formerror, getFormerror] = useState("");

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
      if (!name.match(nameregex)) return getFormerror("Invalid Name");
      if (!dateofbirth) return getFormerror("Enter DOB");
      if (!gender) return getFormerror("Select gender");
      if (!email.match(emailregex)) return getFormerror("Invalid Email");
      if (!mobilenumber.match(mobilenumberregex))
        return getFormerror("Invalid Mobile Number");
    }

    if (!identifier && changebutton === "Login")
      return getFormerror("Enter Mobile/Email");
    if (!password.match(passwordRegex))
      return getFormerror("Password must be at least 8 characters");

    try {
      if (location.pathname === "/login") {
        const loginData = { identifier, password, role };
        const endpoint =
          role === "doctor"
            ? "http://localhost:3050/auth/doctorlogin"
            : "http://localhost:3050/auth/login";

        const { data } = await axios.post(endpoint, loginData);

        if (
          typeof data.message === "string" &&
          data.message.includes("Invalid")
        ) {
          getFormerror(data.message);
          return;
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", role);
          localStorage.setItem("id", data.user.id);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("mobileNumber", data.user.mobilenumber);
          if (role === "patient") {
            localStorage.setItem("dateofbirth", data.user.dateofbirth);
            localStorage.setItem("gender", data.user.gender);
          }
          toast.success("Logged In Successfully");
          getFormerror("");
          navigate(role === "doctor" ? "/adminpanel" : "/");
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
          "http://localhost:3050/auth/registration",
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
          navigate("/login");
          toast.success("Registered Successfully");
        }
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        getFormerror(err.response.data.message);
      } else {
        getFormerror("Something went wrong. Try again.");
      }
      console.error(err);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {heading}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {role === "doctor" ? "Doctor" : "Patient"}
            </span>
          </h2>
          {changebutton !== "Register" && (
            <p className="text-gray-600 mt-2">
              Hello!{" "}
              <span className="text-blue-600 font-semibold">Welcome</span> Back
              😎
            </p>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 max-w-md mx-auto">
          {formerror && (
            <p className="text-red-600 text-sm mb-4 text-center">{formerror}</p>
          )}

          <form className="space-y-6" onSubmit={submitHandler}>
            {changebutton !== "Login" && (
              <>
                <InputField
                  label="Name"
                  value={name}
                  onChange={(e) => getName(e.target.value)}
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
              <SelectField
                label="Login As"
                value={role}
                onChange={(e) => getRole(e.target.value)}
                options={["patient", "doctor"]}
              />
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {changebutton}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">{textlink}</p>
            <button
              onClick={() => navigate(`/${linktext.toLowerCase()}`)}
              className="mt-2 text-blue-600 hover:underline"
            >
              {linktext}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

const InputField = ({ label, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
