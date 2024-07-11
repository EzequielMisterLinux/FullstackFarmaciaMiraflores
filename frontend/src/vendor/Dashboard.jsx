import React, { useEffect, useState } from 'react';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import axios from 'axios';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addCategory = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const addSubcategory = (subcategory, categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, subcategories: [...(category.subcategories || []), subcategory] }
          : category
      )
    );
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post('http://localhost:3001/api/products', product);
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <CategoryForm addCategory={addCategory} addSubcategory={addSubcategory} categories={categories} />
          <ProductForm addProduct={addProduct} categories={categories} />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <ProductList products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
