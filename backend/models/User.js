// User.js
import connection from '../database/connection.js';
import Swal from 'sweetalert2';

const User = {
  register: (email, username, fullName, address, phone, password) => {
    return new Promise((resolve, reject) => {
      connection.query('CALL addusers(?, ?, ?, ?, ?, ?, @result)', [email, username, fullName, address, phone, password], (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query('SELECT @result AS result', (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0].result);
            }
          });
        }
      });
    });
  },


  authenticate: (email, password) => {
    return new Promise((resolve, reject) => {
      const query = 'CALL authenticate_user(?, ?, @result)';
      connection.query(query, [email, password], (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          connection.query('SELECT @result AS result', (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0].result);
            }
          });
        }
      });
    });
  }
};


export default User;
