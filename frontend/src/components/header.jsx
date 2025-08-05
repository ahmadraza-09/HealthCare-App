import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("token") !== null;
  const id = localStorage.getItem("id");

  const showMenuFunc = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="w-full h-[60px] bg-[#135D66] flex px-5 items-center justify-between text-[#E3FEF7] fixed z-10">
        <div className="logo text-[#FFF7FC] text-2xl font-semibold flex items-center justify-start gap-5">
          <label htmlFor="check" onClick={showMenuFunc} className="sm:hidden">
            <i class="fa-solid fa-bars "></i>
          </label>
          <h2
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer"
          >
            Health<span className="text-yellow-500">Care</span>
          </h2>
        </div>

        <ul
          className={`menu w-full h-screen sm:static sm:h-0 sm:w-fit sm:flex-row items-center justify-start gap-8 sm:text-lg font-normal sm:flex absolute top-[60px] py-5 px-5 left-0 bg-[#135D66] text-xl flex flex-col ${
            showMenu === true ? "flex" : "hidden"
          }`}
        >
          <li
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/doctor");
            }}
            className="cursor-pointer"
          >
            Doctor
          </li>
          <li
            onClick={() => {
              navigate("/about");
            }}
            className="cursor-pointer"
          >
            About
          </li>
          <li
            onClick={() => {
              navigate("/contact");
            }}
            className="cursor-pointer"
          >
            Contact
          </li>
          {/* {isLoggedIn && ( */}
          <li
            onClick={() => {
              navigate("/appointment");
            }}
            className="cursor-pointer"
          >
            Book Appointment
          </li>
          {/* )} */}
        </ul>

        <div className="login">
          {isLoggedIn && role === "patient" ? (
            <div
              className="header-profile"
              onClick={() => {
                navigate(`/profile/${id}`);
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
                className="w-10 cursor-pointer"
              />
            </div>
          ) : isLoggedIn && role === "doctor" ? (
            <div
              className="admin-panel"
              onClick={() => {
                navigate(`/adminpanel`);
              }}
            >
              <button>Admin Panel</button>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
