const db = require("../db/connection.js");

// TASK 4
exports.fetchReviewById = (id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = ${id};`)
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return data.rows;
    });
};
