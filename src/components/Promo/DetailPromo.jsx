import React, { useEffect, useState } from "react";
import axios from "axios";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";

const DetailPromo = ({ promoId, isOpen, onClose }) => {
  const [promo, setPromo] = useState(null);

  const fetchPromoDetails = async () => {
    try {
      const response = await axios.get(`${base_url}/api/v1/promo/${promoId}`, {
        headers: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      });
      setPromo(response.data.data);
    } catch (error) {
      console.error("Error fetching promo details:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPromoDetails();
    }
  }, [isOpen, promoId]);

  if (!isOpen || !promo) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{promo.title}</h2>
        <img
          src={promo.imageUrl}
          alt={promo.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4">{promo.description}</p>
        <div
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: promo.terms_condition }}
        />
        <p className="text-gray-700 mb-4">
          <strong>Promo Code:</strong> {promo.promo_code}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Discount Price:</strong> IDR {promo.promo_discount_price}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Minimum Claim Price:</strong> IDR {promo.minimum_claim_price}
        </p>
      </div>
    </div>
  );
};

export default DetailPromo;
