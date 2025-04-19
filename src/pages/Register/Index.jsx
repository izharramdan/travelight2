import React, { useState } from "react";
import ImageLoginRegis from "../../assets/register-logo.svg";
import useRegister from "../../hooks/useRegister";
import { EyeSolid, EyeClosed } from "iconoir-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { success, error, isLoading, handleRegister, setImageFile } = useRegister();
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicturePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setProfilePicturePreview(null);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword);
  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-50 to-white">
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm border border-red-300">
              <strong>Error:</strong> {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm border border-green-300">
              <strong>Success:</strong> Account created successfully!
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
              <div
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeSolid /> : <EyeClosed />}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="passwordRepeat" className="text-sm font-medium text-gray-600">Repeat Password</label>
              <input
                id="passwordRepeat"
                name="passwordRepeat"
                type={showRepeatPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
              <div
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={toggleRepeatPasswordVisibility}
              >
                {showRepeatPassword ? <EyeSolid /> : <EyeClosed />}
              </div>
            </div>

            <div>
              <label htmlFor="profilePicture" className="text-sm font-medium text-gray-600">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="w-full mt-1"
              />
              {profilePicturePreview && (
                <img
                  src={profilePicturePreview}
                  alt="Profile Preview"
                  className="mt-3 h-16 w-16 rounded-full object-cover border border-gray-200 shadow-sm"
                />
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-600">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={handleLoginClick}
                className="text-orange-500 font-semibold cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          src={ImageLoginRegis}
          alt="Register Illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
