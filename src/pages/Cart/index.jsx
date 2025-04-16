import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { ShoppingBag, Trash, ShoppingBagCheck, CheckSquare } from "iconoir-react";
import useGetCart from "../../components/Views/Home/hooks/cart/useGetCart";
import usePaymentMethod from "../../components/Views/Home/hooks/cart/usePaymentMethod";
import useCreateTransaction from "../../components/Views/Home/hooks/transaction/useCreateTransaction";

const Cart = () => {
  const { cartItems, isLoadingCart, errorCart } = useGetCart();
  const { paymentMethods, isLoading: isLoadingPayment, error: errorPayment } = usePaymentMethod();
  const { isLoading: isCreatingTransaction, createTransaction } = useCreateTransaction();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");

  // Handle checkbox individu
  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]); // Kosongkan pilihan jika semua sudah dipilih
    } else {
      setSelectedItems(cartItems.map((item) => item.id)); // Pilih semua item
    }
  };

  // Hitung subtotal
  const calculateSubtotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.activity.price * item.quantity, 0);
  };

  // Format harga ke IDR
  const formatToIDR = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  // Handle Create Transaction
  const handleCreateTransaction = () => {
    const data = {
      cartIds: selectedItems,
      paymentMethodId: selectedPayment,
    };
    createTransaction(data);
  };

  if (isLoadingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <Typography className="mt-4 text-gray-600">Loading your cart...</Typography>
        </div>
      </div>
    );
  }

  if (errorCart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <Typography className="text-lg font-semibold mb-2">
            Failed to load cart data.
          </Typography>
          <Typography>{errorCart}</Typography>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mb-4 mx-auto" />
          <Typography variant="h5" className="font-semibold mb-2">
            Your cart is empty
          </Typography>
          <Typography className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded">
            Start Shopping
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Typography variant="h4" className="font-bold">
            Your Cart
          </Typography>
          <Typography className="text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </Typography>
        </div>

        <div className="flex items-center mb-4 pb-4 border-b">
          <Button
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              selectedItems.length === cartItems.length && cartItems.length > 0
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={handleSelectAll}
          >
            <ShoppingBagCheck className="h-5 w-5" />
            {selectedItems.length === cartItems.length && cartItems.length > 0
              ? "Unselect All"
              : "Select All"}
          </Button>
          <Typography className="ml-auto font-medium">
            {selectedItems.length} item(s) selected
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Select</th>
                    <th className="text-left">Activity</th>
                    <th className="text-left">Price</th>
                    <th className="text-left">Quantity</th>
                    <th className="text-left">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((cart) => (
                    <tr key={cart.id}>
                      <td>
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded cursor-pointer ${
                            selectedItems.includes(cart.id)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                          onClick={() => handleItemSelect(cart.id)}
                        >
                          {selectedItems.includes(cart.id) && (
                            <CheckSquare className="h-4 w-4" />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-4">
                          <img
                            src={cart.activity.imageUrls[0] || "https://placehold.co/200x200/png"}
                            alt={cart.activity.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <Typography className="font-medium">{cart.activity.title}</Typography>
                            <Typography className="text-sm text-gray-500">
                              {cart.activity.city}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Typography className="font-medium">
                          {formatToIDR(cart.activity.price)}
                        </Typography>
                      </td>
                      <td>
                        <Typography>{cart.quantity}</Typography>
                      </td>
                      <td>
                        <Typography className="font-medium">
                          {formatToIDR(cart.activity.price * cart.quantity)}
                        </Typography>
                      </td>
                      <td>
                        <Button
                          className="text-red-500"
                          onClick={() => console.log("Delete item")}
                        >
                          <Trash className="h-5 w-5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <Typography variant="h5" className="font-semibold mb-4">
                Order Summary
              </Typography>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Typography className="text-gray-600">Subtotal</Typography>
                  <Typography className="font-medium">
                    {formatToIDR(calculateSubtotal())}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-gray-600">Service Fee</Typography>
                  <Typography className="font-medium">Free</Typography>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <Typography className="font-semibold">Total</Typography>
                  <Typography className="font-semibold">
                    {formatToIDR(calculateSubtotal())}
                  </Typography>
                </div>
              </div>

              <div className="mt-6">
                <Typography variant="h6" className="font-semibold mb-2">
                  Payment Method
                </Typography>
                {isLoadingPayment ? (
                  <Typography className="text-gray-600">Loading payment methods...</Typography>
                ) : errorPayment ? (
                  <Typography className="text-red-500">{errorPayment}</Typography>
                ) : (
                  <div>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex flex-col items-start gap-2 mb-4">
                        <img
                          src={method.imageUrl || "https://placehold.co/100x50"}
                          alt={method.name}
                          className="h-12 object-contain"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id={method.id}
                            name="paymentMethod"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={() => setSelectedPayment(method.id)}
                          />
                          <label htmlFor={method.id} className="text-gray-700">
                            {method.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
                disabled={selectedItems.length === 0 || !selectedPayment || isCreatingTransaction}
                onClick={handleCreateTransaction}
              >
                {isCreatingTransaction ? "Processing..." : "Create Transaction"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;