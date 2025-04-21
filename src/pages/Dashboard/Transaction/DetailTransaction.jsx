import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useTransactionById from "../../../components/Views/Home/hooks/transaction/useTransactionById";
import {
  Wallet,
  XmarkCircle,
  Calendar,
  PercentageCircleSolid,
  DollarCircle,
  Package,
  Copy,
  CheckCircle,
} from "iconoir-react";
import { Button } from "@material-tailwind/react";
import TransactionStatus from "../../../components/Views/Home/transaction/TransactionStatus";

const DetailTransaction = () => {
  const { transactionId } = useParams();
  const { transaction, isLoading, error } = useTransactionById(transactionId);
  const [localStatus, setLocalStatus] = useState(null);

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

  if (error) {
    return (
      <div className="text-center py-10 bg-red-50 p-6 rounded-xl max-w-2xl mx-auto">
        <XmarkCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-600 mb-2">
          Error Loading Transaction
        </h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center py-10 bg-blue-50 p-6 rounded-xl max-w-2xl mx-auto">
        <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">
          Transaction Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The requested transaction could not be located.
        </p>
      </div>
    );
  }
  const status = localStatus || transaction.status;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-500 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Transaction Details</h1>
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          <span className="font-semibold">{transaction.invoiceId}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Transaction Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Status:</span>
              <TransactionStatus status={status} />
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Amount:</span>
              <span className="text-xl font-bold text-green-600">
                Rp {transaction.totalAmount.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Order Date:</span>
              <span className="text-gray-800">
                {new Date(transaction.orderDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Expired Date:</span>
              <span className="text-gray-800">
                {new Date(transaction.expiredDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          {transaction.status === "pending" && (
            <div className="mt-6 space-y-3 flex flex-col">
              <Button
                fullWidth
                className="bg-green-600 text-white hover:bg-red-700 rounded-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </Button>
              <Button
                fullWidth
                className="bg-red-600 text-white hover:bg-red-700 rounded-lg flex items-center justify-center gap-2"
              >
                <XmarkCircle className="w-4 h-4" />
                Decline
              </Button>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            Payment Details
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <img
                src={transaction.payment_method.imageUrl}
                alt={transaction.payment_method.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="font-bold text-gray-800">
                  {transaction.payment_method.name}
                </h3>
                <p className="text-sm text-gray-600">Virtual Account</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">VA Number:</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-mono font-bold text-gray-800">
                  {transaction.payment_method.virtual_account_number}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600 block mb-1">Account Name:</span>
                <p className="font-semibold text-gray-800">
                  {transaction.payment_method.virtual_account_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Items */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Ordered Items
        </h2>

        <div className="grid gap-4">
          {transaction.transaction_items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-6 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={item.imageUrls[0]}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-gray-800">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {item.price_discount && (
                    <div className="flex items-center gap-2">
                      <PercentageCircleSolid className="w-5 h-5 text-green-500" />
                      <span className="text-gray-600">Discounted:</span>
                      <span className="font-semibold text-green-600">
                        Rp {item.price_discount.toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailTransaction;
