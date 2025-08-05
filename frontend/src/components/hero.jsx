import React from "react";
import Appointment from "./appointment";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-fit sm:h-[500px] pt-[60px] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://themewagon.github.io/orthoc/images/hero-bg.png"
        alt="Clinic Hero"
        className="w-full h-full object-cover"
      />

      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-teal-800/30 z-0"></div>

      {/* Text Content */}
      <div className="absolute z-0 top-[40%] left-[10%] sm:left-[15%] transform -translate-y-1/2">
        <h2 className="text-white text-2xl sm:text-5xl font-bold leading-snug drop-shadow-md">
          We <span className="text-yellow-400">Care</span> About Your{" "}
          <span className="text-teal-300">Health</span>
        </h2>
        <p className="text-white mt-4 sm:text-lg text-sm max-w-md">
          Providing world-class clinical care with compassion and excellence.
        </p>

        <button
          className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-300 transition duration-300"
          onClick={() => {
            navigate("/appointment");
          }}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Hero;
