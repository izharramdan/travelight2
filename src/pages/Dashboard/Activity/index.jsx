import React from "react";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import Pagination from "../../../components/Dashboard/components/Pagination";
import { Spinner, Typography } from "@material-tailwind/react";
import SearchBar from "../../../components/Dashboard/components/DashboardSearchBar";
import useActivityDashboard from "../../../components/Views/Dashboard/hooks/activity/useActivityDashboard";
import CardDashboard from "../../../components/Dashboard/components/CardDashboard";

const DashboardActivities = () => {
  const { activities, isLoading } = useActivityDashboard();

  const {
    search,
    setSearch,
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useTableData(activities, 8); // Show 8 activities per page

  const handleEdit = (id) => {
    console.log("Edit activity with ID:", id);
    // Tambahkan logika untuk mengedit aktivitas
  };

  const handleDelete = (id) => {
    console.log("Delete activity with ID:", id);
    // Tambahkan logika untuk menghapus aktivitas
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Activity</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activity"
        />
      </div>

      {/* Grid Layout for Activities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentData.map((activity) => (
          <CardDashboard
            key={activity.id}
            imageUrl={
              activity.imageUrls &&
              activity.imageUrls.length > 0 &&
              activity.imageUrls[0].trim() !== ""
                ? activity.imageUrls[0]
                : "https://www.hiphopshakespeare.com/wp-content/uploads/2013/11/dummy-image-landscape-1024x585.jpg"
            }
            title={activity.title}
            onEdit={() => handleEdit(activity.id)}
            onDelete={() => handleDelete(activity.id)}
          >
            <div className="space-y-2">
              <Typography className="text-sm text-gray-600">
                City: <span className="font-semibold">{activity.city}</span>
              </Typography>

              <Typography className="text-sm text-gray-600">
                Rating:{" "}
                <span className="font-semibold">{activity.rating} / 10</span> (
                {activity.total_reviews} reviews)
              </Typography>
            </div>
          </CardDashboard>
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

export default DashboardActivities;
