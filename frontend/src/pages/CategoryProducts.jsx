import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useSelector } from "react-redux";

const CategoryProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [allProducts,setAllProducts] = useState([]);

    const fetchProducts = async()=>{
            try{
                const res = await axios.get(`https://market-backend-6.onrender.com/api/v1/product/category/${category}`);
    
                if(res.data.success){
                    setAllProducts(res.data.data);
                    setProducts(res.data.data);
                }
            }      
                catch(err) {
                    console.error("Error fetching products:", err);
                    
                };
        }
    useEffect(() => {
        fetchProducts();
    }, [category]);

    const {searchQuery} = useSelector((state)=>state.product);
        useEffect(()=>{
            const filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredProducts);
        },[searchQuery])

    return (
        <div className="container mx-auto p-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products?.length > 0 ? (
                products.map(product => <ProductCard key={product._id} product={product} />)
            ) : (
                <p className="text-center w-full">No products found in this category</p>
            )}
        </div>
    );
};
export default CategoryProducts;