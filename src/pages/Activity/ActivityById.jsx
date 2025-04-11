import React from "react";
import { useParams } from "react-router-dom";
import useActivityId from "../../hooks/useActivityId";
import { Card, Typography, Button, Badge } from "@material-tailwind/react";
import { MapPin, Star, Building, Dollar } from "iconoir-react";
import { useNavigate } from "react-router-dom";

const ActivityById = () => {
  const { activity } = useParams(); // Ambil ID aktivitas dari URL
  const { data, isLoading, error } = useActivityId(activity);
  const navigate = useNavigate();

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-gray-500">🔄</div>
        <span className="ml-2 text-gray-600">Loading activity details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {data && (
        <>
          {/* Header Section */}
          <div className="mb-8">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <img
                src={data.imageUrls[0]}
                alt={data.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400/png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <Badge className="mb-4" variant="gradient">
                  {data.category.name}
                </Badge>
                <Typography variant="h2" className="text-white font-bold">
                  {data.title}
                </Typography>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <Card className="p-6">
                <Typography variant="h4" className="font-semibold mb-4">
                  Description
                </Typography>
                <Typography className="text-gray-600 leading-relaxed">
                  {data.description}
                </Typography>
              </Card>

              {/* Facilities */}
              <Card className="p-6">
                <Typography variant="h4" className="font-semibold mb-4">
                  Facilities
                </Typography>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={createMarkup(data.facilities)}
                />
              </Card>

              {/* Location */}
              <Card className="p-6">
                <Typography variant="h4" className="font-semibold mb-4">
                  Location
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                    <Typography className="text-gray-600">
                      {data.address}
                    </Typography>
                  </div>
                  <div
                    className="w-full rounded-xl overflow-hidden"
                    dangerouslySetInnerHTML={createMarkup(data.location_maps)}
                  />
                </div>
              </Card>
            </div>

            {/* Right Section */}
            <div className="md:col-span-1">
              <Card className="p-6 sticky top-24">
                <Typography
                  variant="h5"
                  className="font-semibold text-lg mb-4"
                >
                  Quick Information
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-gray-500" />
                    <div>
                      <Typography className="font-medium">Category</Typography>
                      <Typography className="text-gray-600">
                        {data.category.name}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <Typography className="font-medium">Location</Typography>
                      <Typography className="text-gray-600">
                        {data.city}, {data.province}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-gray-500" />
                    <div>
                      <Typography className="font-medium">Rating</Typography>
                      <Typography className="text-gray-600">
                        {data.rating} / 5
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Dollar className="h-5 w-5 text-gray-500" />
                    <div>
                      <Typography className="font-medium">Price</Typography>
                      <Typography className="text-gray-600">
                        Rp {data.price.toLocaleString("id-ID")}
                      </Typography>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6">Add to Cart</Button>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityById;