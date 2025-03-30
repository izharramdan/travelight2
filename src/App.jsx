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

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="activity" index element={<Activity />} />
            <Route path="category" index element={<Category />} />
            <Route path="category/:category" element={<CategoryById />} />
            <Route path="promo" index element={<Promo />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard/*"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
