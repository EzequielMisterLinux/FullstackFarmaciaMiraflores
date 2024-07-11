// routes/userRoutes.js
import express from 'express';
import { addUser, authenticateUser } from '../controllers/EmployeController.js';

const router = express.Router();

router.post('/api/users', addUser);
router.post('/api/users/authenticate', authenticateUser);

export default router;
