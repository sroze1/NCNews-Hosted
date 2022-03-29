// GET /api/topics

const { getTopicsModel } = require("../models/get.models");

exports.getTopics = (req, res, next) => {
  console.log("ANYTHING JDNJSFDNJ");
  getTopicsModel()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log("error in controller:", err);
      next(err);
    });
};
