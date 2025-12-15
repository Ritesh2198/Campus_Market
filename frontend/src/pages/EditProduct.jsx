import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        location: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.post(`https://market-backend-6.onrender.com/api/v1/product/getProduct`,{id});
                setProduct(res.data.product);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product.");
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/v1/product/update/${id}`, product);
            toast.success("Product updated successfully!");
            navigate("/my-products"); 
        } catch (err) {
            console.error("Error updating product:", err);
            setError("Failed to update product.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <label className="block mb-2">Product Name</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} className="border p-2 w-full mb-4" required />

                <label className="block mb-2">Price (₹)</label>
                <input type="number" name="price" value={product.price} onChange={handleChange} className="border p-2 w-full mb-4" required />

                <label className="block mb-2">Description</label>
                <textarea name="description" value={product.description} onChange={handleChange} className="border p-2 w-full mb-4" required />

                <label className="block mb-2">Category</label>
                <input type="text" name="category" value={product.category} onChange={handleChange} className="border p-2 w-full mb-4" required />

                <label className="block mb-2">Location</label>
                <input type="text" name="location" value={product.location} onChange={handleChange} className="border p-2 w-full mb-4" required />

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
