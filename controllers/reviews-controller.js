const { fetchReviewById } = require("../models/reviews-model");

// TASK 4
exports.getReviewById = (req, res, next) => {
  const id = req.params.review_id;
  fetchReviewById(id)
    .then((data) => {
      res.status(200).send({ reviews: data });
    })
    .catch((err) => {
      next(err);
    });
};
