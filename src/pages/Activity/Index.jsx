import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import useActivity from "../../components/Views/Home/hooks/useActivity";
import useAddCart from "../../components/Views/Home/hooks/cart/useAddCart";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const { activities, loading, error } = useActivity();
  const { addToCart, isLoading: isAddingToCart } = useAddCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleAddToCart = (activityId) => {
    if (!user) {
      navigate("/login"); // Arahkan ke halaman login jika belum login
      return;
    }

    addToCart(activityId); // Tambahkan ke keranjang jika sudah login
  };

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
            className="relative flex flex-col h-full overflow-hidden group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 bg-white"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <div
                className="h-full w-full bg-cover bg-center rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${activity.imageUrls[0]})` }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <Typography variant="h5" className="mb-2 font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300">
                {activity.title}
              </Typography>

              <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="text-green-600 font-bold">
                  Rp {activity.price.toLocaleString("id-ID")}
                </Typography>
              </div>

              <div className="flex justify-between gap-2 mt-auto">
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(activity.id)}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/activity/${activity.id}`);
                  }}
                >
                  View Activity
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
