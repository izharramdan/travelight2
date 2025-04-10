import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import useCategory from "../../components/Views/Home/hooks/useCategory";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { categories, loading, error } = useCategory();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-8 px-16">
      <Typography variant="h2" className="text-center mb-8">
        Categories
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="relative flex flex-col h-full cursor-pointer"
            onClick={() => navigate(`/category/${category.id}`)}
          >
            <div
              className="h-48 bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${category.imageUrl})` }}
            />
            <div className="p-4 flex flex-col flex-grow">
              <Typography variant="h5" className="mb-2">
                {category.name}
              </Typography>
              <Typography className="flex-grow">
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
