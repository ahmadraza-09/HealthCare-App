import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllPatients from './patientslist';
import AppointmentList from './appointmentlist';
import QueriesList from './querieslist';
import Revenue from './revenue';
import '../css/adminpanel.css'

const AdminPanelComp = () => {

  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('Patients');


   const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
  };

  return (
    <div className='admin-panel-section'>

      <div className="admin-sidebar">
        <ul>
          <li className={selectedItem === 'Patients' ? 'active' : ''}
              onClick={() => handleItemClick('Patients')}
          >
            <i class="fa-solid fa-users"></i>All Patients
          </li>
          <li
            className={selectedItem === 'Appointments' ? 'active' : ''}
            onClick={() => handleItemClick('Appointments')}
          >
            <i class="fa-solid fa-calendar-check"></i>Appointments
          </li>
          <li
            className={selectedItem === 'Queries' ? 'active' : ''}
            onClick={() => handleItemClick('Queries')}
          >
            <i class="fa-solid fa-clipboard-question"></i>Queries
          </li>
          <li
            className={selectedItem === 'Revenue' ? 'active' : ''}
            onClick={() => handleItemClick('Revenue')}
          >
            <i class="fa-solid fa-money-check-dollar"></i>Revenue
          </li>

          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>

      <div className="admin-content">
        {selectedItem === 'Patients' && <AllPatients/>}
        {selectedItem === 'Appointments' && <AppointmentList/>}
        {selectedItem === 'Queries' && <QueriesList/>}
        {selectedItem === 'Revenue' && <Revenue/>}
      </div>

      
    </div>
  )
}

export default AdminPanelComp
