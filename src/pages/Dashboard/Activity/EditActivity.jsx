import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import ActionButton from "../../../components/Dashboard/components/ActionButton";
import useUploadImage from "../../../hooks/useUploadImage";
import useEditActivity from "../../../components/Views/Dashboard/hooks/activity/useEditActivity";
import useCategoryDashboard from "../../../components/Views/Dashboard/hooks/category/useCategoryDashboard";
import useActivityById from "../../../components/Views/Dashboard/hooks/activity/useActivityById";
import { useParams, useNavigate } from "react-router-dom";

const EditActivity = () => {
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [],
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const { uploadImage, uploadProgress } = useUploadImage();
  const { activity, isLoading: isFetching } = useActivityById(activityId);
  const [isUploading, setIsUploading] = useState(false);
  const { categories, isLoading: isFetchingCategories } =
    useCategoryDashboard();
  const { editActivity, isLoading: isEditing } = useEditActivity();

  useEffect(() => {
    if (activity) {
      setFormData({
        categoryId: activity.categoryId,
        title: activity.title,
        description: activity.description,
        imageUrls: activity.imageUrls,
        price: activity.price,
        price_discount: activity.price_discount,
        rating: activity.rating,
        total_reviews: activity.total_reviews,
        facilities: activity.facilities,
        address: activity.address,
        province: activity.province,
        city: activity.city,
        location_maps: activity.location_maps,
      });
      setPreviewImages(activity.imageUrls);
    }
  }, [activity]);

  const formatToIDR = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "price_discount") {
      // Hanya simpan angka di state
      const numericValue = value.replace(/\D/g, ""); // Hapus karakter non-angka
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue, // Simpan angka murni
      }));
    } else if (name === "rating" || name === "total_reviews") {
      const numericValue = value.replace(/\D/g, ""); // Hapus karakter non-angka
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Set preview images
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);

    // Upload images
    try {
      setIsUploading(true);
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadImage(file))
      );
      setFormData((prev) => ({
        ...prev,
        imageUrls: uploadedUrls,
      }));
      setIsUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await editActivity({
      activityId,
      categoryId: formData.categoryId,
      title: formData.title,
      description: formData.description,
      imageUrls: formData.imageUrls,
      price: parseInt(formData.price, 10),
      price_discount: parseInt(formData.price_discount, 10),
      rating: parseFloat(formData.rating),
      total_reviews: parseInt(formData.total_reviews, 10),
      facilities: formData.facilities,
      address: formData.address,
      province: formData.province,
      city: formData.city,
      location_maps: formData.location_maps,
    });

    if (success) {
      navigate("/dashboard/activity");
    }
  };

  if (isFetching) {
    return <div>Loading activity data...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Activity
        </h1>

        <div className="mb-8">
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
            {previewImages.length > 0 ? (
              previewImages.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
              ))
            ) : (
              <span className="text-gray-500 text-sm">
                Image previews will appear here
              </span>
            )}
          </div>
          {isUploading && (
            <div className="text-sm text-blue-500 mt-2">
              Uploading images... {uploadProgress}%
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Category ID */}
          <div className="col-span-1">
            <label
              htmlFor="categoryId"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }));
              }}
              className="w-full border rounded-md px-3 py-2"
              disabled={isFetchingCategories}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="col-span-1">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter activity title"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter activity description"
              className="w-full h-32"
            />
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Price
            </label>
            <Input
              type="text"
              id="price"
              name="price"
              value={formatToIDR(formData.price)}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full"
            />
          </div>

          {/* Price Discount */}
          <div className="col-span-1">
            <label
              htmlFor="price_discount"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Price Discount
            </label>
            <Input
              type="text"
              id="price_discount"
              name="price_discount"
              value={formatToIDR(formData.price_discount)}
              onChange={handleInputChange}
              placeholder="Enter price discount"
              className="w-full"
            />
          </div>

          {/* Rating */}
          <div className="col-span-1">
            <label
              htmlFor="rating"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Rating
            </label>
            <Input
              type="text"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              placeholder="Enter rating"
              className="w-full"
            />
          </div>

          {/* Total Reviews */}
          <div className="col-span-1">
            <label
              htmlFor="total_reviews"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Total Reviews
            </label>
            <Input
              type="text"
              id="total_reviews"
              name="total_reviews"
              value={formData.total_reviews}
              onChange={handleInputChange}
              placeholder="Enter total reviews"
              className="w-full"
            />
          </div>

          {/* Facilities */}
          <div className="col-span-2">
            <label
              htmlFor="facilities"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Facilities
            </label>
            <Textarea
              id="facilities"
              name="facilities"
              value={formData.facilities}
              onChange={handleInputChange}
              placeholder="Enter facilities"
              className="w-full h-32"
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Address
            </label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="w-full h-32"
            />
          </div>

          {/* Province */}
          <div className="col-span-1">
            <label
              htmlFor="province"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Province
            </label>
            <Input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              placeholder="Enter province"
              className="w-full"
            />
          </div>

          {/* City */}
          <div className="col-span-1">
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              City
            </label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              className="w-full"
            />
          </div>

          {/* Location Maps */}
          <div className="col-span-2">
            <label
              htmlFor="location_maps"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Location Maps
            </label>
            <Textarea
              id="location_maps"
              name="location_maps"
              value={formData.location_maps}
              onChange={handleInputChange}
              placeholder="Enter location maps embed code"
              className="w-full h-32"
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Upload Activity Images
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-right">
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

export default EditActivity;
