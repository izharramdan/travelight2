import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import useCategory from "../../components/Views/Home/hooks/useCategory";

const Category = () => {
  const { categories, loading, error } = useCategory();
  return (
    <div className="container mx-auto mt-8 px-16">
      <Typography variant="h2" className="text-center mb-8">
        categories
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Card key={category.id} className="relative flex flex-col h-full">
            <div
              className="h-48 bg-cover bg-center rounded-t-lg"
              style={{ backgroundImage: `url(${category.imageUrl})` }}
            />
            <div className="p-4 flex flex-col flex-grow">
              <Typography variant="h5" className="mb-2">
                {category.title}
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
