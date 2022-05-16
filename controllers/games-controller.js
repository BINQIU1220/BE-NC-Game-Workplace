const { fetchAllCatogories, fetchAllReview } = require("../models/games-model");

// TASK 3
exports.getAllCatogories = (req, res, next) => {
  fetchAllCatogories()
    .then((data) => {
      res.status(200).send({ categories: data });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// TASK 4
exports.getAllReview = (req, res, next) => {
  const id = req.params.review_id;
  fetchAllReview(id)
    .then((data) => {
      console.log(date);
      res.status(200).send({ reviews: data });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
