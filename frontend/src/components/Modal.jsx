import Modal from 'react-modal';

// Configuración para accesibilidad y estilos
Modal.setAppElement('#root');

// Estilos personalizados para el modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Componente que renderiza el modal
const ModalExample = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={customStyles}
  >
    <h2>Modal Example</h2>
    <button onClick={onRequestClose}>Close</button>
  </Modal>
);

export default ModalExample;
