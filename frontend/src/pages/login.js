import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Login from '../components/login'
// import '../css/login.css';

const login = () => {
  return (
    <>
      {<Header/>}
      {<Login/>}
      {<Footer/>}
    </>
  )
}

export default login
