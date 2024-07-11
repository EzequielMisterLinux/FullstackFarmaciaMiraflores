import express from 'express';
import { insertProduct, updateProduct, deleteProduct, getProducts } from '../controllers/dashboardController';

const router = express.Router();

// Rutas para productos
router.post('/api/products', insertProduct);
router.put('/api/products/:id', updateProduct);
router.delete('/api/products/:id', deleteProduct);
router.get('/api/products', getProducts);

export default router;