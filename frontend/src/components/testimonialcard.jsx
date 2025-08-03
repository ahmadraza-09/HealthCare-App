import React from "react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const testimonials = [
  {
    name: "Ahmad Raza",
    img: "images/doctor.png",
    message:
      "The doctors were professional and very attentive. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sara Khan",
    img: "images/doctor.png",
    message:
      "Amazing experience. The booking was easy and the service was top-notch.",
    rating: 5,
  },
  {
    name: "Rahul Mehra",
    img: "images/doctor.png",
    message: "Friendly staff and quick appointment scheduling. Thank you!",
    rating: 5,
  },
  {
    name: "Nisha Verma",
    img: "images/doctor.png",
    message: "Very clean clinic and the doctor explained everything clearly.",
    rating: 5,
  },
  {
    name: "Farhan Ali",
    img: "images/doctor.png",
    message: "I felt comfortable and cared for throughout my visit.",
    rating: 5,
  },
];

const TestimonialCard = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={30}
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ padding: "0 20px" }}
    >
      {testimonials.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-sm text-left">
            <div className="flex items-center mb-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="text-lg font-semibold text-teal-700">
                  {item.name}
                </h4>
                <div className="flex text-yellow-400">
                  {Array(item.rating)
                    .fill(0)
                    .map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-sm mr-1"></i>
                    ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">"{item.message}"</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialCard;
