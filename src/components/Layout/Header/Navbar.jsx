import React, { useEffect, useState, useRef } from "react";
import Logo from "../../../assets/travelight.png";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <nav className="rounded-lg border overflow-visible p-2 bg-white border-stone-200 shadow-stone-950/5 mx-auto mb-4 w-11/12">
        <div className="flex items-center">
          <a className="font-sans antialiased text-sm text-current ml-4 mr-4 block py-1 font-semibold cursor-pointer hover:text-primary">
            <img
              src={Logo}
              alt="Travelight Logo"
              className="h-10 w-auto transform scale-125 md:h-10"
            />
            {/* <img src="/src/assets/logo2.png" alt="Travelight Logo" className="h-12 w-auto" /> */}
          </a>
          <hr className="ml-1 mr-4 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
          <div className="hidden lg:block">
            <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
              <li>
                <a className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary font-bold cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary font-bold cursor-pointer">
                  Categories
                </a>
              </li>
              <li>
                <a className="font-sans antialiased text-sm text-current flex items-center gap-x-2 p-1 hover:text-primary font-bold cursor-pointer">
                  Promo
                </a>
              </li>
            </ul>
          </div>
          <button className="ml-auto mr-4 items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased lg:ml-auto lg:inline-block" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
