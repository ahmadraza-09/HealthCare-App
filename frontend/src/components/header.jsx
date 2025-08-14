import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/themeContext";
import TopBanner from "./top-banner";
import { useAuth } from "../contexts/authContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const id = localStorage.getItem("user_id");
  const name = localStorage.getItem("name");

  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex flex-row">
      {/* Top Banner */}
      {/* <div className="fixed top-0 left-0 w-full z-50">
        <TopBanner />
      </div> */}

      {/* Header */}
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
              {[
                { label: "Home", path: "/" },
                { label: "Doctor", path: "/doctor" },
                { label: "Services", path: "/services" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-black dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600 dark:text-blue-400 font-bold"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => navigate("/appointment")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
              >
                Book Appointment
              </button>

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

              {isLoggedIn && user.role === "doctor" ? (
                <div
                  onClick={() => navigate(`/dashboard`)}
                  className="flex items-center justify-center rounded-full text-white font-semibold text-lg cursor-pointer"
                >
                  Dashboard
                </div>
              ) : isLoggedIn && user.role === "patient" ? (
                <div
                  onClick={() => navigate(`/profile/${id}`)}
                  className="flex items-center justify-center w-10 h-10 bg-blue-400 rounded-full text-white font-semibold text-xl cursor-pointer"
                >
                  {(name && name.charAt(0).toUpperCase()) || "?"}
                </div>
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
                className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-gray-800 dark:text-gray-200 backdrop-blur-md border-t dark:border-gray-700">
            <div className="px-4 py-4 flex flex-col space-y-4">
              {[
                { label: "Home", path: "/" },
                { label: "Doctor", path: "/doctor" },
                { label: "Services", path: "/services" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-black dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600 dark:text-blue-400 font-bold"
                      : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => navigate("/appointment")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800"
              >
                Book Appointment
              </button>

              {isLoggedIn ? (
                <div
                  onClick={() => navigate(`/profile/${id}`)}
                  className="flex items-center justify-center w-10 h-10 bg-blue-400 rounded-full text-white font-semibold text-xl cursor-pointer"
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="mt-4 text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
