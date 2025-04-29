import React, { useEffect, useState, useRef } from "react";
import Logo from "../../../assets/travelight.png";
import { LogOut, CartAlt } from "iconoir-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import useLogout from "../../../hooks/useLogout";
import LoginModal from "../../../pages/Login/LoginModal";
import useGetCart from "../../Views/Home/hooks/cart/useGetCart";
import { Badge, Avatar } from "@material-tailwind/react";

const Navbar = () => {
  const { handleLogout, isLoading } = useLogout();
  const navigate = useNavigate();
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // For LoginModal
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For Hamburger Menu
  const { cartItems } = useGetCart();

  const handleLogin = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
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

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [user]);

  return (
    <div className="sticky top-0 z-50">
      <nav className="sticky top-0 z-50 bg-white bg-opacity-95 shadow-md">
        <div className="max-w-7xl mx-auto py-3 px-4 lg:px-8 flex items-center justify-between">
          {/* Logo + Menu */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            <a className="cursor-pointer" onClick={() => navigate("/")}>
              <img
                src={Logo}
                alt="Travelight Logo"
                className="h-8 w-auto lg:h-10"
              />
            </a>

            {/* Hamburger Menu for Mobile */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center space-x-6">
              <li>
                <a
                  className="text-gray-700 font-semibold hover:text-primary transition cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 font-semibold hover:text-primary transition cursor-pointer"
                  onClick={() => navigate("/category")}
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  className="text-gray-700 font-semibold hover:text-primary transition cursor-pointer"
                  onClick={() => navigate("/promo")}
                >
                  Promo
                </a>
              </li>
            </ul>
          </div>

          {/* Cart & Avatar/Sign In */}
          <div className="flex items-center space-x-4">
            {user && (
              <Badge color="error">
                <Badge.Content onClick={() => navigate("/cart")}>
                  <CartAlt className="h-6 w-6 text-gray-800 cursor-pointer" />
                </Badge.Content>
                {cartItems.length > 0 && (
                  <Badge.Indicator>{cartItems.length}</Badge.Indicator>
                )}
              </Badge>
            )}

            {user ? (
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  <Avatar
                    size="xs"
                    alt={user.name}
                    src={user.profilePictureUrl}
                    className="mr-1"
                  />
                  <span className="hidden lg:block text-sm">{user.name}</span>
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
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("transaction")}
                    >
                      Transaction
                    </a>
                    {user.role === "admin" && (
                      <a
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigate("dashboard/")}
                      >
                        Admin Dashboard
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout <LogOut className="inline ml-2" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="px-4 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                onClick={handleLogin}
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-12 left-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <ul className="flex flex-col px-2 py-2">
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false); // Tutup menu setelah navigasi
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/category");
                    setIsMenuOpen(false); // Tutup menu setelah navigasi
                  }}
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/promo");
                    setIsMenuOpen(false); // Tutup menu setelah navigasi
                  }}
                >
                  Promo
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isOpen && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Navbar;
