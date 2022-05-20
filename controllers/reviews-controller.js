const {
  fetchReviewById,
  updateVotesById,
  fetchAllReviews,
} = require("../models/reviews-model");

const { checkValExists } = require("../db/seeds/utils");

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
      res.status(200).send({ review: data });
    })
    .catch((err) => {
      next(err);
    });
};

// TASK 8 and 11
exports.getAllReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;

  if (category == undefined) {
    fetchAllReviews(sort_by, order, category)
      .then((data) => {
        res.status(200).send({ reviews: data });
      })
      .catch((err) => {
        next(err);
      });
  }

  if (category !== undefined) {
    const promises = [
      checkValExists("categories", "slug", category),
      fetchAllReviews(sort_by, order, category),
    ];
    return Promise.all(promises)
      .then((data) => {
        if (!data[1].length) {
          res.status(200).send([]);
        } else {
          res.status(200).send({ reviews: data[1] });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }
};
