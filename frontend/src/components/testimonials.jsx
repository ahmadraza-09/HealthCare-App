import React, { useState, useRef, useEffect } from 'react';
import TestimonialCard from './testimonialcard';
import '../css/testimonials.css';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Ahmad Raza",
      condition: "Heart Problem",
      imageUrl: "images/doctor.png",
      rating: 4,
      testimonialText: "I am very happy to have you today and I will never have a problem with you."
    },
    {
      name: "John Doe",
      condition: "Knee Replacement",
      imageUrl: "images/doctor.png",
      rating: 5,
      testimonialText: "The service was fantastic! My knees have never felt better."
    },
    {
      name: "Jane Smith",
      condition: "General Checkup",
      imageUrl: "images/doctor.png",
      rating: 3,
      testimonialText: "Good service but waiting times could be improved."
    },
    {
      name: "Jane Smith",
      condition: "General Checkup",
      imageUrl: "images/doctor.png",
      rating: 3,
      testimonialText: "Good service but waiting times could be improved."
    },
    {
      name: "Ahmad Raza",
      condition: "Heart Problem",
      imageUrl: "images/doctor.png",
      rating: 4,
      testimonialText: "I am very happy to have you today and I will never have a problem with you."
    },
    {
      name: "John Doe",
      condition: "Knee Replacement",
      imageUrl: "images/doctor.png",
      rating: 5,
      testimonialText: "The service was fantastic! My knees have never felt better."
    },
    {
      name: "Jane Smith",
      condition: "General Checkup",
      imageUrl: "images/doctor.png",
      rating: 3,
      testimonialText: "Good service but waiting times could be improved."
    },
    {
      name: "Jane Smith",
      condition: "General Checkup",
      imageUrl: "images/doctor.png",
      rating: 3,
      testimonialText: "Good service but waiting times could be improved."
    }
  ];

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1)),
      3000 // Interval of 2.5 seconds for auto-slide
    );

    return () => {
      resetTimeout();
    };
  }, [index, testimonialsData.length]);

  return (
    <>
      <div className="testimonials">
        <h2>What Our Patients Say</h2>
        <div className="testimonials-list">
          <div className="testimonial-slide" style={{ transform: `translateX(-${index * (100 / testimonialsData.length)}%)` }}>
            {testimonialsData.map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                name={testimonial.name}
                condition={testimonial.condition}
                imageUrl={testimonial.imageUrl}
                rating={testimonial.rating}
                testimonialText={testimonial.testimonialText}
              />
            ))}
          </div>
        </div>
        <div className="slideshowDots">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${Math.floor(index / (testimonialsData.length / 3)) === idx ? " active" : ""}`}
              onClick={() => setIndex(idx * (testimonialsData.length / 3))}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Testimonials;
