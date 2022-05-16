const db = require("../db/connection.js");

// TASK 3
exports.fetchAllCatogories = () => {
  return db.query(`SELECT * FROM catogories;`).then((data) => {
    return data.rows;
  });
};

// TASK 4
exports.fetchAllReview = (id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = ${id};`)
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "review not found" });
      }
      return data.rows;
    });
};
