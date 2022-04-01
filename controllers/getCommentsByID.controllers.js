const {
  getCommentsForArticleByID,
} = require("../models/getCommentsforArticle.models");

exports.getCommentsByID = (req, res, next) => {
  const { article_id } = req.params;

  getCommentsForArticleByID(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
