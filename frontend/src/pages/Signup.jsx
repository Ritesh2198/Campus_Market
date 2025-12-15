import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

const Signup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userData.password !== userData.confirmPassword){
          toast.error("Passwords don't match");
          return;
        }
        try {
            const res = await axios.post("https://market-backend-6.onrender.com/api/v1/auth/signup", userData);
            
            toast.success("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Signup failed");
           
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md">
            <h1 className="text-3xl font-bold mb-4">Signup</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full mb-4" required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-4" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-4" required />
                <input type="password" name="confirmPassword" placeholder="confirmPassword" onChange={handleChange} className="border p-2 w-full mb-4" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Signup</button>
            </form>
            <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
    );
};

export default Signup;
