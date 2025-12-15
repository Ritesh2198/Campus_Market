import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Sell = () => {
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        location: "",
        
        images: []
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === "images") {
                for (let i = 0; i < formData.images.length; i++) {
                    formDataToSend.append("images", formData.images[i]);
                }
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }
        console.log("Form Data before sending:", Object.fromEntries(formDataToSend.entries()));
        console.log("FORM",formData);
        try {
            await axios.post("https://market-backend-6.onrender.com/api/v1/product/createProduct", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data",
                    Authorization : `Bearer ${token}`
                },
                
            });
    
            navigate("/");
        } catch (error) {
            console.error("Error listing product:", error);
            toast.error("Failed to list product.");
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sell Your Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Product Name" className="border p-2 w-full" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" className="border p-2 w-full" onChange={handleChange} required />
                <label className="block mb-2">Category</label>
                <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="border p-2 w-full mb-4" 
                    required
                >
                    <option value="" disabled>Select a Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Automobiles">Automobiles</option>
                    <option value="Books">Books</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Others">Others</option>
                </select>
                <textarea name="description" placeholder="Description" className="border p-2 w-full" onChange={handleChange} required></textarea>
                <input type="text" name="location" placeholder="Location" className="border p-2 w-full" onChange={handleChange} required />
                <input type="file" multiple name="images" className="border p-2 w-full" onChange={handleImageChange} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2" disabled={loading}>{loading ? "Uploading..." : "Submit"}</button>
            </form>
        </div>
    );
};
export default Sell;