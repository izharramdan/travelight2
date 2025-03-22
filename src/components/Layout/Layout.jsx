import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Header/Index";
import Footer from "./Footer/Index";


const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Layout;