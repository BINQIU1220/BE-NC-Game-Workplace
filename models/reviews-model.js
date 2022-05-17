const db = require("../db/connection.js");

// TASK 4
exports.fetchReviewById = (id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(reviews.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = ${id} GROUP BY reviews.review_id;`
    )
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return data.rows;
    });
};

// TASK 5
exports.updateVotesById = (reviewId, incVotes) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + ${incVotes} WHERE review_id = ${reviewId} RETURNING *;`
    )
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return data.rows[0];
    });
};
