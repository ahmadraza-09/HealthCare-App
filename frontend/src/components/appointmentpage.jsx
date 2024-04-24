import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../css/appointmentpage.css'

const AppointmentPage = () => {

    const [name, getName] = useState('');
    const [dateofbirth, getDateofbirth] = useState('');
    const [gender, getGender] = useState('');
    const [concern, getConcern] = useState('');
    const [mobilenumber, getMobilenumber] = useState('');
    const [formerror, getFormerror] = useState('');
    const nameregex = /^[a-z A-Z]{2,15}$/;
    const mobilenumberregex = /^[0-9]{10}$/;

    const nameHandler = (event) => {
        getName(event.target.value);
    }

    const dateofbirthHandler = (event) => {
        getDateofbirth(event.target.value);
    }

    const genderHandler = (event) => {
        getGender(event.target.value);
    }

    const concernHandler = (event) => {
        getConcern(event.target.value);
    }

    const mobilenumberHandler = (event) => {
        getMobilenumber(event.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault(); {
            if (name === '') {
                getFormerror("Enter your Name");
                return false;
            } else if (!name.match(nameregex)) {
                getFormerror("Enter Name in Letters");
                return false;
            } else if (dateofbirth === '') {
                getFormerror("Select your Date of Birth");
                return false;
            } else if (gender === '') {
                getFormerror("Select your Gender");
                return false;
            } else if (concern === '') {
                getFormerror("Select Your Health Concern");
                return false;
            } else if (mobilenumber === '') {
                getFormerror("Enter your Mobile Number");
                return false;
            } else if (!mobilenumber.match(mobilenumberregex)) {
                getFormerror("Invalid Number! Please write only numbers");
                return false;
            } else {
                    const appointmentData = { name, dateofbirth, gender, concern, mobilenumber, };
                    axios.post('http://localhost:3050/auth/appointment', appointmentData)
                        .then((response) => {
                        const responseData = response.data;
                        console.log("Response data:", responseData);
                            const message = responseData.message;
                            console.log("Message:", message);
                            if (message === "All fields are required") {
                                getFormerror("All fields are required");
                            } else if (response.data.message === "Appointment limit reached for today. Try again tomorrow.") {
                                getFormerror("Appointment limit reached for today. Try again tomorrow.");
                            } else {
                                alert("Appointment Booked Successfully");
                                getName('');
                                getDateofbirth('');
                                getGender('');
                                getConcern('');
                                getMobilenumber('');
                                getFormerror('');
                            }
                    })
                    .catch((error) => {
                        console.error("Error contacting:", error);
                        getFormerror("appointment Request failed");
                    });
                }
          }
    }

  return (
    <>
      <div className="appointment-section">
        <div className="appointment-section-left">
            <img src="images/appointment2.png" alt="" />
        </div>

        <div className="appointment-section-right">
            <h2>Book Your Appointment</h2>
            <form onSubmit={submitHandler}>
                {formerror && <p className="error-message">{formerror}</p>}
                <div className='line-one'>
                    <div className='flex'>
                        <label>Name</label>
                        <input type="text" placeholder="Name" value={name} onChange={nameHandler} />
                    </div>
                    <div className='flex'>
                        <label>Date Of Birth</label>
                        <input type="date" value={dateofbirth} onChange={dateofbirthHandler} />
                    </div>
                </div>

                <div className='flex'>
                    <label>Gender</label>
                    <select id="gender" value={gender} onChange={genderHandler}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='flex'>
                    <label>Select Your Health Concern</label>
                    <select id="gender" name="gender" value={concern} onChange={concernHandler}>
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
                    <input type="text" placeholder="Enter Mobile Number" value={mobilenumber} onChange={mobilenumberHandler} />
                </div>

                <button type='submit'>Book Now</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default AppointmentPage
