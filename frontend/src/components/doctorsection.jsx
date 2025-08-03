import React from "react";
import DoctorCard from "./doctorcard";

const DoctorSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-teal-700">Our Doctors</h2>
        <p className="text-gray-600 mt-2">
          Meet our team of experienced medical professionals
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </div>
    </section>
  );
};

export default DoctorSection;
