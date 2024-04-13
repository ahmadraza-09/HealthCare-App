import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Hero from '../components/hero'
import WorkTutorial from '../components/worktutorial'
import DoctorCard from '../components/doctorcard'

const Home = () => {
  return (
    <>
      {<Header/>}
      {<Hero/>}
      {<WorkTutorial/>}
      {<Footer/>}
    </>
  )
}

export default Home
