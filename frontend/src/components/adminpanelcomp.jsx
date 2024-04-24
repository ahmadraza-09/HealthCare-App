import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/adminpanel.css'

const AdminPanelComp = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
  };

  return (
    <div>
      Admin Panel
      <button onClick={handleLogout}>Logout</button>
      
    </div>
  )
}

export default AdminPanelComp
