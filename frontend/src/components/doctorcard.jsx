import React from 'react'

const DoctorCard = () => {
  return (
    <>
      <div className="doctor-card">
        <div className="doctor-image">
            <img src="https://themewagon.github.io/orthoc/images/d2.jpg" alt="" />
            <div className="doctor-socialmedia">
                <i class="fa-brands fa-square-instagram"></i>
                <i class="fa-brands fa-linkedin-in"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-facebook"></i>
            </div>
        </div>
        <div className="doctor-detail">
            <div className="name-label">
                <h2>Dr. Jhonsen</h2>
                <label>MBBS</label>
            </div>
            <h4 className="id-number">
                ID : 039839248
            </h4>
            <div className="tags">
                <div className="tag">Cardiology</div>
                <div className="tag">Neurology</div>
                <div className="tag">Cardiology</div>
                <div className="tag">Cardiology</div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DoctorCard
