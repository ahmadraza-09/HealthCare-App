import React from 'react'
import Header from '../components/header';
import ProfileComp from '../components/profilecomp';
import Footer from '../components/footer';

const Profile = () => {
  return (
    <>
      {<Header/>}
      {<ProfileComp/>}
      {<Footer/>}
    </>
  )
}

export default Profile
