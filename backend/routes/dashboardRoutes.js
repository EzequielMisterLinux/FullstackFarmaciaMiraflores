import express from 'express';
import {
  createCategoryController,
  createSubCategoryController,
  getCategoriesController,
  getSubCategoriesByCategoryController
} from '../controllers/dashboardController.js';

import { 
  insertProduct, 
  updateProduct, 
  deleteProduct, 
  getProducts
} from '../controllers/dashboardProductController.js';

const router = express.Router();

// Rutas para el Dashboard
// Rutas para las categorías
router.post('/api/categories', createCategoryController);
router.get('/api/categories', getCategoriesController);
router.post('/api/categories/:categoryId/subcategories', createSubCategoryController);
router.get('/api/categories/:categoryId/subcategories', getSubCategoriesByCategoryController);

// Rutas para el producto
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);
router.get('/api/products', getProducts);
router.post('/api/products', insertProduct);

export default router;
