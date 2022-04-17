// POST /api/articles/:article_id/comments
const { postCommentsModel } = require("../models/post.models");

exports.postComments = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  postCommentsModel(article_id, comment)
    .then((newComment) => {
      res.status(201).send(newComment);
    })
    .catch((error) => {
      console.log(error, "<< error in controller");
      next(error);
    });
};
