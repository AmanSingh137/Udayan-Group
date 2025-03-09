// components/Carousel.js
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    title: "Balanced Leadership",
    text: "We strive to achieve continuous growth that is far above average...",
  },
  {
    title: "Expert Solutions",
    text: "We strive to achieve continuous growth that is far above average...",
  },
  {
    title: "Strategic Growth",
    text: "We strive to achieve continuous growth that is far above average...",
  },
  {
    title: "Sustainable Innovation",
    text: "We strive to achieve continuous growth that is far above average...",
  },
];

export default function Carousel() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full gap-8">
        {/* Left Image */}
        <div className="relative w-full h-96">
          <Image
            src="/power-grid.jpg" // Replace with actual image path
            alt="Power Grid"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            What problem can we solve together?
          </h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{slide.title}</h3>
                  <p className="text-gray-600 mt-2">{slide.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
