const db = require("../db/connection.js");

exports.fetchAllCatogories = () => {
  return db.query(`SELECT * FROM categories;`).then((data) => {
    return data.rows;
  });
};
