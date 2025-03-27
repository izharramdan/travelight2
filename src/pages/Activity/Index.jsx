import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const activities = [
  {
    id: 1,
    title: "Hiking Adventure",
    description: "Explore the mountains with our guided hiking tours.",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
  {
    id: 2,
    title: "City Tour",
    description: "Discover the city's hidden gems with our expert guides.",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
  {
    id: 3,
    title: "Beach Day",
    description: "Relax and enjoy the sun on our beautiful beaches.",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
  {
    id: 3,
    title: "Beach Day",
    description: "Relax and enjoy the sun on our beautiful beaches.",
    imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  },
];

const Activity = () => {
  return (
    <div className="container mx-auto mt-8 px-16">
      <Typography variant="h2" className="text-center mb-8">
        Activities
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <Card key={activity.id} className="relative flex flex-col h-full">
            <div
              className="h-48 bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${activity.imageUrl})` }}
            />
            <div className="p-4 flex flex-col flex-grow">
              <Typography variant="h5" className="mb-2">
                {activity.title}
              </Typography>
              <Typography className="flex-grow">
                {activity.description}
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Activity;
