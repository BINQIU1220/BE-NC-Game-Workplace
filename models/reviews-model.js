const db = require("../db/connection.js");

// TASK 4
exports.fetchReviewById = (id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = ${id} GROUP BY reviews.review_id;`
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

// TASK 8
exports.fetchAllReviews = () => {
  return db
    .query(
      `SELECT owner, title,  reviews.review_id, category,  review_img_url, reviews.created_at, reviews.votes, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`
    )
    .then((data) => {
      return data.rows;
    });
};
