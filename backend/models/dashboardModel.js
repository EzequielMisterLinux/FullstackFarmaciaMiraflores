// models/dashboardModel.js
import connection from '../database/connection.js';

const createCategoryModel = {
  insert: (name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO Categories (name) VALUES (?)', [name],
        (error, results) => {
          if (error) {
            reject(new Error('Could not create category'));
            return;
          }
          resolve(results);
        }
      );
    });
  }
};

const createSubCategoryModel = {
  insert: (name, categoryId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO SubCategories (name, categoryId) VALUES (?, ?)', [name, categoryId],
        (error, results) => {
          if (error) {
            reject(new Error('Could not create subcategory'));
            return;
          }
          resolve(results);
        }
      );
    });
  }
};

const retrieveCategories = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM Categories', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

const retrieveSubCategoriesByCategory = (categoryId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM SubCategories WHERE categoryId = ?', [categoryId], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

export {
  createSubCategoryModel,
  createCategoryModel,
  retrieveCategories,
  retrieveSubCategoriesByCategory
};
