import React, { useState, useEffect } from 'react'
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import '../css/login.css'

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


    const nameHandler = (event) => {
        getName(event.target.value);
    }

    const dateOfBirthHandler = (event) => {
        getDate(event.target.value);
    }

    const genderHandler = (event) => {
        getGender(event.target.value);
    }

    const mobilenumberHandler = (event) => {
        getMobilenumber(event.target.value);
    }

    
    // const submitHandler = (e) => {
    // e.preventDefault(); {
    //   if (name === '') {
    //     getFormerror("Enter your Name");
    //     return false;
    //   } else if (!name.match(nameregex)) {
    //     getFormerror("Enter Name in Letters");
    //     return false;
    //   } else if (date === '') {
    //     getFormerror("Select your Date Of Birth");
    //     return false;
    //   } else if (gender === '') {
    //     getFormerror("Select your Gender");
    //     return false;
    //   } else if (mobilenumber === '') {
    //     getFormerror("Enter your Mobile Number");
    //     return false;
    //   } else if (!mobilenumber.match(mobilenumberregex)) {
    //     getFormerror("Invalid Number! Please write only numbers");
    //     return false;
    //   } else {
    //     if(location.pathname === '/login'){
    //       let loginData = {email, password };
    //       axios.post('http://localhost:8080/auth/login', loginData)
    //         .then((response) => {
    //           console.log(response.data.response);
    //           if(response.data.response == "Plese enter email and password"){
    //               getFormerror(response.data.response);
    //               return false;
    //           } else if(response.data.response == "Email or password is incorrect"){
    //               getFormerror(response.data.response);
    //               return false;
    //           }else if(response.data.response[1].userdata[0].email != ''){
    //               getFormerror('')
                  
    //               const id = response.data.response[1].userdata[0].id;
    //               localStorage.setItem('email', response.data.response[1].userdata[0].email); 
    //               localStorage.setItem('id', response.data.response[1].userdata[0].id); 
    //               localStorage.setItem('token', response.data.response[0].jwt); 

    //               navigate(`/profile/${id}`);
    //               console.log("User logged in successfully with ID:", id);
    //           }

    //         })
    //         .catch((error) => {
    //           console.error("Error logging in:", error);
    //         });
    //     } else if (params.id) {
    //       const jsonData = { name,date,gender, mobilenumber };
    //       axios.put(`http://localhost:8080/auth/updateuser/${params.id}`, jsonData)
    //       .then((response) => {
    //           navigate('/userlist');
    //         })
    //         .catch((error) => {
    //           console.error("Error updating user:", error);
    //         });
    //     } else {
    //       const jsonData = { firstname, lastname, mobilenumber, email, password };
    //       axios.post('http://localhost:8080/auth/registeration', jsonData)
    //         .then((response) => {
    //           navigate('/login');
    //         })
    //         .catch((error) => {
    //           console.error("Error registering user:", error);
    //         });
    //     }
    //   }
    // }
    // }




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
                <div className='flex'>
                    <label>Your Name</label>
                    <input type="text" placeholder="Enter Your Name" required/>
                </div>
                )}
                {changebutton !== 'Login' && (
                <div className='flex'>
                    <label>Date Of Birth</label>
                    <input type="date"  required/>
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
                {changebutton == 'Login' && (
                    <div className='flex'>
                        <label>Enter OTP</label>
                        <input type="text" placeholder="Enter OTP" required/>
                    </div>
                )}
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
