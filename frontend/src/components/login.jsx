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
    const [dateofbirth, getDateofbirth] = useState('');
    const [gender, getGender] = useState('');
    const [mobilenumber, getMobilenumber] = useState('');
    const [identifier, getIdentifier] = useState('');
    const [password, getPassword] = useState('');
    const [email, getEmail] = useState('');
    const [role, getRole] = useState('patient');
    const [heading, getHeading] = useState('Sign Up');
    const [changebutton, getChangebutton] = useState('Register');
    const [linktext, getLinktext] = useState('Login');
    const [textlink, getTextlink] = useState('Already have an Account?')
    const [formerror, getFormerror] = useState('');
    const nameregex = /^[a-z A-Z]{2,15}$/;
    const mobilenumberregex = /^[0-9]{10}$/;
    const emailregex = /^[a-z A-Z 0-9]+@[a-z]+\.[a-z]{2,6}$/; 
    const passwordRegex = /^(?=.*[a-zA-Z0-9]).{8,}$/;


    useEffect(() => {

        if(location.pathname === '/login') {
            getChangebutton('Login')
            getLinktext('Register');
            getTextlink('Not Registered Yet?');
            getHeading('Sign In');
            getName('Ahmad');
            getDateofbirth('20-08-2004');
            getGender('male');
            getEmail('ahmad@gmail.com');
            getMobilenumber('9297829642');
        }
        if(location.pathname === '/register') {
            getIdentifier('9292929292')
        }

    }, []);


    const nameHandler = (event) => {
        getName(event.target.value);
    }

    const dateofbirthHandler = (event) => {
        getDateofbirth(event.target.value);
    }

    const genderHandler = (event) => {
        getGender(event.target.value);
    }

    const emailHandler = (event) => {
        getEmail(event.target.value);
    }

    const mobilenumberHandler = (event) => {
        getMobilenumber(event.target.value);
    }

    const identifierHandler = (event) => {
        getIdentifier(event.target.value);
    }

    const passwordHandler = (event) => {
        getPassword(event.target.value);
    }

    const roleHandler = (event) => {
        getRole(event.target.value);
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
                getFormerror("Select your Date Of Birth");
                return false;
            } else if (gender === '') {
                getFormerror("Select your Gender");
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
            } else if (identifier === '') {
                getFormerror("Enter your Mobile Number/Email");
                return false;
            } else if (password === '') {
                getFormerror("Enter your Password");
                return false;
            } else if (!password.match(passwordRegex)) {
                getFormerror("Password must be at least 8 characters");
                return false;
            } else {
                if (location.pathname === '/login') {
                    
                    if (role === 'patient') {
                        let patientData = {identifier, password, role: 'patient' };
                    axios.post('http://localhost:3050/auth/login', patientData)
                        .then((response) => {
                            console.log(response.data); 
                            const message = response.data.message;
                            if (message === "Mobile number/email and password are required" || message === "Invalid mobile number/email or password") {
                                getFormerror(message);
                                return false;
                            } else {
                                getFormerror('');

                                const { token, user } = response.data;

                                localStorage.setItem('token', token);
                                localStorage.setItem('id', user.id);
                                localStorage.setItem('name', user.name);
                                localStorage.setItem('dateofbirth', user.dateofbirth);
                                localStorage.setItem('gender', user.gender);
                                localStorage.setItem('mobileNumber', user.mobilenumber);
                                localStorage.setItem('email', user.email);
                                localStorage.setItem('role', 'patient');
                                
                                navigate('/');
                                console.log("User logged in successfully with ID:", response.data.user.id);
                            }
                        })
                        .catch((error) => {
                            console.error("Error logging in:", error);
                        });
                    } else if (role === 'doctor') {
                        let doctorData = {identifier, password, role: 'doctor' };
                        axios.post('http://localhost:3050/auth/doctorlogin', doctorData)
                        .then((response) => {
                            console.log(response.data); 
                            const message = response.data.message;
                            if (message === "Mobile number/email and password are required" || message === "Invalid mobile number/email or password") {
                                getFormerror(message);
                                return false;
                            } else {
                                getFormerror('');

                                    const { token, user } = response.data;

                                    localStorage.setItem('token', token);
                                    localStorage.setItem('id', user.id);
                                    localStorage.setItem('name', user.name);
                                    localStorage.setItem('mobileNumber', user.mobilenumber);
                                    localStorage.setItem('email', user.email);
                                    localStorage.setItem('role', 'doctor');
                                    
                                    navigate('/');
                                    console.log("User logged in successfully with ID:", response.data.user.id);
                                }
                            })
                            .catch((error) => {
                                console.error("Error logging in:", error);
                            });
                    }

                }else {
                    const patientData = { name, gender, dateofbirth, mobilenumber, email, password };
                    axios.post('http://localhost:3050/auth/registration', patientData)
                        .then((response) => {
                        const responseData = response.data;
                        console.log("Response data:", responseData);
                            const message = responseData.message;
                            console.log("Message:", message);
                            if (message === "Email already exists") {
                                getFormerror("Email already exists");
                            } else if (message === 'Mobile Number already exists') {
                                getFormerror("Mobile Number already exists");
                            } else {
                                console.log("Registration successful");
                                getFormerror('');
                                navigate('/login');
                            }
                    })
                    .catch((error) => {
                        console.error("Error registering user:", error);
                        getFormerror("Registration failed");
                    });
                }
            }
        }
    }


  return (
    <>
      <div className="login-registration">
            <div className="login-registration-left">
                <img src="images/slider2.png" alt="" />
            </div>
            <div className="login-registration-right">
                <h2>{heading}</h2>
                {changebutton !== 'Register' && (
                    <h3>Hello! <span>Welcome</span> Back 😎</h3>
                )}
                <form onSubmit={submitHandler}>
                    <div id="errorMessage">{formerror}</div>
                    { changebutton !== 'Login' && (
                    <div className='flex'>
                        <label>Name</label>
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={nameHandler} />
                    </div>
                    )}
                    {changebutton !== 'Login' && (
                    <div className='flex'>
                        <label>Date Of Birth</label>
                        <input type="date" value={dateofbirth} onChange={dateofbirthHandler} />
                    </div>
                    )}
                    {changebutton !== 'Login' && (
                    <div className='flex'>
                        <label>Gender</label>
                        <select value={gender} onChange={genderHandler}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    )}
                    {changebutton !== 'Login' && (
                    <div className='flex'>
                        <label>Email</label>
                        <input type="email" placeholder='Email' value={email} onChange={emailHandler} />
                    </div>
                    )}
                    {changebutton !== 'Login' && (
                    <div className='flex'>
                        <label>Mobile Number</label>
                        <input type="text" placeholder="Enter Mobile Number" value={mobilenumber} onChange={mobilenumberHandler} />
                    </div>
                    )}
                    {changebutton == 'Login' && (
                    <div className='flex'>
                        <label>Enter Email or Mobile Number</label>
                        <input type="text" placeholder="Enter Email or Mobile Number" value={identifier} onChange={identifierHandler} />
                    </div>
                    )}
                    <div className='flex'>
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" value={password} onChange={passwordHandler} />
                    </div>
                    {changebutton == 'Login' && (
                    <div className='login-as'>
                        <label>Login As:</label>
                        <select value={role} onChange={roleHandler}>
                            <option value="patient">Pateint</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>
                    )}
                    <div className='submit-button'>
                        <button type='submit'>{changebutton}</button>
                    </div>
                </form>
                <div className="create-account">
                    <p>{textlink}</p>
                    <button type='button' onClick={() => navigate(`/${linktext.toLowerCase()}`)}>{linktext}</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
