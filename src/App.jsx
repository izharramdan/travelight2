import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Index";
import { UserProvider } from "./context/userContext";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Index";
import DashboardLayout from "./components/Dashboard/components/dashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Activity from "./pages/Activity/Index";
import Category from "./pages/Category/Index";
import Promo from "./pages/Promo/Index";
import CategoryById from "./pages/Category/CategoryById";
import ActivityById from "./pages/Activity/ActivityById";
import Cart from "./pages/Cart";
import MyTransaction from "./pages/Transaction/MyTransaction";
import TransactionById from "./pages/Transaction/TransactionById";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="activity" index element={<Activity />} />
            <Route path="activity/:activity" element={<ActivityById />} />
            <Route path="category" index element={<Category />} />
            <Route
              path="cart"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="transaction"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <MyTransaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="transaction/:transaction"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <TransactionById />
                </ProtectedRoute>
              }
            />
            <Route path="category/:category" element={<CategoryById />} />
            <Route path="promo" index element={<Promo />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard/*"
            element={
              <ProtectedRoute roles={["admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
