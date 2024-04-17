import React from 'react'
import '../css/about.css'

const About = () => {
  return (
    <>
      <div className="about">
        <h2>About Us</h2>
        <div className="about-box">
            <div className="about-box-left">
                <img src="images/doctor.png" alt="" />
            </div>
            <div className="about-box-right">
                <p>At  <span>Healthcare</span>, we are dedicated to providing compassionate and comprehensive healthcare services tailored to meet the unique needs of each patient. With a team of experienced healthcare professionals, we strive to deliver high-quality medical care in a warm and welcoming environment. Our patient-centered approach ensures that you receive personalized attention and support throughout your healthcare journey. From routine check-ups to specialized treatments, we are committed to promoting your health and well-being every step of the way. Trust us to be your partner in health and let us help you live your best life."</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default About
