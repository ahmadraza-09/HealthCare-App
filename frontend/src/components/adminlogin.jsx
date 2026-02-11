import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

const AdminLogin = () => {
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const emailOrPhoneRegex =
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^\d{10}$/;
  const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!identifier) {
      setFormError("Enter your Mobile Number/Email");
      return;
    } else if (!identifier.match(emailOrPhoneRegex)) {
      setFormError("Enter a valid Email or 10-digit Mobile Number");
      return;
    } else if (!password) {
      setFormError("Enter your Password");
      return;
    } else if (!password.match(passwordRegex)) {
      setFormError("Password must be at least 8 characters");
      return;
    }

    try {
      const userData = { identifier, password };

      const res = await axios.post(
        `${API_URL}/auth/doctorlogin`,
        userData
      );

      const data = res.data || {};

      if (
        typeof data.message === "string" &&
        data.message.includes("Invalid")
      ) {
        setFormError(data.message);
        return;
      }

      if (!data.token || !data.user) {
        setFormError("Invalid response from server");
        return;
      }

      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("mobilenumber", user.mobilenumber);
      localStorage.setItem("email", user.email);

      setFormError("");
      toast.success("Logged In Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setFormError(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg items-center gap-1 flex flex-col">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            MediCare+
          </span>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>

        {formError && (
          <p className="text-red-600 text-sm mb-2 text-center">{formError}</p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Mobile Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
