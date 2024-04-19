import React, { useState, useEffect } from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import '../css/login.css'
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const id = params.id;   

    const [name, getName] = useState('');
    const [date, getDate] = useState('');
    const [gender, getGender] = useState('');
    const [mobilenumber, getMobilenumber] = useState('');
    const [heading, getHeading] = useState('Sign Up');
    const [changebutton, getChangebutton] = useState('Register');
    const [linktext, getLinktext] = useState('Login');
    const [textlink, getTextlink] = useState('Already have an Account?')

    const [formerror, getFormerror] = useState('');
    const nameregex = /^[a-z A-Z]{2,15}$/;
    const mobilenumberregex = /^[0-9]{10}$/;

    useEffect(() => {

        if(location.pathname === '/login') {
            getChangebutton('Login')
            getLinktext('Register');
            getTextlink('Not Registered Yet?');
            getHeading('Sign In');

        }

    }, []);


    
    


  return (
    <>
      <div className="login-registration">
        <div className="login-registration-left">
           <img src="images/slider2.png" alt="" />
        </div>
        <div className="login-registration-right">
            <h2>{heading}</h2>
            <form method="post">
                <div id="errorMessage">{formerror}</div>
                {changebutton !== 'Login' && (
                <div className='line-one'>
                    <div className='flex'>
                        <label>Name</label>
                        <input type="text" placeholder="Enter Your Name" required/>
                    </div>
                    <div className='flex'>
                        <label>Date Of Birth</label>
                        <input type="date"  required/>
                    </div>
                </div>
                )}
                {changebutton !== 'Login' && (
                <div className='flex'>
                    <label>Email</label>
                    <input type="email" placeholder='Email' required/>
                </div>
                )}
                {changebutton !== 'Login' && (
                <div className='flex'>
                    <label>Gender</label>
                    <select id="gender" name="gender">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                )}
                <label>Mobile Number</label>
                <input type="text" placeholder="Enter Mobile Number" required/>
                
                <label>Password</label>
                <input type="password" placeholder="Enter Password" required/>

                <div className='submit-button'>
                    <button type='submit' value={changebutton}>{changebutton}</button>
                </div>
            </form>
            <div className="create-account">
                <p>{textlink}</p>
                <button  type='button' onClick={()=>{navigate(`/${linktext.toLowerCase()}`)}}>{linktext}</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login
