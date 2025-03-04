import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Index";
import { UserProvider } from "./context/userContext";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
