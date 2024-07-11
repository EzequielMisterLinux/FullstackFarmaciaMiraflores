import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateProductModal from './UpdateProductModal';

const ProductList = ({ updateProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:3001/api/products-with-images')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching products with images:', error));
  };

  const handleUpdateProduct = (product) => {
    setProductToUpdate(product);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setProductToUpdate(null);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${productId}`);
      // After successful deletion, fetch the updated list of products
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subcategory
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 whitespace-nowrap">Loading...</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.image && <img src={product.image} alt={product.name} className="max-h-16" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.subCategoryId}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleUpdateProduct(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showUpdateModal && productToUpdate && (
        <UpdateProductModal
          product={productToUpdate}
          updateProduct={updateProduct}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductList;
