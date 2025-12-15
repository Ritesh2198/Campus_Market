import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    const userId = useSelector((state)=>state.user?._id);


    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const res =await axios.post("https://market-backend-6.onrender.com/api/v1/product/myProducts", {userId});
                setProducts(res.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async(productId) => {
        
        
        try {
            await axios.post(`https://market-backend-6.onrender.com/api/v1/product/deleteProduct`,{productId});
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">My Products</h1>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="border p-4 rounded-lg shadow-md">
                            <img src={product.images[0]?.url || "/placeholder.jpg"} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-600">₹ {product.price}</p>
                            <div className="flex space-x-2 mt-2">
                                <Link to={`/edit-product/${product._id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</Link>
                                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProducts;
