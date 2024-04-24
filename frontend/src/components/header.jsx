import React from 'react'
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  const isLoggedIn = localStorage.getItem('token') !== null;
  const id = localStorage.getItem('id');

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
            {isLoggedIn &&
            <li onClick={() => {navigate('/appointment')}}>Book Appointment</li>
            }
        </ul>

        
        <div className="login">
            {(isLoggedIn && role === 'patient') ? (
              <div className="header-profile" onClick={() => {navigate(`/profile/${id}`)}}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
              </div>
            ):(isLoggedIn && role === 'doctor') ? (
              <div className="admin-panel" onClick={() => {navigate(`/adminpanel`)}}>
                <button>Admin Panel</button>
              </div>
            ):(
              <button onClick={() => {navigate('/login')}}>Login</button>
            )}
            
        </div>
      </nav>
    </>
  )
}

export default Header
