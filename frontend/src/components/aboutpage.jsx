import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-100 via-white to-blue-50 min-h-screen py-10 pt-32 px-4 lg:px-20">
      <h2 className="text-4xl font-bold text-center text-[#135D66] mb-10">
        Health<span className="text-[#60A5FA]">Care</span>
      </h2>

      {/* Introduction Section */}
      <section className="bg-white/90 rounded-2xl shadow-lg p-6 md:p-10 mb-10">
        <h2 className="text-2xl font-semibold text-[#135D66] mb-4">
          Introduction
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src="images/about1.webp"
            alt="Introduction"
            className="w-full md:w-64 rounded-xl shadow"
          />
          <p className="text-gray-700 text-justify leading-7">
            Our story begins with a commitment, a determination—to contribute to
            the health and welfare of society. HealthCare was born from an idea,
            a dream—to strive towards a better tomorrow.
            <br />
            <br />
            We stand with a belief that every individual deserves proper and
            compassionate care. Our identity lies in service and empathy. Here,
            we don't just treat health—we care for lives.
            <br />
            <br />
            In its early days, HealthCare made serving the community its
            mission. Our endeavor has been to extend healthcare services to all
            sections of society.
            <br />
            <br />
            Today, HealthCare stands as a prominent hub in the field of
            healthcare service and social upliftment. Our specialists and staff
            are committed to understanding and finding solutions to the problems
            faced by any patient.
            <br />
            <br />
            The foundation of our organization is a strong team, united by
            courage, wisdom, and hard work. Our doctors, nurses, and other staff
            share one goal—to provide health and happiness to people while
            combating diseases.
            <br />
            <br />
            Join us, and let's embark on a journey towards a new and healthy
            life!
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white/90 rounded-2xl shadow-lg p-6 md:p-10 mb-10">
        <h2 className="text-2xl font-semibold text-[#135D66] mb-4">
          Meet Our Dedicated Team
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src="images/about2.webp"
            alt="Team"
            className="w-full md:w-64 rounded-xl shadow"
          />
          <p className="text-gray-700 leading-7">
            <strong>Dr. Jhonsen - Chief Medical Officer:</strong> With over a
            decade of experience in Cardiology, Neurology, and Oncology, Dr.
            Jhonsen ensures top-tier care.
            <br />
            <br />
            <strong>Dr. Emily Smith - Lead Cardiologist:</strong> Dedicated to
            heart health, she focuses on preventive care and advanced
            treatments.
            <br />
            <br />
            <strong>Dr. Michael Johnson - Neurology Specialist:</strong> Offers
            personalized neurological treatment with empathy.
            <br />
            <br />
            <strong>Dr. Sarah Patel - Oncology Expert:</strong> Provides
            cutting-edge therapies and compassionate support to cancer patients.
            <br />
            <br />
            <strong>Nursing Team:</strong> Attentive and skilled caregivers
            supporting recovery and comfort.
            <br />
            <br />
            <strong>Administrative Staff:</strong> Behind-the-scenes heroes
            ensuring smooth operations and a seamless patient experience.
          </p>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="bg-white/90 rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-[#135D66] mb-4">
          Our Vision and Mission
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src="images/about3.png"
            alt="Vision & Mission"
            className="w-full md:w-64 rounded-xl shadow"
          />
          <div className="text-gray-700 leading-7">
            <h3 className="font-bold text-lg text-[#135D66] mt-2">
              Our Vision
            </h3>
            <p>
              To be the premier healthcare provider, committed to excellence in
              patient care, innovation in medical practice, and compassion in
              service delivery.
            </p>

            <h3 className="font-bold text-lg text-[#135D66] mt-4">
              Our Mission
            </h3>
            <p>
              To provide compassionate, comprehensive, and accessible healthcare
              services for all. We aim to promote wellness, prevent illness, and
              treat disease with integrity and innovation, rooted in respect and
              empathy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
