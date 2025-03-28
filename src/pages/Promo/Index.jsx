import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import usePromo from "../../components/Views/Home/hooks/usePromo";

const Promo = () => {
  const { promos, loading, error } = usePromo();
  return (
    <div className="container mx-auto mt-8 px-16">
      <Typography variant="h2" className="text-center mb-8">
        promos
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promos.map((promo) => (
          <Card key={promo.id} className="relative flex flex-col h-full">
            <div
              className="h-48 bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${promo.imageUrl})` }}
            />
            <div className="p-4 flex flex-col flex-grow">
              <Typography variant="h5" className="mb-2">
                {promo.title}
              </Typography>
              <Typography className="flex-grow">
                {promo.description}
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Promo;
