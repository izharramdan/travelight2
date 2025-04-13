import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../../../../../services/endpoint";

const getToken = () => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] || null
  );
};

const useGetCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [errorCart, setErrorCart] = useState(null);

  // Fungsi untuk mengambil data keranjang dari API
  const fetchCartItems = async () => {
    setIsLoadingCart(true);
    setErrorCart(null);

    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL.API}${END_POINT.GET_CART}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.data || []);
    } catch (error) {
      setErrorCart(error.message || "Failed to load cart data.");
    } finally {
      setIsLoadingCart(false);
    }
  };

  // Fungsi untuk merefresh data keranjang
  const refreshCart = async () => {
    await fetchCartItems();
  };

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = async (newItem) => {
    try {
      const token = getToken();
      await axios.post(`${BASE_URL.API}${END_POINT.ADD_CART}`, newItem, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      await refreshCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error.message);
    }
  };

  // Fungsi untuk memperbarui item di keranjang secara optimis
  const updateCartOptimistically = (updater) => {
    setCartItems((currentItems) => updater(currentItems || []));
  };

  // Ambil data keranjang saat komponen dimuat
  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems, // Data keranjang
    isLoadingCart, // Status loading
    errorCart, // Pesan error
    refreshCart, // Fungsi untuk merefresh data
    addToCart, // Fungsi untuk menambahkan item ke keranjang
    updateCartOptimistically, // Fungsi untuk pembaruan optimis
  };
};

export default useGetCart;