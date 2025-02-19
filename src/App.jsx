import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // Ubah disini
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Register from "./components/Register/Register";
import CategoriesPage from "./pages/CategoriesPage";
import PromosPage from "./pages/PromosPage";
import DetailCategoryPage from "./pages/DetailCategoryPage";
import EditProfile from "./components/EditProfile/EditProfile";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  
  return (
    <>
      <HashRouter> {/* Ubah disini */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="promos" element={<PromosPage />} />
            <Route
              path="categories/:categoryId"
              element={<DetailCategoryPage />}
            />
          </Route>
        </Routes>
      </HashRouter> {/* Ubah disini */}
    </>
  );
};

export default App;