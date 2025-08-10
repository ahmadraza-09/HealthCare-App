import React from "react";
import { Award, Users, Clock, MapPin } from "lucide-react";
import clinic_image1 from "../assets/clinic1.jpg";
import clinic_image2 from "../assets/clinic2.webp";
import clinic_image3 from "../assets/clinic3.avif";
import clinic_image4 from "../assets/clinic4.jpg";

const About = () => {
  const stats = [
    {
      icon: Users,
      label: "Patients Served",
      value: "10,000+",
      color: "text-blue-500",
    },
    {
      icon: Award,
      label: "Medical Awards",
      value: "50+",
      color: "text-green-500",
    },
    {
      icon: Clock,
      label: "Years Experience",
      value: "15+",
      color: "text-purple-500",
    },
    { icon: MapPin, label: "Locations", value: "3", color: "text-orange-500" },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Leading Healthcare Excellence Since 2008
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                At HealthCare Plus, we&apos;re committed to providing
                exceptional medical care with a personal touch. Our
                state-of-the-art facility combines cutting-edge technology with
                compassionate healthcare professionals.
              </p>
            </div>

            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Patient-Centered Care
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We put our patients first, ensuring personalized treatment
                    plans that address your unique healthcare needs.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Advanced Technology
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our facility features the latest medical equipment and
                    diagnostic tools for accurate diagnosis and effective
                    treatment.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Expert Medical Team
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Board-certified physicians and specialists with years of
                    experience in their respective fields.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                        <IconComponent className={stat.color} size={24} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={clinic_image1}
                  alt="Medical consultation"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src={clinic_image2}
                  className="rounded-2xl shadow-lg w-full h-32 object-cover"
                />
              </div>
              <div className="space-y-4 mt-8">
                <img
                  src={clinic_image3}
                  className="rounded-2xl shadow-lg w-full h-32 object-cover"
                />
                <img
                  src={clinic_image4}
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Award className="text-blue-500" size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    JCI Accredited
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    International Standards
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
