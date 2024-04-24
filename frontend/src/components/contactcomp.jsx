import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../css/contact.css'

const ContactComp = () => {

    const [name, getName] = useState('');
    const [mobilenumber, getMobilenumber] = useState('');
    const [email, getEmail] = useState('');
    const [message, getMessage] = useState('');
    const [formerror, getFormerror] = useState('');
    const nameregex = /^[a-z A-Z]{2,15}$/;
    const mobilenumberregex = /^[0-9]{10}$/;
    const emailregex = /^[a-z A-Z 0-9]+@[a-z]+\.[a-z]{2,6}$/; 

    const nameHandler = (event) => {
        getName(event.target.value);
    }

    const emailHandler = (event) => {
        getEmail(event.target.value);
    }

    const mobilenumberHandler = (event) => {
        getMobilenumber(event.target.value);
    }

    const messageHandler = (event) => {
        getMessage(event.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault(); {
            if (name === '') {
                getFormerror("Enter your Name");
                return false;
            } else if (!name.match(nameregex)) {
                getFormerror("Enter Name in Letters");
                return false;
            } else if (email === '') {
                getFormerror("Enter your Email");
                return false;
            } else if (!email.match(emailregex)) {
                getFormerror("Enter Valid Email");
                return false;
            } else if (mobilenumber === '') {
                getFormerror("Enter your Mobile Number");
                return false;
            } else if (!mobilenumber.match(mobilenumberregex)) {
                getFormerror("Invalid Number! Please write only numbers");
                return false;
            } else {
                    const contactData = { name, mobilenumber, email, message };
                    axios.post('http://localhost:3050/auth/contact', contactData)
                        .then((response) => {
                        const responseData = response.data;
                        console.log("Response data:", responseData);
                            const message = responseData.message;
                            console.log("Message:", message);
                            if (message === "Please fill the form") {
                                getFormerror("Please fill the form");
                            } else if (message === 'You have already submitted a query today. Please try again tomorrow.') {
                                getFormerror("You have already submitted a query today. Please try again tomorrow.");
                            } else {
                                alert("Message Sent Successfully");
                                getName('');
                                getMobilenumber('');
                                getEmail('');
                                getMessage('');
                                getFormerror('');
                            }
                    })
                    .catch((error) => {
                        console.error("Error contacting:", error);
                        getFormerror("Contact Request failed");
                    });
                }
          }
    }

  return (
    <>
      <div className="contat-page">
        <div className="contat-form">
          <img src="images/contact.png" alt="" />

          <form onSubmit={submitHandler}>
            <h2>Contact Us</h2> 
            {formerror && <p className="error-message">{formerror}</p>}
            <div className="input-box">
              <label>Name</label>
              <input type="text" placeholder='Enter your name' value={name} onChange={nameHandler} />
            </div>
            <div className="input-box">
              <label>Email</label>
              <input type="email" placeholder='Enter your email' value={email} onChange={emailHandler} />
            </div>
            <div className="input-box">
              <label>Mobile Number</label>
              <input type="text" placeholder='Enter your mobile number' value={mobilenumber} onChange={mobilenumberHandler} />
            </div>
            <div className="input-box">
              <label>Message</label>
              <textarea typeof='text' placeholder='Enter your query here...' value={message} onChange={messageHandler} />
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
