import React from 'react'

const WorkTutorial = () => {
  return (
    <>
      <div className="how-it-works">
        <h2>How It Works!</h2>
        <p>Discover, book, and experience personalized HealthCare effortlessly <br /> with our user-freindly Doctor Appointment Website</p>
        <div className="tutorial-box">
            <div className="box">
                <div className="icon">
                    <div className="number">
                        1
                    </div>
                    <i class="fa-solid fa-user-doctor"></i>
                </div>
                <div className="doctor-title">
                    Find A Doctor
                </div>
                <p>Discover Skilled doctors based on <br /> specialization and location</p>
            </div>
            <div className="box">
                <div className="icon">
                    <div className="number">
                        2
                    </div>
                    <i class="fa-solid fa-calendar-days"></i>
                </div>
                <div className="doctor-title">
                    Book Appointment
                </div>
                <p>Effortlessly book appointments at <br /> your convenience.</p>
            </div>
            <div className="box">
                <div className="icon">
                    <div className="number">
                        3
                    </div>
                    <i class="fa-solid fa-briefcase-medical"></i>
                </div>
                <div className="doctor-title">
                    Get Services
                </div>
                <p>Receive personalized HealthCare <br /> services tailored to your needs.</p>
            </div>
        </div>
      </div>
    </>
  )
}

export default WorkTutorial
