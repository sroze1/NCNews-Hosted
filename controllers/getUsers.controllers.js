const { getUsersModel } = require("../models/getUsersModel.models");

exports.getUsers = (req, res, next) => {
  const usersArrayObject = [];
  getUsersModel()
    .then((users) => {
      users.forEach((user) => {
        usersArrayObject.push({ username: user.username });
      });
      res.status(200).send(usersArrayObject);
    })
    .catch((err) => {
      next(err);
    });
};
