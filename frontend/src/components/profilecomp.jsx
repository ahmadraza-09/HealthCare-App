import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/profile.css';
import { useNavigate } from 'react-router-dom';

const ProfileComp = () => {

  const navigate = useNavigate();
  const id = localStorage.getItem('id'); // Fetch user ID from local storage

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateofbirth, setDateofbirth] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (id){
      getProfileData(id);
    }
  }, [id]);

  const getProfileData = () => {
    axios.get(`http://localhost:3050/auth/singleuserlist/${id}`)
      .then((response) => {
        const userData = response.data.message[0];
        userData.dateofbirth = new Date(userData.dateofbirth).toISOString().split('T')[0];
        setName(userData.name);
        setGender(userData.gender);
        setDateofbirth(userData.dateofbirth);
        setEmail(userData.email);
        setMobilenumber(userData.mobilenumber);
        setImage(userData.image);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  };

  const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { name, gender, dateofbirth, mobilenumber, email };
    axios.put(`http://localhost:3050/auth/updateuser/${id}`, userData)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <>
      <div className="profile">
        <div className="upper-profile">
          <div className="profile-img">
            <img src={image} alt="" />
            <div className="data">
              <h3>{name}</h3>
              <label>User Profile</label>
            </div>
          </div>
          <div className='profile-buttons'>
            {isEditing ? (
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          ) : (
            <button onClick={handleEdit}>Edit Profile</button>
          )}
          <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="down-profile">
          <h2>
            Information
            <div className="line"></div>
          </h2>
          {isEditing ? (
            <form className="data" onSubmit={handleSubmit}>
              <div className="profile-row1">
                <label>Name</label>
                <label>Email</label>
                <label>Gender</label>
                <label>Date Of Birth</label>
                <label>Mobile Number</label>
              </div>
              <div className="profile-row2">
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input type="date" name="dateofbirth" value={dateofbirth} onChange={(e) => setDateofbirth(e.target.value)} />
                <input type="text" name="mobilenumber" value={mobilenumber} onChange={(e) => setMobilenumber(e.target.value)} />
                <button type="submit">Save</button>
              </div>
            </form>
          ) : (
            <div className="data">
              <div className="profile-row1">
                <label>Name</label>
                <label>Email</label>
                <label>Gender</label>
                <label>Date Of Birth</label>
                <label>Mobile Number</label>
              </div>
              <div className="profile-row2">
                <h3>{name}</h3>
                <h3>{email}</h3>
                <h3>{gender}</h3>
                <h3>{dateofbirth}</h3>
                <h3>{mobilenumber}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileComp;
