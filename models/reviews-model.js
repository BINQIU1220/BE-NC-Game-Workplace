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

// TASK 8 and 11
exports.fetchAllReviews = (
  sort_by = "created_at",
  order = "DESC",
  category
) => {
  const validSortBy = [
    "category",
    "title",
    "created_at",
    "votes",
    "owner",
    "review_id",
    "comment_count",
  ];

  let queryStr = `SELECT owner, title, reviews.review_id, category,  review_img_url, reviews.created_at, reviews.votes, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category !== undefined) {
    if (category.includes("'")) {
      category = category.replace("'", "''");
    }
    queryStr += ` WHERE category = '${category}'`;
  }

  if (validSortBy.includes(sort_by)) {
    if (order === "ASC" || order === "asc") {
      queryStr += ` GROUP BY reviews.review_id ORDER BY ${sort_by} ASC;`;
    } else if (order === "DESC" || order === "desc") {
      queryStr += ` GROUP BY reviews.review_id ORDER BY ${sort_by} DESC;`;
    } else {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  return db.query(queryStr).then((data) => {
    return data.rows;
  });
};
