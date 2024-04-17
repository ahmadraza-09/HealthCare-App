import React from 'react';
import '../css/testimonialcard.css';

const TestimonialCard = ({ name, condition, imageUrl, rating, testimonialText }) => {
  return (
    <>
      <div className="testimonial-card">
        <div className="testimonial-card-upper">
            <div className="testimonial-card-upper-left">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="testimonial-card-upper-right">
                <h2>{name}</h2>
                <label>{condition}</label>
                <div className="stars">
                    {/* Assuming rating is an integer from 1 to 5 */}
                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </div>
            </div>
        </div>
        <div className="testimonial-card-down">
            <p>{testimonialText}</p>
        </div>
      </div>
    </>
  )
}

export default TestimonialCard;
