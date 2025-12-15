import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import Login from "./pages/Login";
import Sell from "./pages/Sell";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import CategoryBar from "./components/CategoryBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminProducts from "./pages/AdminProducts";
import AdminRoute from "./components/AdminRoute";


const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <Navbar/>
        <CategoryBar/>
        <div className="flex-grow">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:category" element={<CategoryProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/sell" element={<PrivateRoute><Sell /></PrivateRoute>} />
                <Route path="/adminProducts" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                <Route path="/my-products" element={<PrivateRoute><MyProducts /></PrivateRoute>} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
            </Routes>
        </div>
        <div className="my-5"><Footer /></div>
        
        </div>

    );
};
export default App;