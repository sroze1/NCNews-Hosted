const { deleteCommentModel } = require("../models/deleteComments.models");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentModel(comment_id)
    .then(() => {
      res.status(204).send({ msg: "No content" });
    })
    .catch((err) => {
      next(err);
    });
};
