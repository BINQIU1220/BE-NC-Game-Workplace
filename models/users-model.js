const db = require("../db/connection.js");

// TASK 6
exports.fetchAllUsers = () => {
  return db.query(`SELECT * FROM users;`).then((data) => {
    return data.rows;
  });
};
