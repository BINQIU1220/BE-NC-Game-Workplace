const express = require("express");
const app = express();

const { addComments } = require("./controllers/addComments-controller");

app.use(express.json());

// TASK 7
app.get("/api/reviews/:review_id", addComments);

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
