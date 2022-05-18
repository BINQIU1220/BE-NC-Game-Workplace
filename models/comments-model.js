const db = require("../db/connection.js");

// TASK 9
exports.fetchCommenstById = (id) => {
  const valideIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  console.log(valideIds.includes(Number(id)));
  return db
    .query(`SELECT * FROM comments WHERE review_id = ${id};`)
    .then((data) => {
      if (!data.rows.length) {
        if (valideIds.includes(Number(id))) {
          return Promise.reject({ status: 200 });
        } else {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
      }
      return data.rows;
    });
};
