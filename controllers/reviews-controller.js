const { fetchReviewById, updateVotesById } = require("../models/reviews-model");

// TASK 4
exports.getReviewById = (req, res, next) => {
  const id = req.params.review_id;
  fetchReviewById(id)
    .then((data) => {
      res.status(200).send({ review: data });
    })
    .catch((err) => {
      next(err);
    });
};

// TASK 5
exports.patchVotesById = (req, res, next) => {
  const reviewId = req.params.review_id;
  const incVotes = req.body.inc_votes;
  updateVotesById(reviewId, incVotes)
    .then((data) => {
      console.log(data);
      res.status(200).send({ review: data });
    })
    .catch((err) => {
      next(err);
    });
};
