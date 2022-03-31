const { getUsersModel } = require("../models/getUsersModel.models");

exports.getUsers = (req, res, next) => {
  getUsersModel()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};
