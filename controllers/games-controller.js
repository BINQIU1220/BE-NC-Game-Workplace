const { fetchAllCatogories } = require("../models/games-model");

exports.getAllCatogories = (req, res, next) => {
  fetchAllCatogories()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};