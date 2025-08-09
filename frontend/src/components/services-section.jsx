import React from "react";
import {
  Heart,
  Brain,
  Eye,
  Activity,
  Stethoscope,
  Shield,
  ChevronRight,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description:
        "Comprehensive heart care with advanced diagnostic tools and treatment options.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Brain,
      title: "Neurology",
      description:
        "Expert neurological care for complex brain and nervous system conditions.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description:
        "Complete eye care services from routine exams to complex surgeries.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Activity,
      title: "Emergency Care",
      description:
        "24/7 emergency medical services with rapid response and expert care.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description:
        "Primary healthcare services for patients of all ages and conditions.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Preventive Care",
      description:
        "Proactive health screening and wellness programs for optimal health.",
      color: "from-teal-500 to-green-500",
    },
  ];

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-b from-white to-gray-50 mt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive medical services delivered with expertise, compassion,
            and cutting-edge technology for your optimal health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center group-hover:translate-x-2 transition-transform duration-300">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
