// UserController.js
import User from '../models/User.js';
import Swal from 'sweetalert2';
import axios from 'axios';


const UserController = {
  register: async (req, res) => {
    const { email, username, fullName, address, phone, password } = req.body;
    try {
      const result = await User.register(email, username, fullName, address, phone, password);
      if (result === 'Registro exitoso') {
        res.status(200).json({ message: result });
      } else {
        throw new Error(result);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error.message || 'Hubo un problema al registrar el usuario'
      });
      res.status(500).json({ error: error.message });
    }
  },


  authenticate: (req, res) => {
    const { email, password } = req.body;
    User.authenticate(email, password)
      .then(result => {
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: result.message,
        });
        res.json({ message: result });
      })
      .catch(error => {
        console.error('Error authenticating user:', error);
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo más tarde.',
        });
        res.status(500).json({ error: 'Internal server error' });
      });
  }
};

export default UserController;