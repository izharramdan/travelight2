import React from "react";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import Pagination from "../../../components/Dashboard/components/Pagination";
import { Spinner } from "@material-tailwind/react";
import SearchBar from "../../../components/Dashboard/components/DashboardSearchBar";
import useBanner from "../../../components/Views/Dashboard/hooks/banner/useBanner";
import AddButton from "../../../components/Dashboard/components/AddButton";
import CardDashboard from "../../../components/Dashboard/components/CardDashboard";
import { useNavigate } from "react-router-dom";

const Banners = () => {
  const navigate = useNavigate();
  const { banners, isLoading } = useBanner();

  const {
    search,
    setSearch,
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useTableData(banners, 8);

  const handleEdit = (id) => {
    console.log("Edit banner with ID:", id);
    // Tambahkan logika untuk mengedit banner
  };

  const handleDelete = (id) => {
    console.log("Delete banner with ID:", id);
    // Tambahkan logika untuk menghapus banner
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
        <h1 className="text-2xl font-bold text-gray-800">Banner</h1>
        <AddButton
          className="bg-blue-500 text-white"
          onClick={() => navigate("/dashboard/add-banner")}
        >
          Add Banner
        </AddButton>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search banner"
        />
      </div>

      {/* Grid Layout for Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentData.map((banner) => (
          <CardDashboard
            key={banner.id}
            imageUrl={banner.imageUrl}
            title={banner.name}
            onEdit={() => navigate(`/dashboard/edit-banner/${banner.id}`)}
            onDelete={() => handleDelete(banner.id)}
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

export default Banners;
