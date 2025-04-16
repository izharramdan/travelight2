import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import useActivity from "../../components/Views/Home/hooks/useActivity";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const { activities, loading, error } = useActivity();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h5" className="text-gray-500">
          Loading activities...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h5" className="text-red-500">
          Failed to load activities. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-16">
      <Typography type="h1" className="mb-10 text-gray-900 tracking-wide">
        Activities
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="relative flex flex-col h-full cursor-pointer overflow-hidden group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
            onClick={() => navigate(`/activity/${activity.id}`)}
          >
            {/* Image */}
            <div
              className="h-48 bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${activity.imageUrls[0]})` }}
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <Typography variant="h5" className="mb-2">
                {activity.title}
              </Typography>

              {/* <Typography className="text-gray-600 flex-grow mb-4">
                {activity.description}
              </Typography> */}

              <div className="flex items-center justify-between mb-3">
                <Typography variant="h6" className="text-green-600">
                  Rp {activity.price.toLocaleString("id-ID")}
                </Typography>
                <Button
                 
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/activity/${activity.id}`);
                  }}
                >
                  View Activity
                </Button>
                <Button
                  
                  fullWidth
                  color="secondary"
                  onClick={(e) => e.stopPropagation()}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Activity;
