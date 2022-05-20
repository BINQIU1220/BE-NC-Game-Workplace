const express = require("express");
const app = express();

const { getAllCatogories } = require("./controllers/categories-controller");

const {
  getReviewById,
  patchVotesById,
  getAllReviews,
} = require("./controllers/reviews-controller");

const {
  getCommentsById,
  postCommentsById,
} = require("./controllers/comments-controller");

const { getAllUsers } = require("./controllers/users-controller");

app.use(express.json());

// TASK 3
app.get("/api/categories", getAllCatogories);

// TASK 4, 7
app.get("/api/reviews/:review_id", getReviewById);

// TASK 5
app.patch("/api/reviews/:review_id", patchVotesById);

// TASK 6
app.get("/api/users", getAllUsers);

// TASK 8 and 11
app.get("/api/reviews", getAllReviews);

// TASK 9
app.get("/api/reviews/:review_id/comments", getCommentsById);

// TASK 10
app.post("/api/reviews/:review_id/comments", postCommentsById);

//Bad Path Error
app.all("/*", (req, res, next) => {
  res.status(400).send({ msg: "Bad Path" });
});

// PSQL Errors
app.use((err, req, res, next) => {
  if (err.code === "42703" || err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else next(err);
});

//Custom Errors
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  } else {
    res.status(400).send({ msg: err.msg });
  }
});

module.exports = app;
