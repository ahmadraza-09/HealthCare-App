import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/appointmentlist.css'

const AppointmentList = () => {

  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAppointmentList();
  }, []);

  const getAppointmentList = () => {
    axios.get('http://localhost:3050/auth/appointmentlist')
      .then(response => {
        setAppointmentData(response.data.message);
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
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Concern</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {appointmentData.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.name}</td>
              <td>{new Date(appointment.dateofbirth).toLocaleDateString()}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.concern}</td>
              <td>{appointment.mobilenumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default AppointmentList
