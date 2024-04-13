import React from 'react'

const Appointment = () => {
  return (
    <>
      <div className="appointment">
        <input type="date" />
        <input type="text" className='find-query' placeholder='Enter your health query here.'/>
        <input type="text" className='find-doctor' placeholder='Search Doctors, specialist.'/>
        <button>Search</button>
      </div>
    </>
  )
}

export default Appointment
