const express = require("express");
const app = express();

const { getAllCatogories } = require("./controllers/categories-controller");

const { getReviewById } = require("./controllers/reviews-controller");

// TASK 3
app.get("/api/categories", getAllCatogories);

// TASK 4
app.get("/api/reviews/:review_id", getReviewById);

app.all("/*", (req, res, next) => {
  res.status(400).send({ msg: "Bad Path" });
});

app.use((err, req, res, next) => {
  if (err.code === "42703") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(404).send({ msg: err.msg });
});

module.exports = app;
