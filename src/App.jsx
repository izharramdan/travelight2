import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Index";
import UserProvider from "./context/userContext";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register/Index";

import ProtectedRoute from "./components/ProtectedRoute";
import Activity from "./pages/Activity/Index";
import Category from "./pages/Category/Index";
import Promo from "./pages/Promo/Index";
import CategoryById from "./pages/Category/CategoryById";
import ActivityById from "./pages/Activity/ActivityById";
import Cart from "./pages/Cart";
import MyTransaction from "./pages/Transaction/MyTransaction";
import TransactionById from "./pages/Transaction/TransactionById";
import AllTransaction from "./pages/Dashboard/Transaction";
import AllUsers from "./pages/Dashboard/User";
import DashboardLayout from "./components/Dashboard/components/dashboardLayout";
import DetailTransaction from "./pages/Dashboard/Transaction/DetailTransaction";
import Banners from "./pages/Dashboard/Banner";
import DashboardPromos from "./pages/Dashboard/Promo";
import DashboardActivities from "./pages/Dashboard/Activity";
import DashboardCategories from "./pages/Dashboard/Category";
import AddBanner from "./pages/Dashboard/Banner/AddBanner";
import EditBanner from "./pages/Dashboard/Banner/EditBanner";
import EditCategory from "./pages/Dashboard/Category/EditCategory";
import AddCategory from "./pages/Dashboard/Category/AddCategory";
import AddPromo from "./pages/Dashboard/Promo/AddPromo";
import EditPromo from "./pages/Dashboard/Promo/EditPromo";
import AddActivity from "./pages/Dashboard/Activity/AddActivity";
import EditActivity from "./pages/Dashboard/Activity/EditActivity";
import DashboardMainPage from "./pages/Dashboard/DashboardMainPage";
import EditProfile from "./pages/EditProfile/EditProfile";

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
              path="editprofile"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="transaction/:transactionId"
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
            path="dashboard/"
            element={
              <ProtectedRoute roles={["admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRoute roles={["admin"]}>
                  <DashboardMainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="promo"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <DashboardPromos />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-promo"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddPromo />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-promo/:promoId"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <EditPromo />
                </ProtectedRoute>
              }
            />
            <Route
              path="activity"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <DashboardActivities />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-activity"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddActivity />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-activity/:activityId"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <EditActivity />
                </ProtectedRoute>
              }
            />
            <Route
              path="category"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <DashboardCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-category"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-category/:categoryId"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <EditCategory />
                </ProtectedRoute>
              }
            />
            <Route
              path="banner"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Banners />
                </ProtectedRoute>
              }
            />
            <Route
              path="add-banner"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AddBanner />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit-banner/:bannerId"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <EditBanner />
                </ProtectedRoute>
              }
            />
            <Route
              path="transaction"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AllTransaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="transaction/:transactionId"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <DetailTransaction />
                </ProtectedRoute>
              }
            />
            <Route
              path="user"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AllUsers />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
