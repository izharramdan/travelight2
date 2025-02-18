import React from "react";
import Banner from "../components/Banner/Banner";
import Hero from "../components/Hero/Hero";
import Promo from "../components/Promo/Promo";
import Category from "../components/Categories/Category";
// import Footer from "../components/Footer/Footer";
// import BannerImg from "../assets/cover-women.jpg";
// import Banner2 from "../assets/travel-cover2.jpg";
// import Carousel from "../components/Banner/Carousel";

const Home = () => {
  // const [orderPopup, setOrderPopup] = React.useState(false);

  // const handleOrderPopup = () => {
  //   setOrderPopup(!orderPopup);
  // };
  return (
    <>
      <div>
        {/* <BannerPic img={BannerImg} /> */}
        <Hero />
        <Banner />
        <Promo />
        <Category />
        {/* <Footer /> */}
        {/* <Carousel /> */}
      </div>
    </>
  );
};

export default Home;
