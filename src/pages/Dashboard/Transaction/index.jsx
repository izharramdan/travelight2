import React from "react";
import useAllTransaction from "../../../components/Views/Dashboard/hooks/transaction/useAllTransaction";
import useTableData from "../../../components/Views/Dashboard/hooks/useTableData";
import ReusableTable from "../../../components/Dashboard/components/ReusableTable";
import TransactionStatus from "../../../components/Views/Home/transaction/TransactionStatus";
import Pagination from "../../../components/Dashboard/components/Pagination";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "@material-tailwind/react";
import useAllUser from "../../../components/Views/Dashboard/hooks/user/useAllUser";

const AllTransaction = () => {
  const { transactions, isLoading } = useAllTransaction();
  const { users } = useAllUser();
  const navigate = useNavigate();

  // Menggunakan useTableData untuk logika filtering, sorting, dan pagination
  const {
    search,
    setSearch,
    currentData: currentTransactions,
    totalPages,
    currentPage,
    setCurrentPage,
    handleSort,
    sortConfig,
  } = useTableData(transactions, 10);

  // Definisi kolom untuk ReusableTable
  const columns = [
    {
      key: "invoiceId",
      label: "Invoice ID",
      sortable: true,
    },
    {
      key: "userId",
      label: "User",
      sortable: true,
      render: (row) => {
        const user = users.find((user) => user.id === row.userId);
        return user ? (
          <div className="flex items-center gap-3">
            <img
              src={
                user.profilePictureUrl ||
                "https://img.freepik.com/free-vector/man-profile-account-picture_24908-81754.jpg?t=st=1745291107~exp=1745294707~hmac=cf9ac9989ac147e1227dceb140b56d30c543853c13f2bfacc8c0b7582130a8ff&w=826"
              }
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span>{user.name}</span>
          </div>
        ) : (
          "Unknown User"
        );
      },
    },
    {
      key: "payment_method",
      label: "Payment Method",
      render: (row) => (
        <img
          src={row.payment_method.imageUrl}
          alt="Payment Method"
          className="h-10 w-10 object-contain"
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row) => <TransactionStatus status={row.status} />,
    },
    {
      key: "totalAmount",
      label: "Total Amount",
      sortable: true,
      render: (row) => `Rp ${row.totalAmount.toLocaleString("id-ID")}`,
    },
    {
      key: "orderDate",
      label: "Order Date",
      render: (row) => new Date(row.orderDate).toLocaleDateString("id-ID"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => {
        const href = `/dashboard/transaction/${row.id}`; // Definisikan href
        return (
          <a
            href={href} // Tetap gunakan href untuk fallback
            onClick={(e) => {
              navigate(href); // Navigasi menggunakan useNavigate
            }}
            className="text-blue-500 hover:underline"
          >
            <Button>View Detail</Button>
          </a>
        );
      },
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
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Transactions</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Invoice ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>

      {/* Reusable Table */}
      <ReusableTable
        columns={columns}
        data={currentTransactions}
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

export default AllTransaction;
