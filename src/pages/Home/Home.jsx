import React from "react";
import PromoSection from "../../components/Views/Home/PromoSection";
import HeroSection from "../../components/Views/Home/HeroSection";
import BannerSection from "../../components/Views/Home/BannerSection";

const Home = () => {
  return (
    <>
      <div className="item flex flex-wrap justify-center gap-4">
        <HeroSection />
        <PromoSection />
        <BannerSection />
      </div>
    </>
  );
};

export default Home;
