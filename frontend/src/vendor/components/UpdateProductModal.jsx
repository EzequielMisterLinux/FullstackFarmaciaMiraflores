// UpdateProductModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UpdateProductModal = ({ product, updateProduct, closeModal }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(product.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    const updatedProduct = {
      ...product,
      name,
      description,
      price,
    };
  
    try {
      const formData = new FormData();
      formData.append('name', updatedProduct.name);
      formData.append('description', updatedProduct.description);
      formData.append('price', updatedProduct.price);
      
      // Verificar si hay una nueva imagen antes de agregarla al formData
      if (image) {
        formData.append('image', image);
      }
  
      await axios.put(`http://localhost:3001/api/products/${product.id}`, formData);
      updateProduct(product.id, updatedProduct);
      closeModal();
    } catch (error) {
      console.error('Error updating product:', error);
      // Manejar el error
    }
  };
  

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Update Product</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 max-w-full h-auto"
                style={{ maxWidth: '200px' }} // Establecer el tamaño máximo de la imagen
              />
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
