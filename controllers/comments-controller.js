const { fetchCommenstById } = require("../models/comments-model");

// TASK 9
exports.getCommentsById = (req, res, next) => {
  const id = req.params.review_id;
  fetchCommenstById(id)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch((err) => {
      next(err);
    });
};
