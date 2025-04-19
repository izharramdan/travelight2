import React from "react";
import useMyTransactions from "../../components/Views/Home/hooks/transaction/useMyTransactions";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Cart } from "iconoir-react";

const MyTransaction = () => {
  const { transactions, isLoading } = useMyTransactions();

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <Typography variant="h6" className="text-gray-600">
          Loading transactions...
        </Typography>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 text-center bg-white/70 backdrop-blur-md shadow-lg rounded-2xl border border-blue-gray-100">
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">
            No Transactions Found
          </Typography>
          <Typography className="text-gray-600">
            Looks like you haven't made any transactions yet.
          </Typography>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4 lg:px-16">
      <Typography type="h3" className="mb-10 text-gray-900 tracking-wide">
        My Transactions
      </Typography>
      <div className="space-y-6">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="flex flex-row items-center gap-6 p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-white to-blue-50"
          >
            {/* Left: Payment Info */}
            <div className="flex-shrink-0 bg-blue-100 text-blue-500 p-4 rounded-full shadow-md">
              <Cart className="w-8 h-8" />
            </div>

            {/* Middle: Transaction Info */}
            <div className="flex-grow space-y-2">
              <Typography className="text-sm text-gray-600">
                Invoice:{" "}
                <span className="font-semibold text-gray-800">
                  {transaction.invoiceId}
                </span>
              </Typography>
              <Typography className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    transaction.status === "pending"
                      ? "text-yellow-500"
                      : transaction.status === "cancelled"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {transaction.status.toUpperCase()}
                </span>
              </Typography>
              <Typography className="text-sm text-gray-600">
                Total Amount:{" "}
                <span className="font-semibold text-green-600">
                  Rp {transaction.totalAmount.toLocaleString("id-ID")}
                </span>
              </Typography>
              <Typography className="text-sm text-gray-600">
                Payment Method:{" "}
                <span className="font-semibold text-gray-800">
                  {transaction.payment_method.name}
                </span>
              </Typography>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
                onClick={() =>
                  alert("View details for " + transaction.invoiceId)
                }
              >
                View Details
              </Button>
              <Button
                size="sm"
                className="bg-green-500 text-white hover:bg-green-600 transition-all"
                onClick={() =>
                  alert("Upload payment proof for " + transaction.invoiceId)
                }
              >
                Upload Proof
              </Button>
              {transaction.status === "pending" ||
              transaction.status === "cancelled" ? (
                <Button
                  size="sm"
                  className={`${
                    transaction.status === "pending"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-400 cursor-not-allowed"
                  } text-white transition-all`}
                  onClick={() =>
                    transaction.status === "pending" &&
                    alert("Cancel transaction " + transaction.invoiceId)
                  }
                  disabled={transaction.status === "cancelled"}
                >
                  Cancel
                </Button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTransaction;
