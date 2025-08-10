import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Rahul Kumar",
      role: "Patient",
      content:
        "The care I received was exceptional. The staff was professional, caring, and the facility is state-of-the-art.",
      rating: 5,
    },
    {
      name: "Aman Gupta",
      role: "Patient",
      content:
        "Outstanding medical service with a personal touch. I felt heard and well-cared for throughout my treatment.",
      rating: 5,
    },
    {
      name: "Sweta Tiwari",
      role: "Patient",
      content:
        "Modern facilities combined with compassionate care. This clinic sets the standard for healthcare excellence.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Patients Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real stories from real patients who have experienced exceptional
            care at our clinic.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl transition-colors duration-300">
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                )
              )}
            </div>

            <blockquote className="text-xl lg:text-2xl text-gray-700 dark:text-gray-200 text-center mb-8 leading-relaxed">
              &quot;{testimonials[currentTestimonial].content}&quot;
            </blockquote>

            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-blue-600 dark:text-blue-400">
                {testimonials[currentTestimonial].role}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
