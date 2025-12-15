import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"
import { setToken, setUser } from "../slices/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("https://market-backend-6.onrender.com/api/v1/auth/login", userData);
          console.log("RES", res);
          
          if(res && res?.data?.success){
            localStorage.setItem("token", JSON.stringify(res.data.token))
            localStorage.setItem("user", JSON.stringify(res.data.user))
            dispatch(setToken(res.data.token));
            dispatch(setUser(res.data.user));
            toast.success("Login successful!");
            navigate("/");
          }
        } catch (error){
          console.log("Error:", error);
          
          if (error.response && error.response.status === 401) {
            toast.error("User does not exist");
          } else {
            toast.error("Login failed. Please try again.");
          }
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-md">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-4" required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-4" required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
            </form>
            <p className="mt-4">Don't have an account? <a href="/signup" className="text-blue-500">Signup</a></p>
        </div>
    );
};

export default Login;
