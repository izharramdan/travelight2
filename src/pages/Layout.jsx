import React from "react";
import Navbar from "../components/Navbar/Navbar";
// import Banner from "../components/Banner/Banner";
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
// import OrderPopup from "../components/OrderPopup/OrderPopup";

const Layout = () => {
  
  return (
    <>
      <Navbar />
      {/* <Banner /> */}
      <Outlet />
      {/* <Footer />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> */}
      <Footer />
    </>
  );
};

export default Layout;
