import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import ActionButton from "../../../components/Dashboard/components/ActionButton";
import useUploadImage from "../../../hooks/useUploadImage";
import usePromoById from "../../../components/Views/Dashboard/hooks/promo/usePromoById";
import useEditPromo from "../../../components/Views/Dashboard/hooks/promo/useEditPromo";
import { useParams, useNavigate } from "react-router-dom";

const EditPromo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
  });
  const { promoId } = useParams();
  const navigate = useNavigate();
  const { promo, isLoading: isFetching } = usePromoById(promoId);
  const { editPromo, isLoading: isEditing } = useEditPromo();
  const [previewImage, setPreviewImage] = useState(null);

  const { uploadImage, uploadProgress } = useUploadImage();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (promo) {
      setFormData({
        title: promo.title,
        description: promo.description,
        imageUrl: promo.imageUrl,
        terms_condition: promo.terms_condition,
        promo_code: promo.promo_code,
        promo_discount_price: promo.promo_discount_price,
        minimum_claim_price: promo.minimum_claim_price,
      });
      setPreviewImage(promo.imageUrl);
    }
  }, [promo]);

  const formatToIDR = (value) => {
    if (!value) return ""; // Jika nilai null atau undefined, kembalikan string kosong
    const numericValue =
      typeof value === "string" ? value.replace(/\D/g, "") : value.toString(); // Pastikan nilai berupa string
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "promo_discount_price" || name === "minimum_claim_price") {
      // Hanya simpan angka di state
      const numericValue = value.replace(/\D/g, ""); // Hapus karakter non-angka
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue, // Simpan angka murni
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

    const success = await editPromo({
      promoId,
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl,
      terms_condition: formData.terms_condition,
      promo_code: formData.promo_code,
      promo_discount_price: parseInt(formData.promo_discount_price, 10),
      minimum_claim_price: parseInt(formData.minimum_claim_price, 10),
    });

    if (success) {
      navigate("/dashboard/promo");
    }
  };

  if (isFetching) {
    return <div>Loading promo data...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Promo</h1>

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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="col-span-1">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Promo Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter promo title"
              className="w-full"
            />
          </div>

          {/* Promo Code */}
          <div className="col-span-1">
            <label
              htmlFor="promo_code"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Promo Code
            </label>
            <Input
              type="text"
              id="promo_code"
              name="promo_code"
              value={formData.promo_code}
              onChange={handleInputChange}
              placeholder="Enter promo code"
              className="w-full"
            />
          </div>

          {/* Promo Discount Price */}
          <div className="col-span-1">
            <label
              htmlFor="promo_discount_price"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Promo Discount Price
            </label>
            <Input
              type="text"
              id="promo_discount_price"
              name="promo_discount_price"
              value={formatToIDR(formData.promo_discount_price)}
              onChange={handleInputChange}
              placeholder="Enter promo discount price"
              className="w-full"
            />
          </div>

          {/* Minimum Claim Price */}
          <div className="col-span-1">
            <label
              htmlFor="minimum_claim_price"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Minimum Claim Price
            </label>
            <Input
              type="text"
              id="minimum_claim_price"
              name="minimum_claim_price"
              value={formatToIDR(formData.minimum_claim_price)}
              onChange={handleInputChange}
              placeholder="Enter minimum claim price"
              className="w-full"
            />
          </div>

          {/* Promo Description */}
          <div className="col-span-1">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Promo Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter promo description"
              className="w-full h-32"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="col-span-1">
            <label
              htmlFor="terms_condition"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Terms and Conditions
            </label>
            <Textarea
              id="terms_condition"
              name="terms_condition"
              value={formData.terms_condition}
              onChange={handleInputChange}
              placeholder="Enter terms and conditions"
              className="w-full h-32"
            />
          </div>

          {/* Image Upload (full width) */}
          <div className="col-span-2">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Upload Promo Image
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
      file:text-sm file:font-medium
      file:bg-blue-50 hover:file:bg-blue-100"
            />
          </div>

          {/* Submit Button (full width, aligned right) */}
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

export default EditPromo;
