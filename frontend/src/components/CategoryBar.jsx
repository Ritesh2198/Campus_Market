import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryBar = () => {
    const categories = ["All","Electronics", "Fashion", "Home Appliances", "Books", "Furniture", "Automobiles","Others"];
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-gray-100 p-4">
            <button
                className="md:hidden bg-gray-800 text-white px-4 py-2 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                Categories ☰
            </button>
            <div className={`flex flex-wrap justify-center gap-4 mt-2 md:flex ${isOpen ? "block" : "hidden"}`}>
                {categories.map((category) => (
                    <Link to={`/category/${category}`} key={category} className="bg-white px-4 py-2 rounded shadow hover:bg-gray-200">
                        {category}
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default CategoryBar;