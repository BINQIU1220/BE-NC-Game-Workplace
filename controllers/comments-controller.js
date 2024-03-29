const {
  fetchCommenstById,
  insertCommentsById,
  removeComment,
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

  const promises = [insertCommentsById(id, newComment)];
  return Promise.all(promises)
    .then((data) => {
      res.status(201).send({ comment: data[0] });
    })
    .catch((err) => {
      next(err);
    });
};

// TASK 12
exports.deleteCommentById = (req, res, next) => {
  const id = req.params.comment_id;

  const promises = [
    removeComment(id),
    checkValExists("comments", "comment_id", id),
  ];

  return Promise.all(promises)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
