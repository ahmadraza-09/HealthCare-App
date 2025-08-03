import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#135D66] text-white flex flex-col items-center gap-5 pt-5">
      <div className="flex flex-wrap w-full max-w-7xl px-4 justify-between">
        {/* Logo & Description */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h2 className="text-xl font-bold cursor-pointer text-[#FFF7FC]">
            Health<span className="text-[#F7C566]">Care</span>
          </h2>
          <p className="text-md text-[#E3FEF7] mt-5 leading-5">
            Your trusted partner in wellness, offering comprehensive medical
            resources and services.
          </p>
        </div>

        {/* Company Links */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg text-[#E3FEF7] font-medium mb-6 relative uppercase">
            Company
            <span className="block w-12 h-0.5 bg-[#F7C566] mt-2"></span>
          </h4>
          <div className="space-y-2 text-md flex flex-col">
            <a href="#" className="hover:underline capitalize">
              about us
            </a>
            <a href="#" className="hover:underline capitalize">
              doctors
            </a>
            <a href="#" className="hover:underline capitalize">
              appointment
            </a>
            <a href="#" className="hover:underline capitalize">
              our services
            </a>
            <a href="#" className="hover:underline capitalize">
              contact us
            </a>
          </div>
        </div>

        {/* Help Links */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg text-[#E3FEF7] font-medium mb-6 relative uppercase">
            Get Help
            <span className="block w-12 h-0.5 bg-[#F7C566] mt-2"></span>
          </h4>
          <div className="space-y-2 text-md flex flex-col">
            <a href="#" className="hover:underline capitalize">
              faq
            </a>
            <a href="#" className="hover:underline capitalize">
              shipping
            </a>
            <a href="#" className="hover:underline capitalize">
              privacy policy
            </a>
            <a href="#" className="hover:underline capitalize">
              payment options
            </a>
          </div>
        </div>

        {/* Online Appointment */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg text-[#E3FEF7] font-medium mb-6 relative uppercase">
            Online Appointment
            <span className="block w-12 h-0.5 bg-[#F7C566] mt-2"></span>
          </h4>
          <div className="space-y-2 text-md flex flex-col">
            <a href="#" className="hover:underline capitalize">
              appointment status
            </a>
            <a href="#" className="hover:underline capitalize">
              check availability
            </a>
            <a href="#" className="hover:underline capitalize">
              online medicine delivery
            </a>
            <a href="#" className="hover:underline capitalize">
              buy medicines
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="w-full sm:w-1/2 lg:w-1/5 mb-6">
          <h4 className="text-lg text-[#E3FEF7] font-medium mb-6 relative uppercase">
            Follow Us
            <span className="block w-12 h-0.5 bg-[#F7C566] mt-2"></span>
          </h4>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#24262b] transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#24262b] transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#24262b] transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#24262b] transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full bg-[#1e7786] py-2 px-4 text-sm text-[#E3FEF7] flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <p>© 2024</p>
          <h2 className="text-white font-medium text-base cursor-pointer">
            Health<span className="text-[#F7C566]">Care</span>
          </h2>
        </div>
        <div>All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
