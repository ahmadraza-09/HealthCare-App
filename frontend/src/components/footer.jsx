import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-white text-black flex flex-col items-center gap-5 pt-10 border-t-blue-600 border-2">
      <div className="flex flex-wrap w-full max-w-7xl px-4 justify-between">
        {/* Logo & Description */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
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
          <p className="text-sm text-black mt-4 leading-relaxed">
            Your trusted partner in wellness, offering comprehensive medical
            resources and services.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg font-semibold mb-4 uppercase">
            Company
            <span className="block w-12 h-0.5 bg-blue-800 mt-2"></span>
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Doctors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Appointment
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Our Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Help Links */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg font-semibold mb-4 uppercase">
            Get Help
            <span className="block w-12 h-0.5 bg-blue-800 mt-2"></span>
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Payment Options
              </a>
            </li>
          </ul>
        </div>

        {/* Online Appointment */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg font-semibold mb-4 uppercase">
            Online Appointment
            <span className="block w-12 h-0.5 bg-blue-800 mt-2"></span>
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Appointment Status
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Check Availability
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Online Medicine Delivery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">
                Buy Medicines
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg font-semibold mb-4 uppercase">
            Follow Us
            <span className="block w-12 h-0.5 bg-blue-800 mt-2"></span>
          </h4>
          <div className="flex gap-3 flex-wrap">
            {["facebook-f", "twitter", "instagram", "linkedin-in"].map(
              (icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-blue-800 hover:text-white transition"
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-white py-3 px-4 text-sm text-black flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <p>© 2025</p>
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              MediCare+
            </span>
          </div>
        </div>
        <div>All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
