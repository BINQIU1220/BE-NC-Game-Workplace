const {
  fetchCommenstById,
  insertCommentsById,
} = require("../models/comments-model");

const { checkValExists } = require("../db/seeds/utils");

// TASK 9
exports.getCommentsById = (req, res, next) => {
  const id = req.params.review_id;
  const promises = [
    fetchCommenstById(id),
    checkValExists("reviews", "review_id", id),
  ];
  return Promise.all(promises)
    .then((data) => {
      if (!data[0].length) {
        res.status(200).send([]);
      } else {
        res.status(200).send({ comments: data[0] });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// TASK 10
exports.postCommentsById = (req, res, next) => {
  const id = req.params.review_id;
  const newComment = req.body;

  const promises = [
    checkValExists("reviews", "review_id", id),
    checkValExists("reviews", "owner", req.body.username),
    insertCommentsById(id, newComment),
  ];
  return Promise.all(promises)
    .then((data) => {
      res.status(201).send({ comment: data[2] });
    })
    .catch((err) => {
      next(err);
    });
};
