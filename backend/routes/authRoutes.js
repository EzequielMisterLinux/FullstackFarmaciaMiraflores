// authRoutes.js
import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

// Ruta para registro de usuario
router.post('/register', UserController.register);

// Ruta para autenticación de usuario
router.post('/authenticate', UserController.authenticate);

export default router;