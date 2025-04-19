import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import usePromo from "../../components/Views/Home/hooks/usePromo";
import DetailPromoModal from "./DetailPromoModal";

const Promo = () => {
  const { promos, loading, error } = usePromo();
  const [selectedPromo, setSelectedPromo] = useState(null);

  const handleCardClick = (promo) => {
    setSelectedPromo(promo);
  };

  const handleCloseModal = () => {
    setSelectedPromo(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h5" className="text-gray-500">
          Loading promos...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h5" className="text-red-500">
          Failed to load promos. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 lg:px-16">
      <Typography
        type="h3"
        className="mb-10 text-gray-900 tracking-wide"
      >
        Promo
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {promos.map((promo) => (
          <Card
            key={promo.id}
            className="relative flex flex-col h-full cursor-pointer overflow-hidden group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
            onClick={() => handleCardClick(promo)}
          >
            {/* Gambar dengan overlay & zoom effect */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            </div>

            {/* Konten */}
            <div className="p-6 flex flex-col flex-grow bg-white backdrop-blur-md bg-opacity-80 z-20">
              <Typography
                variant="h5"
                className="mb-2 font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300"
              >
                {promo.title}
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {promo.description}
              </Typography>
            </div>
          </Card>
        ))}
      </div>

      {selectedPromo && (
        <DetailPromoModal onClose={handleCloseModal} promo={selectedPromo} />
      )}
    </div>
  );
};

export default Promo;
