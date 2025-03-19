import React, { useEffect, useState, useRef } from "react";
import Logo from "../../../assets/travelight.png";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import useLogout from "../../../hooks/useLogout";

const Navbar = () => {
  const { handleLogout, isLoading } = useLogout();
  const navigate = useNavigate();
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="sticky top-0 z-50">
      <nav className="rounded-md overflow-visible p-2 bg-white mx-auto w-full bg-opacity-50">
        <div className="flex items-center">
          <a className="font-sans antialiased text-sm text-current ml-4 mr-4 block py-1 font-semibold cursor-pointer hover:text-primary">
            <img
              src={Logo}
              alt="Travelight Logo"
              className="h-10 w-auto transform scale-125 md:h-10"
            />
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
          {user ? (
            <div className="relative ml-auto">
              <button
                className="ml-4 mr-4 items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased lg:ml-auto lg:inline-block"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.name}
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("editprofile")}
                  >
                    Edit Profile
                  </a>
                  {user.role === "admin" && (
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("dashboard/*")}
                    >
                      Admin Dashboard
                    </a>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <span>Logout</span>
                    <FiLogOut className="inline-block ml-2" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="ml-auto mr-4 items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased lg:ml-auto lg:inline-block"
              onClick={handleLogin}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
