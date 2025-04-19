import React, { useState } from "react";
import usePromo from "./hooks/usePromo";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DetailPromoModal from "../../../pages/Promo/DetailPromoModal";

function CustomNavigation() {
  const swiper = useSwiper();
  return (
    <>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slidePrev()}
        className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
      </IconButton>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowRight className="h-7 w-7 translate-x-px stroke-2" />
      </IconButton>
    </>
  );
}

const PromoSection = () => {
  const { promos, loading, error } = usePromo();
  const [selectedPromo, setSelectedPromo] = useState(null);

  const handleCardClick = (promo) => {
    setSelectedPromo(promo);
  };

  const handleCloseModal = () => {
    setSelectedPromo(null);
  };

  const truncateDescription = (description) => {
    return description.length > 30
      ? description.substring(0, 30) + "..."
      : description;
  };

  return (
    <div className="mt-10 mx-auto container w-11/12">
      <div className="text-center mb-6">
        <Typography
          variant="h2"
          className="text-4xl font-extrabold text-gray-800 italic"
        >
          Discover Hot Deals 🔥
        </Typography>
        <Typography className="text-gray-700 text-md mt-2 italic">
          Get the best travel experiences with special discounts you can’t miss.
        </Typography>
      </div>

      <div
        className="relative rounded-2xl p-6 shadow-xl overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1974&auto=format&fit=crop)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 md:p-10">
          {loading && <div className="text-white">Loading...</div>}
          {error && <div className="text-red-500">{error.message}</div>}

          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {promos.map((promo) => (
              <SwiperSlide key={promo.id} className="select-none">
                <Card
                  onClick={() => handleCardClick(promo)}
                  className="relative overflow-hidden backdrop-blur-xl transition-transform hover:scale-105 duration-300 ease-in-out bg-white/10 border border-white/30 shadow-xl cursor-pointer"
                >
                  <div
                    className="h-52 w-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${promo.imageUrl})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                  <div className="p-4 space-y-2 text-white">
                    <Typography variant="h6" className="font-bold text-lg">
                      {promo.title}
                    </Typography>
                    <Typography className="italic text-sm text-white/80">
                      {truncateDescription(promo.description)}
                    </Typography>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
            <CustomNavigation />
          </Swiper>
        </div>
      </div>

      {selectedPromo && (
        <DetailPromoModal onClose={handleCloseModal} promo={selectedPromo} />
      )}
    </div>
  );
};

export default PromoSection;
