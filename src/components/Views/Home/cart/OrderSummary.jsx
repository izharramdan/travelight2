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
      <Card className="p-6">
        <Typography variant="h5" className="font-semibold mb-4">
          Order Summary
        </Typography>
        <div className="space-y-4">
          {/* <div className="flex justify-between">
            <Typography className="text-gray-600">Subtotal</Typography>
            <Typography className="font-medium">
              {calculateSubtotal().toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Typography>
          </div> */}

          <div className="border-t pt-4 flex justify-between">
            <Typography className="font-semibold">Total</Typography>
            <Typography className="font-semibold">
              {calculateSubtotal().toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Typography>
          </div>
        </div>

        <div className="mt-6">
          <Typography variant="h6" className="font-semibold mb-2">
            Payment Method
          </Typography>
          {isLoadingPayment ? (
            <Typography className="text-gray-600">
              Loading payment methods...
            </Typography>
          ) : errorPayment ? (
            <Typography className="text-red-500">{errorPayment}</Typography>
          ) : (
            <div>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between w-full mb-4"
                >
                  <input
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                  />
                  <img
                    src={method.imageUrl || "https://placehold.co/100x50"}
                    alt={method.name}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
          disabled={isCreatingTransaction || !selectedPayment}
          onClick={handleCreateTransaction}
        >
          {isCreatingTransaction ? "Processing..." : "Place Order"}
        </Button>
      </Card>
    </div>
  );
};

export default OrderSummary;
