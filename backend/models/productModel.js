// productModel.js
import connection from '../database/connection.js';

const getProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Products', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};


const getProductImageById = (productId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT image FROM Products WHERE id = ?', [productId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results[0] ? results[0].image : null);
    });
  });
};

export { getProducts, getProductImageById };
