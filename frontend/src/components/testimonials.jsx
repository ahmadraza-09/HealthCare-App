import React from "react";
import TestimonialCard from "./testimonialcard";

const Testimonial = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-teal-700 mb-6">
        What Our Patients Say
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-10">
        Hear from the people whose lives we’ve touched with our dedicated
        healthcare services.
      </p>
      <TestimonialCard />
    </section>
  );
};

export default Testimonial;
