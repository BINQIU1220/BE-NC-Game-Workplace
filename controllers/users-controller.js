const { fetchAllUsers } = require("../models/users-model");

// TASK 6
exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((data) => {
      res.status(200).send({ users: data });
    })
    .catch((err) => {
      next(err);
    });
};
