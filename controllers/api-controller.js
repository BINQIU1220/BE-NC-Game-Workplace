const fs = require("fs/promises");

exports.getAllEndpoints = (req, res, next) => {
  fs.readFile("endpoints.json", "utf8")
    .then((endpoints) => {
      const parsedEndpoints = JSON.parse(endpoints);
      res.status(200).send({ releasedEndpoints: parsedEndpoints });
    })
    .catch((err) => {
      next(err);
    });
};
