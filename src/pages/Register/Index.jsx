import React, { useState } from "react";
import ImageLoginRegis from "../../assets/register-logo.svg";
import useRegister from "../../hooks/useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { success, error, isLoading, handleRegister, setImageFile } =
    useRegister();
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicturePreview(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div>
      <div className="flex flex-col h-screen md:flex-row-reverse">
        <div className="flex flex-col px-10 gap-5 md:p-20 w-full justify-center h-full md:w-1/2">
          <div>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Register
            </h2>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {success && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Success</strong>
                <span className="block sm:inline">Login Success</span>
              </div>
            )}
          </div>
          <div>
            <form onSubmit={handleRegister}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="name"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    placeholder="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                    style={{ top: "60%", transform: "translateY(-50%)" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 relative">
                  <label
                    htmlFor="passwordRepeat"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Repeat Password
                  </label>
                  <input
                    id="passwordRepeat"
                    name="passwordRepeat"
                    placeholder="repeat password"
                    type={showRepeatPassword ? "text" : "password"}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleRepeatPasswordVisibility}
                    style={{ top: "60%", transform: "translateY(-50%)" }}
                  >
                    {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="profilePicture"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Picture
                  </label>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    onChange={handleProfilePictureChange}
                  />
                  {profilePicturePreview && (
                    <img
                      src={profilePicturePreview}
                      alt="Profile Preview"
                      className="mt-2 h-20 w-20 object-cover rounded-full"
                    />
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    placeholder="phone number"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
                <button
                  className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-200 hover:bg-stone-100 relative bg-gradient-to-b from-orange-200 to-orange-100 border-stone-200 text-stone-700 rounded-lg hover:bg-gradient-to-b hover:from-stone-50 hover:to-stone-50 hover:border-stone-200 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-1px_0px_rgba(0,0,0,0.20)] after:pointer-events-none transition antialiased"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex md:flex md:w-1/2">
          <img
            src={ImageLoginRegis}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
