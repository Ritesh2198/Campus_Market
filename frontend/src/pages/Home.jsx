import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [allProducts,setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {searchQuery} = useSelector((state)=>state.product);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`https://market-backend-6.onrender.com/api/v1/product/getAllProducts`);
                setProducts(res.data.products);
                setAllProducts(res.data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    
    
    useEffect(()=>{
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);
    },[searchQuery])

    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Latest Products</h1>

            {loading ? (
                <p>Loading products...</p>
            ) : products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
                </div>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};


export default Home;

