import connection from '../database/connection.js';

export const addUserModel = (email, username, fullName, address, phone, password) => {
  return new Promise((resolve, reject) => {
    const query = 'CALL addusers(?, ?, ?, ?, ?, ?, @result); SELECT @result AS result;';
    connection.query(query, [email, username, fullName, address, phone, password], (err, results) => {
      if (err) {
        return reject(err);
      }
      const result = results[1][0].result;
      resolve(result);
    });
  });
};

export const authenticateUserModel = (email, password) => {
  return new Promise((resolve, reject) => {
    const query = 'CALL authenticate_user(?, ?, @result); SELECT @result AS result;';
    connection.query(query, [email, password], (err, results) => {
      if (err) {
        return reject(err);
      }
      const result = results[1][0].result;
      resolve(result);
    });
  });
};
