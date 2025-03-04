import React from "react";
import Logo from "../../../assets/travelight.png";

const Footer = () => {
  return (
    <div>
      <footer className="w-11/12 mx-auto my-4 border rounded-lg">
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center md:justify-between">
          <img
            src={Logo}
            alt="Travelight Logo"
            className="h-10 w-auto transform scale-125 md:h-10 m-4"
          />
          <p className="font-sans antialiased text-base text-current text-center m-4">
            © 2025 TraveLight
          </p>
        </div>
        {/* <hr className="my-4 border-stone-200" /> */}
      </footer>
    </div>
  );
};

export default Footer;
