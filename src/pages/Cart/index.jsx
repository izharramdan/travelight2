import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { ShoppingBag, Trash, ShoppingBagCheck } from "iconoir-react";
import useGetCart from "../../components/Views/Home/hooks/cart/useGetCart";

const Cart = () => {
  const { cartItems, isLoadingCart, errorCart, refreshCart } = useGetCart();
  const [selectedItems, setSelectedItems] = useState([]);

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

  // Handle penghapusan item
  const handleDeleteItem = async (itemId) => {
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    await refreshCart(); // Refresh data keranjang
  };

  // Handle perubahan jumlah item
  const handleQuantityChange = (itemId, newQuantity) => {
    refreshCart(); // Refresh data keranjang
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
                        <Button
                          className={`border px-2 py-1 ${
                            selectedItems.includes(cart.id)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                          onClick={() => handleItemSelect(cart.id)}
                        >
                          {selectedItems.includes(cart.id) ? "✓" : ""}
                        </Button>
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
                        <div className="flex items-center gap-2">
                          <Button
                            className="border px-2 py-1"
                            onClick={() =>
                              handleQuantityChange(cart.id, cart.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <Typography>{cart.quantity}</Typography>
                          <Button
                            className="border px-2 py-1"
                            onClick={() =>
                              handleQuantityChange(cart.id, cart.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td>
                        <Typography className="font-medium">
                          {formatToIDR(cart.activity.price * cart.quantity)}
                        </Typography>
                      </td>
                      <td>
                        <Button
                          className="text-red-500"
                          onClick={() => handleDeleteItem(cart.id)}
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
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                  disabled={selectedItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;