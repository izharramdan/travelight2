import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import ActionButton from "../../../components/Dashboard/components/ActionButton";

const AddBanner = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Tambahkan logika penyimpanan
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Banner
        </h1>

        {/* Image Preview Box */}
        <div className="mb-8">
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">
                Image preview will appear here
              </span>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Banner Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter banner name"
              className="w-full"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Upload Banner Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <ActionButton
              type="submit"
              label="Submit"
              color="blue"
              className="px-6 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;