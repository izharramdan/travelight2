import React from "react";
import useCategoryId from "../../hooks/useCategoryId";
import useActivityCategory from "../../hooks/useActivityCategory";
import { Card, Typography, Button } from "@material-tailwind/react";

const CategoryById = () => {
  const { data: category, isLoading: isLoadingCategory, error: errorCategory } =
    useCategoryId();
  const {
    dataActivity,
    isLoadingActivity,
    errorActivity,
  } = useActivityCategory();

  if (isLoadingCategory || isLoadingActivity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (errorCategory || errorActivity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl font-semibold">Oops! Something went wrong</p>
          <p>{errorCategory || errorActivity}</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Category not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-16">
      {/* Header Section */}
      <div className="relative mb-8">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <Typography variant="h2" className="text-white font-bold">
              {category.name}
            </Typography>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div>
        <Typography variant="h4" className="mb-6">
          Activities in {category.name}
        </Typography>
        {dataActivity.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No activities found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataActivity.map((activity) => (
              <Card key={activity.id} className="h-full">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={activity.imageUrls[0]}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-md">
                    <Typography variant="small" className="text-gray-800">
                      Rating: {activity.rating.toFixed(1)}
                    </Typography>
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <Typography variant="h5" className="font-semibold mb-2">
                      {activity.title}
                    </Typography>
                    <Typography variant="small" className="text-gray-600 mb-4">
                      {activity.description}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="h6" className="text-green-600">
                      Rp {activity.price.toLocaleString("id-ID")}
                    </Typography>
                    <Button
                      size="sm"
                      onClick={() =>
                        window.open(activity.location_maps, "_blank")
                      }
                    >
                      View Map
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryById;