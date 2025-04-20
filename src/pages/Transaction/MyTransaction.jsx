import React from "react";
import useMyTransactions from "../../components/Views/Home/hooks/transaction/useMyTransactions";
import { Card, Typography, Button } from "@material-tailwind/react";
import {
  Cart,
  Wallet,
  Clock,
  CheckCircle,
  XmarkCircle,
  Upload,
} from "iconoir-react";
import { useNavigate } from "react-router-dom";

const MyTransaction = () => {
  const { transactions, isLoading } = useMyTransactions();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="text-center py-10 animate-pulse space-y-4">
        <div className="h-8 bg-gray-100 rounded-full w-48 mx-auto"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded-full max-w-[300px] mx-auto"></div>
          <div className="h-4 bg-gray-100 rounded-full max-w-[280px] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl border border-gray-200">
          <div className="mx-auto mb-6 bg-blue-100 p-4 rounded-full w-fit">
            <Wallet className="w-12 h-12 text-blue-600" />
          </div>
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">
            No Transactions Yet
          </Typography>
          <Typography className="text-gray-600 mb-6">
            Your transaction history will appear here once you make your first
            purchase.
          </Typography>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm">
            Start Shopping
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4 lg:px-16">
      {/* Header */}
      <div className="mb-10">
        <Typography type="h3" className="mb-10 text-gray-900 tracking-wide">
          My Transactions
        </Typography>
      </div>

      {/* Transaction List */}
      <div className="grid gap-6">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="group flex flex-col lg:flex-row items-start gap-6 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Left: Icon Section */}
            <div className="flex-shrink-0 bg-blue-100 p-4 rounded-xl">
              <Cart className="w-8 h-8 text-blue-600" />
            </div>

            {/* Middle: Transaction Info */}
            <div className="flex-grow space-y-4 w-full">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Typography variant="h5" className="font-bold text-gray-800">
                  {transaction.invoiceId}
                </Typography>
                <div
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    transaction.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : transaction.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {transaction.status === "pending" && (
                      <Clock className="w-4 h-4" />
                    )}
                    {transaction.status === "success" && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {transaction.status === "cancelled" && (
                      <XmarkCircle className="w-4 h-4" />
                    )}
                    {transaction.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-green-600">
                      Rp {transaction.totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold text-gray-800 flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-blue-600" />
                      <img
                        src={transaction.payment_method.imageUrl}
                        alt={transaction.payment_method.name}
                        className="w-16 h-16 object-contain"
                      />
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-200">
                  <Typography className="text-sm text-gray-600 mb-2">
                    Payment Instructions
                  </Typography>
                  <Typography className="text-sm text-gray-800">
                    Complete payment within 24 hours to avoid cancellation
                  </Typography>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-3 w-full lg:w-48">
              <Button
                fullWidth
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm flex items-center justify-center gap-2"
                onClick={() => navigate(`/transaction/${transaction.id}`)}
              >
                <Cart className="w-4 h-4" />
                Details
              </Button>

              <Button
                fullWidth
                className="bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-sm flex items-center justify-center gap-2"
                onClick={() =>
                  alert(`Upload payment proof for ${transaction.invoiceId}`)
                }
              >
                <Upload className="w-4 h-4" />
                Upload
              </Button>

              {(transaction.status === "pending" ||
                transaction.status === "cancelled") && (
                <Button
                  fullWidth
                  disabled={transaction.status === "cancelled"}
                  className={`rounded-lg shadow-sm ${
                    transaction.status === "pending"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {transaction.status === "pending" ? "Cancel" : "Cancelled"}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTransaction;
