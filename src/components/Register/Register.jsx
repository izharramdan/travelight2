import React, { useState } from "react";
import axios from "axios";
const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
import toast, { Toaster } from "react-hot-toast";


const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordRepeat: "",
    role: "",
    // profilePictureUrl: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${base_url}/api/v1/register`,
        formData,
        {
          headers: {
            apiKey: import.meta.env.VITE_API_KEY,
          },
        }
      );
      // console.log(response.data.message);
      toast.success(response.data.message);
      setFormData({
        email: "",
        name: "",
        password: "",
        passwordRepeat: "",
        role: "",
        phoneNumber: "",
      });
    } catch (error) {
      // console.error(error);
      toast.error(error.response.data.message || "Failed to register");
    }
    // Handle form submission logic here
    // console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg font-poppins">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            {
              id: "email",
              type: "email",
              placeholder: "someone@example.com",
              label: "Email",
            },
            {
              id: "name",
              type: "text",
              placeholder: "Your Name",
              label: "Name",
            },
            {
              id: "password",
              type: "password",
              placeholder: "••••••••",
              label: "Password",
            },
            {
              id: "passwordRepeat",
              type: "password",
              placeholder: "••••••••",
              label: "Repeat Password",
            },
            {
              id: "role",
              type: "text",
              placeholder: "Your Role",
              label: "Role",
            },
            // {
            //   id: "profilePictureUrl",
            //   type: "url",
            //   placeholder: "Profile Picture URL",
            //   label: "Profile Picture URL",
            // },
            {
              id: "phoneNumber",
              type: "tel",
              placeholder: "Phone Number",
              label: "Phone Number",
            },
          ].map((field) => (
            <div key={field.id} className="space-y-1 w-full">
              <label
                htmlFor={field.id}
                className="font-sans antialiased text-sm text-stone-800 dark:text-white font-semibold"
              >
                {field.label}
              </label>
              <div className="relative w-full">
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
