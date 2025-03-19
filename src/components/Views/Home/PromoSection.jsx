import React from "react";
import usePromo from "./hooks/usePromo";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const truncateDescription = (description) => {
    return description.length > 20
      ? description.substring(0, 20) + "..."
      : description;
  };

  return (
    <div className="mt-4 mx-auto container w-11/12">
      <div className="mb-2">
        <Typography type="h3" className="text-gray-800">
          <span className="text-3xl italic text-yellow-500 font-bold">%</span>{" "}
          Promo
        </Typography>
      </div>
      <div
        className="relative bg-green-200 rounded-xl p-6 shadow-lg w-full mx-auto"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row p-5 rounded-base">
          <div className="md:w-1/3 w-full justify-center flex flex-col gap-2">
            <Typography
              type="h3"
              className="tracking-tight"
              style={{ color: "white" }}
            >
              Our Exclusive Offers
            </Typography>
            <Typography className="italic" style={{ color: "white" }}>
              Book your perfect getaway with special discounts!
            </Typography>
          </div>
          <div className="px-10 md:w-2/3 w-full">
            {loading && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            <Swiper
              pagination={{
                enabled: true,
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Navigation]}
              slidesPerView={3}
              spaceBetween={30}
              className="relative rounded-lg"
            >
              {promos.map((promo) => (
                <SwiperSlide key={promo.id} className="select-none">
                  <Card className="relative flex h-[20rem] w-full max-w-[28rem] flex-col">
                    <Card.Header className="h-4/5">
                      <div
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                        style={{ backgroundImage: `url(${promo.imageUrl})` }}
                      >
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/60 via-black/30 to-black/5 dark:from-black/70 dark:via-black/60 dark:to-black/20" />
                      </div>
                    </Card.Header>
                    <Card.Body className="flex z-10">
                      <Typography
                        type="lead"
                        className="text-white italic"
                      >
                        {truncateDescription(promo.description)}
                      </Typography>
                    </Card.Body>
                    <Card.Footer className="h-2/5 w-full bg-gray-900 bg-opacity-50 z-10 rounded-xl">
                      <Typography
                        type="lead"
                        className="text-white font-semibold"
                      >
                        {promo.title}
                      </Typography>
                    </Card.Footer>
                  </Card>
                </SwiperSlide>
              ))}
              <CustomNavigation />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
