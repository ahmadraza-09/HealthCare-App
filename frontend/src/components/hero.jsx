import React from 'react'
import Appointment from './appointment'

const Hero = () => {
  return (
    <>
      <div className="hero-section">
        <img src="https://themewagon.github.io/orthoc/images/hero-bg.png" alt="" />

        <div className="our-title">
            <h2>We <span>Care</span> Your <span>Health</span></h2>
        </div>

        <div className="appointment-box">
            <Appointment/>
        </div>
      </div>
    </>
  )
}

export default Hero
