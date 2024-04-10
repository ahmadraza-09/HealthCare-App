import React from 'react'

const Header = () => {
  return (
    <>
      <nav>
        <input type="checkbox" id='check'/>

        <div className="logo">
            <label htmlFor="check"><i class="fa-solid fa-bars"></i></label>
            <h2>Health<span>Care</span></h2>
        </div>

        <ul className="menu">
            <label htmlFor="check"><i class="fa-solid fa-close"></i></label>
            <li>Home</li>
            <li>Doctors</li>
            <li>Appointment</li>
            <li>About</li>
            <li>Contact</li>
        </ul>

        <div className="login">
            <button>Login</button>
        </div>
      </nav>
    </>
  )
}

export default Header
