import React, { useState } from "react";
import ImageLoginRegis from "../../assets/login-logo.svg";
import { EyeSolid, EyeClosed } from "iconoir-react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { isLoading, error, handleLogin } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 to-white">
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm border border-red-300">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="noreg" className="text-sm font-medium text-gray-600">Email</label>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <span
                onClick={handleRegisterClick}
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          src={ImageLoginRegis}
          alt="Login Illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
