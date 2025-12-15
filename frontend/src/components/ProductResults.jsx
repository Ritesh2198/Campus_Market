import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://market-backend-6.onrender.com/api/products?search=${query}`)
            .then(res => setProducts(res.data.products))
            .catch(err => console.log(err));
    }, [query]);

    return (
        <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
            {products.length > 0 ? (
                products.map(product => <ProductCard key={product._id} product={product} />)
            ) : (
                <p className="text-center w-full">No products found</p>
            )}
        </div>
    );
};
export default SearchResults;