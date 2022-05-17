const db = require("../db/connection");
const format = require("pg-format");

// TASK 7
exports.fetchCommentCount = (reviewId) => {
  return db
    .query(
      `SELECT * FROM comments JOIN reviews ON comments.review_id = reviews.review_id WHERE comments.review_id = ${reviewId};`
    )
    .then((data) => {
      return data.rowCount;
    });
};
