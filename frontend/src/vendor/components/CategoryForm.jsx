import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = ({ addCategory, addSubcategory, categories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      console.error('Please enter a category name');
      return;
    }

    try {
      console.log('Submitting category:', categoryName.trim());
      const response = await axios.post('http://localhost:3001/api/categories', { name: categoryName.trim() });
      console.log('Category response:', response.data);
      addCategory(response.data);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();

    if (!subcategoryName.trim() || !selectedCategory) {
      console.error('Please enter a subcategory name and select a category');
      return;
    }

    try {
      console.log('Submitting subcategory:', subcategoryName.trim(), 'to category:', selectedCategory);
      const subcategoryData = {
        name: subcategoryName.trim(),
        categoryId: selectedCategory,
      };

      const response = await axios.post(`http://localhost:3001/api/categories/${selectedCategory}/subcategories`, subcategoryData);
      console.log('Subcategory response:', response.data);
      addSubcategory(response.data, selectedCategory);
      setSubcategoryName('');
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  return (
    <div className="mt-8 w-2">
      <form onSubmit={handleCategorySubmit} className="mb-4">
        <div className="flex items-center mb-2">
          <input type="text" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="mr-2 p-2 border border-gray-300 rounded flex-grow" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Add</button>
        </div>
      </form>
      <form onSubmit={handleSubcategorySubmit} className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Subcategory Name"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <div className="flex items-center mb-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          >
            <option value="" key="empty-category">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
