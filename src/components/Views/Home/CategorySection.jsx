import React from "react";
import useCategory from "./hooks/useCategory";

const CategorySection = () => {
  const { categories, loading, error } = useCategory();
  return <div>CategorySection</div>;
};

export default CategorySection;
