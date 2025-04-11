import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import useActivity from "../../components/Views/Home/hooks/useActivity";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const { activities, loading, error } = useActivity();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-8 px-16">
      <Typography variant="h2" className="text-center mb-8">
        Activities
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="relative flex flex-col h-full cursor-pointer"
            onClick={() => navigate(`/activity/${activity.id}`)}
          >
            <div
              className="h-48 bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${activity.imageUrls[0]})` }}
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
