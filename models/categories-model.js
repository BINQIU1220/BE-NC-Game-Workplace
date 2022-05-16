const db = require("../db/connection.js");

// TASK 3
exports.fetchAllCatogories = () => {
  return db.query(`SELECT * FROM categories;`).then((data) => {
    return data.rows;
  });
};
