import React from "react";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import ReusableTable from "../../../components/Dashboard/components/ReusableTable";
import Pagination from "../../../components/Dashboard/components/Pagination";
import useAllUser from "../../../components/Views/Dashboard/hooks/user/useAllUser";
import { Button, Spinner, Chip } from "@material-tailwind/react";

const AllUsers = () => {
  const { users, isLoading } = useAllUser();

  const {
    search,
    setSearch,
    currentData,
    totalPages,
    currentPage,
    setCurrentPage,
    handleSort,
    sortConfig,
  } = useTableData(users, 10);

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePictureUrl}
            alt={row.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      render: (row) =>
        row.role === "admin" ? (
          <Chip color="info" isPill={false} variant="ghost">
            <Chip.Label>Admin</Chip.Label>
          </Chip>
        ) : row.role === "user" ? (
          <Chip color="warning" isPill={false} variant="ghost">
            <Chip.Label>User</Chip.Label>
          </Chip>
        ) : (
          row.role
        ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => <Button>Edit</Button>,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-16 w-16" />;
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Users</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      {/* Reusable Table */}
      <ReusableTable
        columns={columns}
        data={currentData}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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

export default AllUsers;
