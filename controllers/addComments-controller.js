const { fetchCommentCount } = require("../models/addComments-model");
const { fetchReviewById } = require("../models/reviews-model");

// TASK 7
exports.addComments = (req, res, next) => {
  const reviewId = req.params.review_id;
  const promises = [fetchCommentCount(reviewId), fetchReviewById(reviewId)];

  Promise.all(promises)
    .then((data) => {
      data[1][0].comment_count = data[0];
      res.status(200).send({ review: data[1] });
    })
    .catch((err) => {
      next(err);
    });
};
