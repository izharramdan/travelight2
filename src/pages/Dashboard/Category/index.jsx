import React from "react";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import ReusableTable from "../../../components/Dashboard/components/ReusableTable";
import Pagination from "../../../components/Dashboard/components/Pagination";
import { Button, Spinner } from "@material-tailwind/react";
import SearchBar from "../../../components/Dashboard/components/DashboardSearchBar";
import useCategoryDashboard from "../../../components/Views/Dashboard/hooks/promo/usePromoDashboard";

const DashboardCategories = () => {
  const { categories, isLoading } = useCategoryDashboard();

  const {
    search,
    setSearch,
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
    handleSort,
    sortConfig,
  } = useTableData(categories, 10);

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      sortable: true,
      render: (row) => (
        <img
          src={row.imageUrl}
          alt={row.name}
          className="h-24 w-36 rounded-lg object-cover border border-gray-200"
        />
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      className: "font-medium text-gray-800",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div>
          <Button
            size="sm"
            color="blue"
            className="rounded-md px-4 py-1 text-sm font-semibold"
          >
            Edit
          </Button>
          <Button
            size="sm"
            color="blue"
            className="rounded-md px-4 py-1 text-sm font-semibold"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-16 w-16 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Promo</h1>

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search promo"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <ReusableTable
          columns={columns}
          data={currentData}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>

      <div className="flex justify-between items-center mt-6 px-1">
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
