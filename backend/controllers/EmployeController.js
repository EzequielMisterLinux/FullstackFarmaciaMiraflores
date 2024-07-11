// controllers/userController.js
import { addUserModel, authenticateUserModel } from '../models/userModel.js';

export const addUser = async (req, res) => {
  const { email, username, fullName, address, phone, password } = req.body;
  
  try {
    const result = await addUserModel(email, username, fullName, address, phone, password);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await authenticateUserModel(email, password);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
