import React from "react";
import useBanner from "./hooks/useBanner";
import { Typography, IconButton } from "@material-tailwind/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function CustomNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slidePrev()}
        className="dark !absolute left-2 top-1/2 z-10 transform -translate-y-1/2"
      >
        <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
      </IconButton>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-2 top-1/2 z-10 transform -translate-y-1/2"
      >
        <NavArrowRight className="h-7 w-7 translate-x-px stroke-2" />
      </IconButton>
    </>
  );
}

const BannerSection = () => {
  const { banners, loading, error } = useBanner();

  return (
    <div className="mt-4 mx-auto container w-11/12">
      {/* <div className="mb-2">
        <Typography type="h3" className="text-gray-800">
          <span className="text-3xl italic text-yellow-500 font-bold">%</span>{" "}
        </Typography>
      </div> */}
      <div className="relative bg-gray-200 rounded-xl shadow-lg w-full mx-auto h-60 overflow-hidden">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          className="relative rounded-lg h-full"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id} className="select-none h-full">
              <div className="w-full h-full">
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}

          <CustomNavigation />
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSection;
