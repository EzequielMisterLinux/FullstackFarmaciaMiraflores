// productRoutes.js
import express from 'express';
import { viewProductsWithImages } from '../controllers/productController.js';

const router = express.Router();


// Actualiza la ruta
router.get('/api/products-with-images', viewProductsWithImages);

export default router;