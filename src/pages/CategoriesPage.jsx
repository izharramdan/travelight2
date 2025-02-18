import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${base_url}/api/v1/categories`, {
        headers: {
          apiKey: import.meta.env.VITE_API_KEY,
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <>
      <div className="w-11/12 mb-4 mx-auto border rounded-lg bg-stone-100">
        <div className="flex ml-5 justify-between">
          <h1 className="pt-5 text-2xl font-semibold font-poppins">
            Explore by Category
          </h1>
        </div>
        <div className="flex flex-wrap justify-start mx-auto rounded-lg mb-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="mx-1 mt-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <img
                className="h-48 w-full object-cover object-center"
                src={category.imageUrl}
                alt="Category Image"
              />
              <div className="p-4">
                <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;