import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import ActionButton from "../../components/Dashboard/components/ActionButton";
import useUploadImage from "../../hooks/useUploadImage";
import { useUser } from "../../context/userContext";

const EditProfile = () => {
  const { user, refreshUserData } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePictureUrl: "",
    phoneNumber: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const { uploadImage, uploadProgress } = useUploadImage();
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profilePictureUrl: user.profilePictureUrl || "",
        phoneNumber: user.phoneNumber || "",
      });
      setPreviewImage(user.profilePictureUrl || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set preview image
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    // Upload image
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        profilePictureUrl: imageUrl,
      }));
      setIsUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(true);

    // Simulasi pengiriman data ke server
    try {
      console.log("Submitting profile data:", formData);
      // Tambahkan logika untuk mengirim data ke server di sini
      alert("Profile updated successfully!");
      await refreshUserData(); // Refresh data pengguna setelah berhasil diperbarui
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>

        <div className="mb-8">
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">
                Profile picture preview will appear here
              </span>
            )}
          </div>
          {isUploading && (
            <div className="text-sm text-blue-500 mt-2">
              Uploading image... {uploadProgress}%
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Upload Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-600
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-medium
      file:bg-blue-50 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <ActionButton
              type="submit"
              label={isEditing ? "Submitting..." : "Submit"}
              color="info"
              className="px-6 py-2"
              disabled={isEditing || isUploading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
