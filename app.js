const express = require("express");
const app = express();

const { getAllCatogories } = require("./controllers/categories-controller");

const {
  getReviewById,
  patchVotesById,
} = require("./controllers/reviews-controller");

app.use(express.json());

// TASK 3
app.get("/api/categories", getAllCatogories);

// TASK 4
app.get("/api/reviews/:review_id", getReviewById);

// TASK 5
app.patch("/api/reviews/:review_id", patchVotesById);

//Bad Path Error
app.all("/*", (req, res, next) => {
  res.status(400).send({ msg: "Bad Path" });
});
// PSQL Errors
app.use((err, req, res, next) => {
  if (err.code === "42703") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});
//Custom Errors
app.use((err, req, res, next) => {
  res.status(404).send({ msg: err.msg });
});

module.exports = app;
