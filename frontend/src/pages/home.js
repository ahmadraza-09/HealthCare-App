import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Hero from '../components/hero'
import WorkTutorial from '../components/worktutorial'
import DoctorCard from '../components/doctorcard'
import DoctorSection from '../components/doctorsection'
import About from '../components/about'
import Testimonials from '../components/testimonials'

const Home = () => {
  return (
    <>
      {<Header/>}
      {<Hero/>}
      {<WorkTutorial/>}
      {<DoctorSection/>}
      {<About/>}
      {<Testimonials/>}
      {<Footer/>}
    </>
  )
}

export default Home
