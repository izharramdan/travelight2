import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";

const OrderSummary = ({
  calculateSubtotal,
  paymentMethods,
  selectedPayment,
  setSelectedPayment,
  handleCreateTransaction,
  isCreatingTransaction,
  isLoadingPayment,
  errorPayment,
}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="p-6 shadow-xl rounded-2xl border border-gray-100 bg-white">
        <Typography variant="h5" className="font-semibold mb-6 text-gray-800">
          🧾 Order Summary
        </Typography>

        <div className="space-y-4 text-gray-700">
          <div className="border-t pt-4 flex justify-between text-lg font-medium">
            <span>Total</span>
            <span>
              {calculateSubtotal().toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
            💳 Payment Method
          </Typography>

          {isLoadingPayment ? (
            <Typography className="text-gray-600">
              Loading payment methods...
            </Typography>
          ) : errorPayment ? (
            <Typography className="text-red-500">{errorPayment}</Typography>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  htmlFor={method.id}
                  className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition-all ${
                    selectedPayment === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id={method.id}
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      className="form-radio text-blue-500 accent-blue-500"
                    />
                    <Typography className="text-sm font-medium text-gray-700">
                      {method.name}
                    </Typography>
                  </div>
                  <img
                    src={method.imageUrl || "https://placehold.co/100x50"}
                    alt={method.name}
                    className="h-10 object-contain"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-3 rounded-lg w-full mt-6 shadow-md"
          disabled={isCreatingTransaction || !selectedPayment}
          onClick={handleCreateTransaction}
        >
          {isCreatingTransaction ? "Processing..." : "🛒 Place Order"}
        </Button>
      </Card>
    </div>
  );
};

export default OrderSummary;
