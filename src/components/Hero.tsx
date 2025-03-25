// import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./Hero.css";

import Benefit1 from "../assets/car 1.jpg";
import Benefit2 from "../assets/car 1-1.jpg";
import Benefit3 from "../assets/car 1-2.jpg";
import Benefit4 from "../assets/car 1-3.jpg";
import Benefit5 from "../assets/car 2.jpeg";
import Benefit6 from "../assets/car 2-1.jpg";
import Benefit7 from "../assets/car 2-3.jpeg";
import Benefit8 from "../assets/car 2-4.jpg";
import Benefit9 from "../assets/car 2-5.jpg";

const images = [Benefit1, Benefit2, Benefit3, Benefit4, Benefit5, Benefit6, Benefit7, Benefit8, Benefit9];

export default function Hero() {
  return (
    <div className="hero h-fit mb-20">
      <div className="hero-content grid md:grid-cols-2 sm:gap-5">
        <div>
          <h1 className="text-5xl font-bold">
            Want to drive or be in your dream car but can't afford to buy?
          </h1>
          <p className="py-6">
            Enuma Car Rental Services got you covered. We offer you the best affordable car rental services. We ensure that we make your dream come true by providing you with the easy and seamless process of having your dream car, even if for a while😉.
          </p>
          <Link to="/register">
            <button className="btn btn-outline btn-info">Start your journey</button>
          </Link>
        </div>
        
        {/* Swiper slideshow */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="custom-swiper max-w-sm rounded-lg shadow-2xl"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="custom-swiper-slide">
              <img src={image} className="w-full h-auto rounded-lg" alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}