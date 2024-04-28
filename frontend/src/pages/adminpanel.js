import React from 'react'
import Header from '../components/header'
import AdminPanelComp from '../components/adminpanelcomp'
import Footer from '../components/footer'

const AdminPanel = () => {
  return (
    <>
      {<Header/>}
      {<AdminPanelComp/>}
    </>
  )
}

export default AdminPanel
