// controllers/dashboardController.js
import path from 'path';
import fs from 'fs'; 
import multer from 'multer';

import { createProduct, updateProductModel, removeProduct, retrieveProducts, getProductById } from '../models/dashboardProductModel.js';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/'; 
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `image-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

const insertProduct = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, description, price, subCategoryId } = req.body;
      const image = req.file ? req.file.path : null;

      if (!req.file || !req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return res.status(400).json({ error: 'Only image files (jpg, jpeg, png, gif) are allowed' });
      }

      const result = await createProduct.insert(name, description, price, image, subCategoryId);
      if (result) {
        res.json({ message: 'Product inserted successfully' });
      } else {
        res.status(500).json({ error: 'Error inserting product' });
      }
    } catch (error) {
      console.error('Error inserting product:', error);
      res.status(500).json({ error: 'Error inserting product' });
    }
  }
];



const updateProduct = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const image = req.file ? req.file.path : null;

      // Get the current product to keep the old image if no new image is provided
      const currentProduct = await getProductById(req.params.id);

      const productData = { 
        name, 
        description, 
        price, 
        image: image || currentProduct.image  // Keep the old image if no new one is provided
      };

      await updateProductModel(req.params.id, productData);
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Error updating product' });
    }
  }
];


const deleteProduct = async (req, res) => {
  try {
    await removeProduct(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await retrieveProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};



export {
  insertProduct,
  updateProduct,
  deleteProduct,
  getProducts
};