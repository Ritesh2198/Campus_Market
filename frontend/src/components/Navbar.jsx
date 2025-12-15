import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchQuery } from "../slices/productSlice";
import { setUser,setToken} from "../slices/authSlice";
import logo from "../assets/logo.jpg"
import {toast} from "react-hot-toast";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.auth);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchQuery(searchTerm));
        setSearchTerm("");
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("user");
        dispatch(setUser(null));
    
        dispatch(setToken(null));
        
        toast.success("Logged out successfully!");
        navigate("/login"); 
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center flex-wrap">
            
            <div className="text-xl font-bold flex items-center">
                <div className="w-14 h-14 overflow-hidden rounded-full">
                    <img src={logo} className="w-full h-full object-cover" />
                </div>
                Campus Market</div>

           
            <button
                className="md:hidden block text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            
            <form onSubmit={handleSearch} className="hidden md:flex items-center ml-4">
                <input
                    type="text"
                    placeholder="Search your product"
                    className="p-2 rounded w-64 text-black bg-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="ml-2 bg-white text-blue-600 px-4 py-2 rounded">
                    Search
                </button>
            </form>

            
            <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? "block" : "hidden"}`}>
                <Link to="/" className="block px-4 py-2">Home</Link>
                <Link to="/my-products" className="block px-4 py-2">My Products</Link>

                
                {token && user?.role === "Admin" && (
                    <Link to="/adminProducts" className="block px-4 py-2">Admin Products</Link>
                )}

                {token ? (
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded block">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="block bg-blue-500 px-4 py-2 rounded">Login</Link>
                        <Link to="/signup" className="block bg-green-500 px-4 py-2 rounded">Signup</Link>
                    </>
                )}

                <Link to="/sell" className="block px-4 py-2">SELL</Link>
            </div>
        </nav>
    );
};

export default Navbar;


