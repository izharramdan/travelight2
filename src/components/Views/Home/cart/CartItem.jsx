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
    refreshCart();
  };

  const handleDecrement = async (cartId, quantity) => {
    if (quantity > 1) {
      await updateCart(cartId, quantity - 1);
      refreshCart();
    }
  };

  const sortedCartItems = [...cartItems].sort((a, b) =>
    a.id.localeCompare(b.id)
  );

  return (
    <div className="lg:col-span-2">
      <Card className="p-6 shadow-xl rounded-2xl bg-white border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-gray-700 font-semibold">
                <th className="px-4 py-3">Select</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedCartItems.map((cart) => (
                <tr
                  key={cart.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-md cursor-pointer transition-colors ${
                        selectedItems.includes(cart.id)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      onClick={() => handleItemSelect(cart.id)}
                    >
                      {selectedItems.includes(cart.id) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          cart.activity.imageUrls[0] ||
                          "https://placehold.co/200x200/png"
                        }
                        alt={cart.activity.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <Typography className="font-semibold text-gray-800">
                          {cart.activity.title}
                        </Typography>
                        <Typography className="text-sm text-gray-500 italic">
                          {cart.activity.city}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {cart.activity.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      <Button
                        className="min-w-[32px] px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        onClick={() => handleDecrement(cart.id, cart.quantity)}
                        disabled={cart.quantity <= 1 || isUpdating}
                      >
                        -
                      </Button>
                      <Typography className="text-center text-gray-800 font-medium w-6">
                        {cart.quantity}
                      </Typography>
                      <Button
                        className="min-w-[32px] px-2 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        onClick={() => handleIncrement(cart.id, cart.quantity)}
                        disabled={isUpdating}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700 w-[150px]">
                    {(cart.activity.price * cart.quantity).toLocaleString(
                      "id-ID",
                      {
                        style: "currency",
                        currency: "IDR",
                      }
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
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
        </div>
      </Card>
    </div>
  );
};

export default CartItems;
