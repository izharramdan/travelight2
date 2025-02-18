import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DetailPromo from "./DetailPromo";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const navigate = useNavigate();

  const fetchPromos = async () => {
    try {
      const response = await axios.get(`${base_url}/api/v1/promos`, {
        headers: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      });
      setPromos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  const handleOpenDetail = (promoId) => {
    setSelectedPromoId(promoId);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedPromoId(null);
  };

  return (
    <div className="w-11/12 mb-4 mx-auto border rounded-lg bg-stone-100">
      <div className="flex ml-5 justify-between">
        <h1 className="pt-5 text-2xl font-semibold font-poppins">
          Checkout our Offers
        </h1>
        <a onClick={() => navigate("/promos")}>
          <h1 className="pt-5 text-2 font font-poppins mr-5 cursor-pointer">
            more
          </h1>
        </a>
      </div>
      <div className="flex flex-wrap justify-start mx-auto rounded-lg mb-4">
        {promos.slice(0, 4).map((promo) => (
          <div
            key={promo.id}
            className="mx-auto mt-5 w-80 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 flex flex-col hover:scale-105 hover:shadow-lg"
          >
            <img
              className="h-30 w-full object-cover object-center"
              src={promo.imageUrl}
              alt="Promo Image"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                {promo.title}
              </h2>
              <div className="flex items-center mb-4">
                <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                  IDR {promo.promo_discount_price}
                </p>
                <p className="text-base font-medium text-gray-500 line-through dark:text-gray-300">
                  IDR {(promo.promo_discount_price * 1.1).toFixed(0)}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {promo.promo_code}
                </p>
              </div>
              <div className="mt-auto">
                <button
                  className="w-full mx-auto items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-blue-500 hover:bg-blue-700 relative bg-gradient-to-b from-blue-500 to-blue-700 border-blue-700 text-white rounded-lg hover:bg-gradient-to-b hover:from-blue-700 hover:to-blue-700 hover:border-blue-700 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased lg:ml-auto lg:inline-block"
                  onClick={() => handleOpenDetail(promo.id)}
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DetailPromo
        promoId={selectedPromoId}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Promo;
