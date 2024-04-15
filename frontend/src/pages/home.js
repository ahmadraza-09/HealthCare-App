import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Hero from '../components/hero'
import WorkTutorial from '../components/worktutorial'
import DoctorCard from '../components/doctorcard'
import DoctorSection from '../components/doctorsection'

const Home = () => {
  return (
    <>
      {<Header/>}
      {<Hero/>}
      {<WorkTutorial/>}
      {<DoctorSection/>}
      {<Footer/>}
    </>
  )
}

export default Home
