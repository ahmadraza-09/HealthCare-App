import React from 'react'
import '../css/testimonials.css'
import TestimonialCard from '../components/testimonialcard'


const Testimonial = () => {
  return (
    <>
      <div className="testimonials">
        <h2>What Our Pateints Says</h2>
        <TestimonialCard/>
      </div>
    </>
  )
}

export default Testimonial
