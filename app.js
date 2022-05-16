const express = require("express");
const app = express();

const { getAllCatogories } = require("./controllers/games-controller");

// TASK 3
app.get("/api/categories", getAllCatogories);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "bad path" });
});

module.exports = app;
