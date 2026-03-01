import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Course_Card from "./Course_Card";

const CourseSlider = ({ courses }) => {
  return (
    <div className="relative px-4 py-6">
      {courses?.length ? (
        <Swiper
          modules={[FreeMode, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          freeMode={true}
        
          grabCursor={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="!pb-10"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={course?._id || index} className="!h-auto">
              <Course_Card
                course={course}
                Height="h-[180px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-orange-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">
            No courses found in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;