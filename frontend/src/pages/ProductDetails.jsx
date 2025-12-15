import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const getProductDetail = async()=>{
                try{
                    const res = await axios.post("https://market-backend-6.onrender.com/api/v1/product/getProduct", { id });
                if(res.data.success){
                    setProduct(res.data.product);
                    if (res.data.product.images.length > 0) {
                        setSelectedImage(res.data.product.images[0].url);
                    }
                }
                }catch(error){
                    console.log(error);
                }
            }
        
            useEffect(() => {
                
                   getProductDetail();
            }, [id]);
        

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4 md:p-6 max-w-6xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      
      <div className="md:w-1/2 p-4">
        <div className="overflow-hidden rounded-lg shadow-md border border-gray-200">
          <img 
            src={selectedImage} 
            alt={product.name} 
            className="w-full h-96 object-cover object-center transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <div className="flex mt-4 space-x-3 overflow-x-auto py-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={`Product ${index}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                selectedImage === img.url ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => setSelectedImage(img.url)}
            />
          ))}
        </div>
      </div>
      
      
      <div className="md:w-1/2 p-4 md:p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600">₹ {product.price.toLocaleString()}</p>
          
          <div className="h-px bg-gray-200 my-4"></div>
          
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {product.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center">
               <MapPin className="h-4 w-4 mr-1"/>
              {product.location}
            </span>
          </div>
        </div>
        
        
        <div className="mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
          <p className="text-sm font-medium text-gray-500 mb-2">Seller Information</p>
          <a href={`mailto:${product.user.email}`} className="flex items-center space-x-3 hover:text-blue-600 group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span className="text-blue-700 text-lg font-semibold">{product.user.email[0].toUpperCase()}</span>
            </div>
            <span className="text-gray-700 text-lg group-hover:text-blue-600 transition-colors">{product.user.email}</span>
          </a>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => window.location.href = `mailto:${product.user.email}`}
          >
            Contact Seller
          </button>
        </div>
      </div>
    </div>
    );
};

export default ProductDetails;
