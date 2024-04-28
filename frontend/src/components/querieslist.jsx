import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/querieslist.css'

const QueriesList = () => {

  const [queriesData, setQueriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getContactList();
  }, []);

  const getContactList = () => {
    axios.get('http://localhost:3050/auth/contactlist')
      .then(response => {
        setQueriesData(response.data.message);
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
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {queriesData.map(queries => (
            <tr key={queries.id}>
              <td>{queries.name}</td>
              <td>{queries.email}</td>
              <td>{queries.mobilenumber}</td>
              <td>{queries.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default QueriesList
