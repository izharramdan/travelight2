import React from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Check, Trash } from "iconoir-react";
import useDeleteCart from "../hooks/cart/useDeleteCart";
import useUpdateCart from "../hooks/cart/useUpdateCart";

const CartItems = ({
  cartItems,
  selectedItems,
  handleItemSelect,
  refreshCart,
}) => {
  const { deleteCart, isLoading: isDeleting } = useDeleteCart();
  const { updateCart, isLoading: isUpdating } = useUpdateCart();

  const handleIncrement = async (cartId, quantity) => {
    await updateCart(cartId, quantity + 1);
    refreshCart(); // Refresh data keranjang setelah update
  };

  const handleDecrement = async (cartId, quantity) => {
    if (quantity > 1) {
      await updateCart(cartId, quantity - 1);
      refreshCart(); // Refresh data keranjang setelah update
    }
  };

  // Urutkan cartItems berdasarkan properti tetap, misalnya id
  const sortedCartItems = [...cartItems].sort((a, b) => a.id.localeCompare(b.id));

  return (
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
            {sortedCartItems.map((cart) => (
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
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        cart.activity.imageUrls[0] ||
                        "https://placehold.co/200x200/png"
                      }
                      alt={cart.activity.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <Typography className="font-medium">
                        {cart.activity.title}
                      </Typography>
                      <Typography className="text-sm text-gray-500">
                        {cart.activity.city}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td>
                  <Typography className="font-medium">
                    {cart.activity.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </Typography>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Button
                      className="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg border-none shadow-md hover:bg-gray-300"
                      onClick={() => handleDecrement(cart.id, cart.quantity)}
                      disabled={cart.quantity <= 1 || isUpdating}
                    >
                      -
                    </Button>
                    <Typography>{cart.quantity}</Typography>
                    <Button
                      className="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg border-none shadow-md hover:bg-gray-300"
                      onClick={() => handleIncrement(cart.id, cart.quantity)}
                      disabled={isUpdating}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>
                  <Typography className="font-medium">
                    {(cart.activity.price * cart.quantity).toLocaleString(
                      "id-ID",
                      {
                        style: "currency",
                        currency: "IDR",
                      }
                    )}
                  </Typography>
                </td>
                <td>
                  <Button
                    className="text-red-500 bg-gray-100 px-2 py-1 rounded border-none shadow-md hover:bg-gray-300"
                    onClick={() => deleteCart(cart.id, refreshCart)}
                    disabled={isDeleting}
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
  );
};

export default CartItems;