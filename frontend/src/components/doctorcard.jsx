import React from "react";

const DoctorCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden max-w-sm mx-auto">
      {/* Doctor Image */}
      <div className="relative group">
        <img
          src="https://themewagon.github.io/orthoc/images/d2.jpg"
          alt="Doctor"
          className="w-full h-64 object-cover"
        />
        {/* Social Icons */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">
          <i className="fa-brands fa-square-instagram text-white text-xl hover:text-pink-400 cursor-pointer"></i>
          <i className="fa-brands fa-linkedin-in text-white text-xl hover:text-blue-400 cursor-pointer"></i>
          <i className="fa-brands fa-twitter text-white text-xl hover:text-sky-400 cursor-pointer"></i>
          <i className="fa-brands fa-facebook text-white text-xl hover:text-blue-500 cursor-pointer"></i>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">Dr. Jhonsen</h2>
        <label className="text-teal-500 font-medium text-sm">MBBS</label>
        <h4 className="text-gray-500 text-sm mt-1">ID: 039839248</h4>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["Cardiology", "Neurology", "Orthopedic", "General"].map(
            (tag, i) => (
              <span
                key={i}
                className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
