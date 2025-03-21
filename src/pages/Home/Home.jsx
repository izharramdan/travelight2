import React from "react";
import PromoSection from "../../components/Views/Home/PromoSection";
import HeroSection from "../../components/Views/Home/HeroSection";
import BannerSection from "../../components/Views/Home/BannerSection";
import CategorySection from "../../components/Views/Home/CategorySection";

const Home = () => {
  return (
    <>
      <div className="item flex flex-wrap justify-center gap-4">
        <HeroSection />
        <PromoSection />
        <BannerSection />
        {/* <CategorySection /> */}
      </div>
    </>
  );
};

export default Home;
