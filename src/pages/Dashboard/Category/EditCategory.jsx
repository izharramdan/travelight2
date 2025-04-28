import React, { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";
import ActionButton from "../../../components/Dashboard/components/ActionButton";
import useEditCategory from "../../../components/Views/Dashboard/hooks/category/useEditCategory";
import useUploadImage from "../../../hooks/useUploadImage";
import { useParams, useNavigate } from "react-router-dom";
import useCategoryById from "../../../components/Views/Dashboard/hooks/category/useCategoryById";

const EditCategory = () => {
  const { categoryId } = useParams(); // Ambil bannerId category dari URL
  const navigate = useNavigate();
  const { category, isLoading: isFetching } = useCategoryById(categoryId); // Ambil data category berdasarkan bannerId
  const { editCategory, isLoading: isEditing } = useEditCategory();
  const { uploadImage, uploadProgress } = useUploadImage();
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  // Set data category ke formData saat data category berhasil diambil
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        imageUrl: category.imageUrl,
      });
      setPreviewImage(category.imageUrl); // Set preview image dari data existing
    }
  }, [category]);

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
        imageUrl,
      }));
      setIsUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.name || !formData.imageUrl) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    // Panggil fungsi editBanner dari useEditBanner
    const success = await editCategory({
      categoryId,
      name: formData.name,
      imageUrl: formData.imageUrl,
    });

    if (success) {
      // Redirect ke halaman category setelah berhasil
      navigate("/dashboard/category");
    }
  };

  if (isFetching) {
    return <div>Loading category data...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Category</h1>

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
          {isUploading && (
            <div className="text-sm text-blue-500 mt-2">
              Uploading image... {uploadProgress}%
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Category Name
            </label>
            <Input
              type="text"
              id="name" // Ganti bannerId dengan id
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              className="w-full"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Upload Category Image
            </label>
            <input
              type="file"
              id="image" // Ganti bannerId dengan id
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 
              hover:file:bg-blue-100"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <ActionButton
              type="submit"
              label={isEditing ? "Saving..." : "Save Changes"}
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

export default EditCategory;
