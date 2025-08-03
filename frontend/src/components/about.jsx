import React from "react";

const About = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-teal-700 mb-10">
          About Us
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left - Image */}
          <div className="flex-1">
            <img
              src="images/doctor.png"
              alt="About Doctor"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right - Text */}
          <div className="flex-1 text-gray-700 text-base leading-relaxed">
            <p>
              At <span className="text-teal-600 font-semibold">Healthcare</span>
              , we are dedicated to providing compassionate and comprehensive
              healthcare services tailored to meet the unique needs of each
              patient.
            </p>
            <p className="mt-4">
              With a team of experienced healthcare professionals, we strive to
              deliver high-quality medical care in a warm and welcoming
              environment. Our patient-centered approach ensures that you
              receive personalized attention and support throughout your
              healthcare journey.
            </p>
            <p className="mt-4">
              From routine check-ups to specialized treatments, we are committed
              to promoting your health and well-being every step of the way.
            </p>
            <p className="mt-4 font-semibold text-teal-700">
              Trust us to be your partner in health and let us help you live
              your best life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
