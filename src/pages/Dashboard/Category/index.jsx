import React from "react";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import Pagination from "../../../components/Dashboard/components/Pagination";
import { Spinner } from "@material-tailwind/react";
import SearchBar from "../../../components/Dashboard/components/DashboardSearchBar";
import useCategoryDashboard from "../../../components/Views/Dashboard/hooks/category/useCategoryDashboard";
import CardDashboard from "../../../components/Dashboard/components/CardDashboard";
import AddButton from "../../../components/Dashboard/components/AddButton";
import { useNavigate } from "react-router-dom";

const DashboardCategories = () => {
  const navigate = useNavigate();
  const { categories, isLoading } = useCategoryDashboard();

  const {
    search,
    setSearch,
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useTableData(categories, 8); // Show 8 categories per page

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-category/${id}`);
    // Tambahkan logika untuk mengedit kategori
  };

  const handleDelete = (id) => {
    console.log("Delete category with ID:", id);
    // Tambahkan logika untuk menghapus kategori
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category</h1>
        <AddButton
          className="bg-blue-500 text-white"
          onClick={() => navigate("/dashboard/add-category")}
        >
          Add Category
        </AddButton>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search category"
        />
      </div>

      {/* Grid Layout for Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentData.map((category) => (
          <CardDashboard
            key={category.id}
            imageUrl={category.imageUrl}
            title={category.name}
            onEdit={() => handleEdit(category.id)}
            onDelete={() => handleDelete(category.id)}
          />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-8 px-1">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default DashboardCategories;
