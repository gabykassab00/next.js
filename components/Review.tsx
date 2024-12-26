"use client";
import React from "react";
import "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { reviewData } from "@/constants";
import Image from "next/image";

const Review = () => {
  return (
    <div className="pt-20 pb-20 flex items-center justify-center flex-col bg-[#1976d2]">
      <div className="w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h1 className="text-2xl font-semibold text-white">FeedBack</h1>
          <p className="mt-6 text-gray-200">
            Let’s hear what people say about AIPRO!
          </p>
          <div className="mt-6 flex items-center space-x-6">
            <div>
              <p className="text-2xl font-bold text-white">4.88</p>
              <p className="text-white mb-2">Overall Rating</p>
              <div className="flex items-center">
                <FaStar className="text-white" />
                <FaStar className="text-white" />
                <FaStar className="text-white" />
                <FaStar className="text-white" />
                <FaStar className="text-white" />
              </div>
            </div>
          </div>
        </div>
        {/*slider */}
        <div className="oveflow-hidden">
          <div>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="md:w-[450px] md:h-[350px] w-[90%] h-[300px]"
            >
              {reviewData.map((data) => {
                return (
                  <SwiperSlide
                    key={data.id}
                    className="bg-white rounded-3xl block"
                  >
                    <div className="w-[80%] mx-auto mt-16">
                      {/* review text */}
                      <p className="text-xs sm:text-sm md:text-base font-semibold">
                        {data.review}
                      </p>
                      <div className="flex items-center mt-4">
                        <FaStar className="md:w-6 md:h-6 w-3 text-yellow-600" />
                        <FaStar className="md:w-6 md:h-6 w-3 text-yellow-600" />
                        <FaStar className="md:w-6 md:h-6 w-3 text-yellow-600" />
                        <FaStar className="md:w-6 md:h-6 w-3 text-yellow-600" />
                        <FaStar className="md:w-6 md:h-6 w-3 text-yellow-600" />
                      </div>
                        {/* profile */}
                        <div className="mt-10">
                            <div className="flex items-center space-x-4">
                                <Image src={data.image} width={60} height={60} alt="client" className="rounded-full"></Image>
                                <div>
                                    <p className="text-sm sm:text-lg font-semibold">{data.name}</p>
                                    <p className="text-gray-600 text-xs sm:text-base">{data.rank}</p>
                                    <p className="text-gray-700 text-xs sm:text-base">{data.club}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
