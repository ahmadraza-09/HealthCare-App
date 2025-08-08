import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id = params.id;

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
      getName("Ahmad");
      getDateofbirth("2004-08-20");
      getGender("male");
      getEmail("ahmad@gmail.com");
      getMobilenumber("9297829642");
    } else {
      getIdentifier("9292929292");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validations
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

        if (data.message.includes("Invalid")) {
          getFormerror(data.message);
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
          if (role === "doctor") {
            navigate("/adminpanel");
          } else {
            navigate("/");
          }
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

        if (data.message.includes("exists")) {
          getFormerror(data.message);
        } else {
          getFormerror("");
          navigate("/login");
          toast.success("Registerred In Successfully");
        }
      }
    } catch (err) {
      getFormerror("Something went wrong. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-14">
      <div className="md:w-1/2 bg-blue-100 flex items-center justify-center p-8">
        <img
          src="/images/slider2.png"
          alt="Illustration"
          className="max-w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 p-6 md:p-12 bg-white flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">{heading}</h2>
        {changebutton !== "Register" && (
          <h3 className="text-lg text-gray-600 mb-6">
            Hello! <span className="text-blue-600 font-semibold">Welcome</span>{" "}
            Back 😎
          </h3>
        )}

        {formerror && <div className="text-red-600 mb-4">{formerror}</div>}

        <form onSubmit={submitHandler} className="space-y-4">
          {changebutton !== "Login" && (
            <>
              <InputField
                label="Name"
                value={name}
                onChange={(e) => getName(e.target.value)}
                placeholder="Enter your name"
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
                placeholder="Email"
              />
              <InputField
                label="Mobile Number"
                value={mobilenumber}
                onChange={(e) => getMobilenumber(e.target.value)}
                placeholder="Mobile Number"
              />
            </>
          )}

          {changebutton === "Login" && (
            <InputField
              label="Email or Mobile"
              value={identifier}
              onChange={(e) => getIdentifier(e.target.value)}
              placeholder="Email or Mobile"
            />
          )}

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => getPassword(e.target.value)}
            placeholder="Password"
          />

          {changebutton === "Login" && (
            <SelectField
              label="Login As"
              value={role}
              onChange={(e) => getRole(e.target.value)}
              options={["patient", "doctor"]}
            />
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {changebutton}
            </button>
          </div>
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
  );
};

export default Login;

// Reusable input component
const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
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
