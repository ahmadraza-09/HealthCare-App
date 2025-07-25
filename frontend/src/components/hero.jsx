import React from "react";
import Appointment from "./appointment";

const Hero = () => {
  return (
    <>
      <div className="hero-section w-full h-fit sm:h-[500px] pt-[60px]">
        <img
          src="https://themewagon.github.io/orthoc/images/hero-bg.png"
          alt=""
          className="w-full h-full"
        />

        <div className="our-title absolute sm:top-[150px] top-[100px] sm:left-[150px] left-[10px] sm:text-4xl text-xl text-[#b7ffeb] font-bold">
          <h2>
            We <span className="text-yellow-500">Care</span> Your{" "}
            <span className="text-white">Health</span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Hero;
