import React from "react";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import Pagination from "../../../components/Dashboard/components/Pagination";
import { Spinner, Typography, Chip } from "@material-tailwind/react";
import SearchBar from "../../../components/Dashboard/components/DashboardSearchBar";
import usePromoDashboard from "../../../components/Views/Dashboard/hooks/promo/usePromoDashboard";
import CardDashboard from "../../../components/Dashboard/components/CardDashboard";
import AddButton from "../../../components/Dashboard/components/AddButton";
import { useNavigate } from "react-router-dom";

const DashboardPromos = () => {
  const navigate = useNavigate();
  const { promos, isLoading } = usePromoDashboard();

  const {
    search,
    setSearch,
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useTableData(promos, 8); // Show 8 promos per page

  const handleEdit = (id) => {
    console.log("Edit promo with ID:", id);
    // Tambahkan logika untuk mengedit promo
  };

  const handleDelete = (id) => {
    console.log("Delete promo with ID:", id);
    // Tambahkan logika untuk menghapus promo
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
        <Typography type="h5" color="blue-gray" className="font-bold">
          Promo
        </Typography>
        <AddButton
          className="bg-blue-500 text-white"
          onClick={() => navigate("/dashboard/add-promo")}
        >
          Add Promo
        </AddButton>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search promo"
        />
      </div>

      {/* Grid Layout for Promos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentData.map((promo) => (
          <CardDashboard
            key={promo.id}
            imageUrl={promo.imageUrl}
            title={promo.title}
            onEdit={() => handleEdit(promo.id)}
            onDelete={() => handleDelete(promo.id)}
          >
            <div className="space-y-2">
              {/* Promo Badge */}
              <div className="flex justify-start">
                <Chip color="info" size="sm" isPill={false}>
                  <Chip.Label>PROMO CODE</Chip.Label>
                </Chip>
              </div>

              {/* Promo Code */}
              <Typography
                variant="small"
                color="blue"
                className="font-semibold uppercase tracking-wide"
              >
                {promo.promo_code}
              </Typography>

              {/* Discount Price */}
              <div className="flex items-baseline gap-2">
                <Typography variant="h5" color="green" className="font-bold">
                  Rp {promo.promo_discount_price.toLocaleString()}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="line-through text-xs"
                >
                  Rp {promo.minimum_claim_price.toLocaleString()}
                </Typography>
              </div>

              {/* Optional: Description */}
              {/* {promo.description && (
                <Typography
                  variant="small"
                  color="gray"
                  className="text-sm line-clamp-2"
                >
                  {promo.description}
                </Typography>
              )} */}
            </div>
          </CardDashboard>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-8 px-1">
        <Typography variant="small" color="gray">
          Page {currentPage} of {totalPages}
        </Typography>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default DashboardPromos;
