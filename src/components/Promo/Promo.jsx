import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState(null);
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
      console.log(error);
    }
  };

  useEffect(() => {
   fetchPromos();
  }, []);

  const handleOpenDetail = (promo) => {
    setSelectedPromo(promo);
  };

  const handleCloseDetail = () => {
    setSelectedPromo(null);
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
            onClick={() => handleOpenDetail(promo)}
          >
            <img
              className="h-auto w-full object-cover object-center"
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
            </div>
          </div>
        ))}
      </div>
      {selectedPromo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseDetail}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedPromo.title}</h2>
            <img
              src={selectedPromo.imageUrl}
              alt={selectedPromo.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedPromo.description}</p>
            <div
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{
                __html: selectedPromo.terms_condition,
              }}
            />
            <p className="text-gray-700 mb-4">
              <strong>Promo Code:</strong> {selectedPromo.promo_code}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Discount Price:</strong> IDR{" "}
              {selectedPromo.promo_discount_price}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Minimum Claim Price:</strong> IDR{" "}
              {selectedPromo.minimum_claim_price}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promo;
