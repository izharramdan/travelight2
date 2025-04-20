import React, { useState } from "react";
import { Typography, Button, Card } from "@material-tailwind/react";
import { ShoppingBag, ShoppingBagCheck } from "iconoir-react";
import useGetCart from "../../components/Views/Home/hooks/cart/useGetCart";
import usePaymentMethod from "../../components/Views/Home/hooks/cart/usePaymentMethod";
import useCreateTransaction from "../../components/Views/Home/hooks/transaction/useCreateTransaction";
import CartItems from "../../components/Views/Home/cart/CartItem";
import OrderSummary from "../../components/Views/Home/cart/OrderSummary";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, refreshCart } = useGetCart();
  const {
    paymentMethods,
    isLoading: isLoadingPayment,
    error: errorPayment,
  } = usePaymentMethod();
  const { isLoading: isCreatingTransaction, createTransaction } =
    useCreateTransaction();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const handleIncrement = async () => {
    // Tambahkan logika increment
  };

  const handleDecrement = async () => {
    // Tambahkan logika decrement
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.activity.price * item.quantity, 0);
  };

  const handleCreateTransaction = async () => {
    const data = {
      cartIds: selectedItems,
      paymentMethodId: selectedPayment,
    };

    const success = await createTransaction(data);

    if (success) {
      await refreshCart();
      setSelectedItems([]);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 text-center bg-white/50 backdrop-blur-xl shadow-xl rounded-3xl border border-blue-gray-100 animate-fade-in">
          <div className="flex flex-col items-center justify-center">
            <ShoppingBag className="h-20 w-20 text-blue-400 mb-6" />
            <Typography variant="h4" className="font-bold text-gray-800 mb-2">
              Your cart is empty
            </Typography>
            <Typography className="text-gray-600 mb-6">
              Start your journey and discover exciting activities to add!
            </Typography>
            <Button
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform"
              onClick={() => navigate("/activity")}
            >
              Explore Your Destinations
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 w-11/12">
      <div className="flex items-center mb-6 pb-4 border-b border-blue-gray-100">
        <Button
          className={`flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg transition duration-300 shadow-md ${
            selectedItems.length === cartItems.length && cartItems.length > 0
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
          onClick={handleSelectAll}
        >
          <ShoppingBagCheck className="h-5 w-5" />
          {selectedItems.length === cartItems.length && cartItems.length > 0
            ? "Unselect All"
            : "Select All"}
        </Button>
        <Typography className="ml-auto font-semibold text-blue-gray-700">
          {selectedItems.length} item(s) selected
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <CartItems
          cartItems={cartItems}
          selectedItems={selectedItems}
          handleItemSelect={handleItemSelect}
          handleSelectAll={handleSelectAll}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          refreshCart={refreshCart}
        />
        <OrderSummary
          calculateSubtotal={calculateSubtotal}
          paymentMethods={paymentMethods}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          handleCreateTransaction={handleCreateTransaction}
          isCreatingTransaction={isCreatingTransaction}
          isLoadingPayment={isLoadingPayment}
          errorPayment={errorPayment}
        />
      </div>
    </div>
  );
};

export default Cart;
