import React from "react";
import { Star } from "lucide-react";
import doctor_image1 from "../assets/doctor1.jpg";
import doctor_image2 from "../assets/doctor1.avif";
import doctor_image3 from "../assets/doctor3.jpg";
import { useNavigate } from "react-router-dom";

const DoctorSection = () => {
  const navigate = useNavigate();
  const doctors = [
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Cardiologist",
      experience: "15+ years",
      image: doctor_image1,
    },
    {
      name: "Dr. James Mitchell",
      specialty: "Neurologist",
      experience: "12+ years",
      image: doctor_image2,
    },
    {
      name: "Dr. Lisa Thompson",
      specialty: "Pediatrician",
      experience: "18+ years",
      image: doctor_image3,
    },
  ];

  return (
    <section
      id="doctors"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Experts
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our team of renowned specialists brings decades of experience and a
            commitment to excellence in patient care.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-600"
            >
              {/* Doctor Image */}
              <div className="relative mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {doctor.experience}
                </div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                  {doctor.specialty}
                </p>
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigate("/appointment")}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorSection;
