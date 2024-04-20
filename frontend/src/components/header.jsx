import React from 'react'
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <>
      <nav>
        <input type="checkbox" id='check'/>

        <div className="logo">
            <label htmlFor="check"><i class="fa-solid fa-bars"></i></label>
            <h2 onClick={() => {navigate('/')}}>Health<span>Care</span></h2>
        </div>

        <ul className="menu">
            <label htmlFor="check"><i class="fa-solid fa-close"></i></label>
            <li onClick={() => {navigate('/')}}>Home</li>
            <li onClick={() => {navigate('/doctor')}}>Doctor</li>
            <li onClick={() => {navigate('/about')}}>About</li>
            <li onClick={() => {navigate('/contact')}}>Contact</li>
            <li onClick={() => {navigate('/appointment')}}>Book Appointment</li>
        </ul>

        <div className="login">
            <button onClick={() => {navigate('/login')}}>Login</button>
        </div>
      </nav>
    </>
  )
}

export default Header
