import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="border p-2 rounded-lg block">
            <img src={product.images[0]?.url} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-bold">₹ {product.price}</h2>
            <p>{product.name}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
        </Link>
    );
};
export default ProductCard;