import React from 'react'
import '../css/contact.css'

const ContactComp = () => {
  return (
    <>
      <div className="contat-page">
        <div className="contat-form">
          <img src="images/contact.png" alt="" />

          <form>
            <h2>Contact Us</h2> 
            <div className="input-box">
              <label>Name</label>
              <input type="text" placeholder='Enter your name'/>
            </div>
            <div className="input-box">
              <label>Email</label>
              <input type="text" placeholder='Enter your email'/>
            </div>
            <div className="input-box">
              <label>Mobile Number</label>
              <input type="text" placeholder='Enter your mobile number'/>
            </div>
            <div className="input-box">
              <label>Message</label>
              <textarea type="text" placeholder='Enter your query here...'/>
            </div>
            <button type='submit'>Send</button>
          </form>
        </div>

        <div className="call-location">
          <div className="call-location-box">
            <div className="head">
              <i class="fa-solid fa-phone"></i>
              Call Us
            </div>
            <div className="foot">
              <p>1(234)567-891</p>
              <p>1(234)384-023</p>
            </div>
          </div>

          <div className="call-location-box">
            <div className="head">
              <i class="fa-solid fa-location-dot"></i>
              Location
            </div>
            <div className="foot">
              <p>121 Rock Street, 21 Avenue, New York, NY 92103-9000</p>
            </div>
          </div>

          <div className="call-location-box">
            <div className="head">
              <i class="fa-solid fa-clock"></i>
              Hours
            </div>
            <div className="foot">
              <p>Mon - Fri .... 11 am - 8 pm</p>
              <p>Sat - Sun .... 6 am - 8 pm</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactComp
