import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Typography, IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import HeroImage1 from "../../../assets/hero/1.png";
import HeroImage2 from "../../../assets/hero/2.png";
import HeroImage3 from "../../../assets/hero/3.png";
import SearchBar from "./SearchBar";

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
        className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
      </IconButton>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowRight className="h-7 w-7 translate-x-px stroke-2" />
      </IconButton>
    </>
  );
}

const HeroSection = () => {
  const slides = [
    {
      imageUrl: HeroImage1,
      title: "Explore the World",
      description: "Discover new places and adventures.",
    },
    {
      imageUrl: HeroImage2,
      title: "Find Your Journey",
      description: "Plan your perfect trip with us.",
    },
    {
      imageUrl: HeroImage3,
      title: "Adventure Awaits",
      description: "Experience the thrill of adventure.",
    },
  ];

  return (
    <div className="relative w-full h-screen rounded-sm overflow-hidden">
      <Swiper modules={[Navigation]} loop className="h-full">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <Typography variant="h1" color="white" className="mb-4">
                  {slide.title}
                </Typography>
                <Typography variant="h1" color="white" className="mb-4">
                  {slide.title}
                </Typography>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
        <CustomNavigation />
      </Swiper>
      <SearchBar />
    </div>
  );
};

export default HeroSection;
