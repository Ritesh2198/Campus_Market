import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useSelector((state)=>state.auth);

    useEffect(() => {
        const fetchPendingProducts = async () => {
            try {
                const res = await axios.get("https://market-backend-6.onrender.com/api/v1/product/getPendingProducts");
                setProducts(res.data.products);
            } catch (error) {
                console.error("Error fetching pending products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPendingProducts();
    }, []);

    const handleApprove = async (productId) => {
        try {
            await axios.post("https://market-backend-6.onrender.com/api/v1/product/approveProduct",{productId},{headers:{Authorization : `Bearer ${token}`}});
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error("Error approving product:", error);
        }
    };

    const handleReject = async (productId) => {
        try {
            await axios.post("https://market-backend-6.onrender.com/api/v1/product/rejectProduct",{productId},{headers:{Authorization : `Bearer ${token}`}});
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error("Error rejecting product:", error);
        }
    };
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Pending Products for Approval</h1>
            {products.length === 0 ? (
                <p>No new products pending approval.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="border p-4 rounded-lg shadow-md">
                            <img src={product.images[0]?.url || "/placeholder.jpg"} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-600">₹ {product.price}</p>
                            <div className="flex space-x-2 mt-2">
                                <button onClick={() => handleApprove(product._id)} className="bg-green-500 text-white px-4 py-2 rounded">
                                    Approve
                                </button>
                                <button onClick={() => handleReject(product._id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
