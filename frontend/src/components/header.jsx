import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/themeContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("token") !== null;
  const id = localStorage.getItem("id");

  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 
      bg-white/90 dark:bg-gray-900 dark:text-white backdrop-blur-md shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              MediCare+
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === "/" ? "text-blue-600 font-bold" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate("/doctor")}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === "/doctor" ? "text-blue-600 font-bold" : ""
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => navigate("/services")}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === "/services"
                  ? "text-blue-600 font-bold"
                  : ""
              }`}
            >
              Services
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === "/about" ? "text-blue-600 font-bold" : ""
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className={`hover:text-blue-600 transition-colors ${
                location.pathname === "/contact"
                  ? "text-blue-600 font-bold"
                  : ""
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => navigate("/appointment")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
            >
              Book Appointment
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Login/Profile/Admin */}
            {isLoggedIn && role === "patient" ? (
              <img
                onClick={() => navigate(`/profile/${id}`)}
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-600"
              />
            ) : isLoggedIn && role === "doctor" ? (
              <button
                onClick={() => navigate("/adminpanel")}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Admin Panel
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="ml-4 text-blue-600 border border-blue-600 px-4 py-1 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 dark:text-white hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
