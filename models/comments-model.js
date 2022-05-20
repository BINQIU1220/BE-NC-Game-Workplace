const db = require("../db/connection.js");

// TASK 9
exports.fetchCommenstById = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE review_id = ${id};`)
    .then((data) => {
      return data.rows;
    });
};

// TASK 10
exports.insertCommentsById = (id, newComment) => {
  const { username, body } = newComment;

  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return db
    .query(
      `INSERT INTO comments (author, body, review_id) VALUES ($1, $2 , $3) RETURNING *;`,
      [username, body, id]
    )
    .then((data) => {
      return data.rows[0];
    });
};

// TASK 12
exports.removeComment = (id) => {
  return db.query(`DELETE FROM comments WHERE comment_id = ${id};`);
};
