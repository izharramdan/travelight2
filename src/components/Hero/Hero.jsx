import React from 'react';
import HeroImage from '../../assets/Hero.jpg';
import Logo from "../../assets/travelight.png";

const Hero = () => {
  return (
    <div className="relative flex h-3/4 w-11/12 mx-auto rounded-3xl overflow-hidden mb-4 mt-4 border">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${HeroImage})` }}></div>
      <div className="w-1/2 flex flex-col items-center justify-center bg-stone-100 text-black p-8">
        <div className="flex items-center mb-4">
          <h1 className="text-4xl md:text-6xl font-semibold font-poppins">Explore with</h1>
          <img src={Logo} alt="Travelight Logo" className="h-16 md:h-20 ml-4" />
        </div>
        <p className="text-lg md:text-2xl mb-8 font-poppins">Discover amazing places</p>
        {/* <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 font-poppins">
          Get Started
        </button> */}
      </div>
    </div>
  );
};

export default Hero;