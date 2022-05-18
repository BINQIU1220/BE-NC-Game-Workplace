const db = require("../db/connection.js");

// TASK 9
exports.fetchCommenstById = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE review_id = ${id};`)
    .then((data) => {
      return data.rows;
    });
};
