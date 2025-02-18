import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const base_url = "https://travel-journal-api-bootcamp.do.dibimbing.id";

const DetailCategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/v1/activities-by-category/${categoryId}`,
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
            },
          }
        );
        setCategoryDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  if (!categoryDetails || categoryDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 mb-4 mx-auto border rounded-lg bg-stone-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold font-poppins">
          {categoryDetails[0].category.name}
        </h1>
        <img
          src={categoryDetails[0].category.imageUrl}
          alt={categoryDetails[0].category.name}
          className="h-16 w-16 object-cover rounded-full"
        />
      </div>
      {categoryDetails.map((item) => (
        <div key={item.id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <img
            src={item.imageUrls[0]}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700 mb-2">{item.description}</p>
          <p className="text-gray-700 mb-2">
            <strong>Price:</strong> IDR {item.price}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Discount Price:</strong> IDR {item.price_discount}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Rating:</strong> {item.rating}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Total Reviews:</strong> {item.total_reviews}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Facilities:</strong> {item.facilities}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Address:</strong> {item.address}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Province:</strong> {item.province}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>City:</strong> {item.city}
          </p>
          <div
            className="text-gray-700 mb-2"
            dangerouslySetInnerHTML={{ __html: item.location_maps }}
          />
        </div>
      ))}
    </div>
  );
};

export default DetailCategoryPage;
