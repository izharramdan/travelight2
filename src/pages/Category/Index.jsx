import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import useCategory from "../../components/Views/Home/hooks/useCategory";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { categories, loading, error } = useCategory();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h5" className="text-gray-500">
          Loading categories...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h5" className="text-red-500">
          Failed to load categories. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4 lg:px-16">
      <Typography
        type="h3"
        className="mb-10 text-gray-900 tracking-wide"
      >
        Explore Categories
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="relative flex flex-col h-full cursor-pointer overflow-hidden group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            {/* Gambar dengan overlay & zoom effect */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            </div>

            {/* Konten */}
            <div className="p-6 flex flex-col flex-grow bg-white backdrop-blur-md bg-opacity-80 z-20">
              <Typography
                variant="h5"
                className="mb-2 font-bold text-gray-800 group-hover:text-blue-600 transition-all duration-300"
              >
                {category.name}
              </Typography>
              <Typography className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {category.description}
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Category;
