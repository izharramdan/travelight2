import React, { useState } from "react";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import ReusableTable from "../../../components/Dashboard/components/ReusableTable";
import Pagination from "../../../components/Dashboard/components/Pagination";
import useAllUser from "../../../components/Views/Dashboard/hooks/user/useAllUser";
import useUpdateRole from "../../../components/Views/Dashboard/hooks/user/useUpdateRole";
import { Button, Spinner } from "@material-tailwind/react";

const AllUsers = () => {
  const { users, isLoading } = useAllUser();
  const [selectedRoles, setSelectedRoles] = useState({});
  const { updateRole, isLoading: isUpdating } = useUpdateRole();

  const handleUpdateRole = async (id, role) => {
    const data = { role: role };
    const success = await updateRole(id, data);
    if (success) {
      setSelectedRoles((prev) => ({ ...prev, [id]: role }));
    }
  };

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
      render: (row) => (
        <select
          value={selectedRoles[row.id] || row.role}
          onChange={(e) =>
            setSelectedRoles((prev) => ({
              ...prev,
              [row.id]: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-lg p-1"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <Button onClick={() => handleUpdateRole(row.id, selectedRoles[row.id])}>
          Update Role
        </Button>
      ),
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
