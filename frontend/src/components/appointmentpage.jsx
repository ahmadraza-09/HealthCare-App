import React from 'react'
import '../css/appointmentpage.css'

const AppointmentPage = () => {
  return (
    <>
      <div className="appointment-section">
        <div className="appointment-section-left">
            <img src="images/appointment2.png" alt="" />
        </div>

        <div className="appointment-section-right">
            <h2>Book Your Appointment</h2>
            <form>
                <div className='line-one'>
                    <div className='flex'>
                        <label>Name</label>
                        <input type="text" placeholder='Name'/>
                    </div>
                    <div className='flex'>
                        <label>Date Of Birth</label>
                        <input type="date"/>
                    </div>
                </div>

                <div className='flex'>
                    <label>Gender</label>
                    <select id="gender" name="gender">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='flex'>
                    <label>Select Your Health Concern</label>
                    <select id="gender" name="gender">
                        <option value="">Select</option>
                        <option value="Headache">Headache</option>
                        <option value="Fever">Fever</option>
                        <option value="Cough">Cough</option>
                        <option value="Back Pain">Back Pain</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='flex'>
                    <label>Mobile Number</label>
                    <input type="text" placeholder='Mobile Number'/>
                </div>

                <div className='flex'>

                </div>

                <button>Book Now</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default AppointmentPage
