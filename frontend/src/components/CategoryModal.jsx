import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const CategoryModal = ({ onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory('');
    } else {
      setExpandedCategory(categoryName);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Categorías</h2>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <div className="cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
                {category.name} {expandedCategory === category.name && <FaAngleDown />}
              </div>
              {expandedCategory === category.name && category.subcategories && (
                <ul className="ml-4">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>{subcategory.name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryModal;
