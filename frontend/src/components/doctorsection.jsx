import React from 'react'
import '../css/doctorsection.css'
import DoctorCard from './doctorcard'

const DoctorSection = () => {
  return (
    <>
      <div className="doctor-section">
        <h2>Our Doctors</h2>
        {<DoctorCard/>}
      </div>
    </>
  )
}

export default DoctorSection
