const db = require("../connection");
const format = require("pg-format");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkValExists = (table, column, value) => {
  const queryStr = format(
    `SELECT * 
	  FROM %I 
	  WHERE %I = $1;`,
    table,
    column
  );
  return db.query(queryStr, [value]).then((response) => {
    if (!response.rows.length) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
  });
};
