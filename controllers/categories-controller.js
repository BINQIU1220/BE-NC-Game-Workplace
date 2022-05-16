const { fetchAllCatogories } = require("../models/categories-model");

// TASK 3
exports.getAllCatogories = (req, res, next) => {
  fetchAllCatogories()
    .then((data) => {
      res.status(200).send({ categories: data });
    })
    .catch((err) => {
      next(err);
    });
};
