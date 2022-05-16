const express = require("express");
const app = express();

const { getAllCatogories } = require("./controllers/games-controller");

app.use(express.json());

// TASK 3
app.get("/api/categories", getAllCatogories);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "bad path" });
});

app.listen(9090, (err) => {
  if (err) console.log(err, "<<<<<err");
  else console.log("Listening on port 9090.....");
});

module.exports = app;
