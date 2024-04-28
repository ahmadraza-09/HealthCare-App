import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/patientslist.css';

const PatientsList = () => {
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios.get('http://localhost:3050/auth/userlist')
      .then(response => {
        setUserdata(response.data.message);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching user data');
        setLoading(false);
        console.error('Error fetching user data:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="patients-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.dateofbirth).toLocaleDateString()}</td>
              <td>{user.email}</td>
              <td>{user.mobilenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsList;
