import React from "react";
import useActivity from "./hooks/useActivity";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NavArrowRight, NavArrowLeft, MapPin, Star, Building, Dollar } from "iconoir-react";
import { useNavigate } from "react-router-dom";
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

const ActivitySection = () => {
  const { activities, loading, error } = useActivity();
  const navigate = useNavigate();
  return (
    <div className="mt-4 mx-auto container w-11/12">
      <div className="mb-2">
        <div className="mb-2 flex justify-between items-center">
          <Typography type="h3" className="text-gray-800">
            Activity
          </Typography>
          <Typography
            type="h5"
            className="text-gray-800 italic cursor-pointer"
            onClick={() => navigate("/activity")}
          >
            see more
          </Typography>
        </div>
      </div>
      <div
        className="relative bg-green-200 rounded-xl p-2 shadow-lg w-full mx-auto"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      >
        <div className="flex flex-col md:flex-row rounded-base">
          <div className="px-auto w-full">
            {loading && <div>Loading...</div>}
            {error && <div>{error.message}</div>}
            <Swiper
              modules={[Navigation]}
              slidesPerView={5}
              spaceBetween={30}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {activities.map((activity) => (
                <SwiperSlide key={activity.id} className="select-none">
                  <Card
                    className="relative flex h-[20rem] w-full max-w-[28rem] flex-col cursor-pointer"
                    onClick={() => navigate(`/activity/${activity.id}`)}
                  >
                    <Card.Header className="h-4/5">
                      <div
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${activity.imageUrls[0]})`,
                        }}
                      >
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/60 via-black/30 to-black/5 dark:from-black/70 dark:via-black/60 dark:to-black/20" />
                      </div>
                    </Card.Header>
                    <Card.Body className="flex z-10">
                      <Typography
                        type="lead"
                        className="text-white font-semibold"
                      >
                        {activity.title}
                      </Typography>
                    </Card.Body>
                    <Card.Footer className="h-2/5 w-full bg-gray-900 bg-opacity-50 z-10 rounded-xl">
                    <MapPin className="h-5 w-5 text-gray-500" />
                      <Typography type="lead" className="text-white italic">
                        {activity.city}
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

export default ActivitySection;
