import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const SearchFilter = ({ searchTerm, handleSearchChange, handleCategorySelect, handleSubcategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (selectedCategory) {
          const response = await axios.get(`http://localhost:3001/api/categories/${selectedCategory}/subcategories`);
          setSubcategories(response.data);
          setSelectedSubCategory(''); // Clear selected subcategory when category changes
        } else {
          setSubcategories([]);
        }
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    fetchSubcategories();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    handleCategorySelect(categoryId);
    setSelectedSubCategory(''); // Clear selected subcategory when a new category is selected
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
    handleSubcategorySelect(subcategoryId);
  };

  const filterCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterSubcategories = subcategories.filter(subcategory =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-700 bg-opacity-25 p-4 md:w-1/5 lg:w-1/6 w-60 md:h-100 overflow-y-auto md:block lg:block">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => handleCategoryChange('')} className="text-white">
          <FaTimes />
        </button>
      </div>
      <>
        <input
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 rounded border border-gray-300 text-black text-sm"
        />
        {filterCategories.map(category => (
          <div key={category.id} className="mb-4">
            <div className="cursor-pointer text-white" onClick={() => handleCategoryChange(category.id)}>
              {category.name}
            </div>
            {selectedCategory === category.id && (
              <>
                {filterSubcategories.length === 0 ? (
                  <div className="text-white pl-4">No hay subcategorías</div>
                ) : (
                  filterSubcategories.map(subcategory => (
                    <div key={subcategory.id} className="cursor-pointer pl-4 text-white" onClick={() => handleSubcategoryChange(subcategory.id)}>
                      {subcategory.name}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        ))}
      </>
    </div>
  );
};

export default SearchFilter;
