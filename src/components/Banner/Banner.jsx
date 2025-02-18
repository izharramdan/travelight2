import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${base_url}/api/v1/banners`, {
        headers: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      });
      setBanners(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="w-11/12 mx-auto border rounded-lg">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {banners.map((banner) => (
          <div key={banner.id} className="relative">
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
              <h2 className="text-lg font-bold font-poppins">{banner.name}</h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
