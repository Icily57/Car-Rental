import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Container from "../components/Container";

interface BenefitsProps {
  imgPos?: "left" | "right";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode;
    }[];
  };
}

// Sports Car Image URLs (Replace with Cloudinary if needed)
const sportsCarImages = [
  "https://ucarecdn.com/6bc3f5a8-5c84-44d5-bd4a-87cb07a9d0e7/",
  "https://ucarecdn.com/6bc3f5a8-5c84-44d5-bd4a-87cb07a9d0e7/",
  "https://ucarecdn.com/6bc3f5a8-5c84-44d5-bd4a-87cb07a9d0e7/",
  "https://ucarecdn.com/6bc3f5a8-5c84-44d5-bd4a-87cb07a9d0e7/",
];

const Benefits: React.FC<BenefitsProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore");
  };

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap bg-gradient-to-b  from-gray-900 to-black text-white py-12">
      {/* Slideshow Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2">
        <div className="p-6 rounded-lg shadow-xl border-2 border-blue-500 w-full max-w-md">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="rounded-lg"
          >
            {sportsCarImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="Sports Car" className="w-full h-auto rounded-lg shadow-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex flex-wrap items-center w-full lg:w-1/2 ${data.imgPos === "right" ? "lg:justify-end" : ""}`}>
        <div className="flex flex-col w-full mt-4">
          <h3 className="max-w-2xl mt-3 text-4xl font-extrabold leading-snug tracking-tight text-blue-400 lg:leading-tight lg:text-5xl">
            {data.title}
          </h3>
          <p className="max-w-2xl py-4 text-lg leading-normal text-gray-300 lg:text-xl xl:text-xl">
            {data.desc}
          </p>

          {/* Benefits Grid */}
          <div className="w-full mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon} />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              className="px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-black rounded-lg shadow-lg transition-all duration-300 
              ring-2 ring-blue-400 hover:ring-purple-500"
              onClick={handleExploreClick}
            >
              Explore Our Cars 🚗💨
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

interface BenefitProp {
  icon: any;
  title: string;
  children?: string;
}

const Benefit: React.FC<BenefitProp> = ({ icon, title, children }) => {
  return (
    <div className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-purple-500 rounded-md">
        {React.cloneElement(icon, { className: "w-7 h-7 text-white" })}
      </div>
      <div>
        <h4 className="text-2xl font-semibold text-yellow-400">{title}</h4>
        <p className="mt-1 text-gray-300">{children}</p>
      </div>
    </div>
  );
};

export default Benefits;
