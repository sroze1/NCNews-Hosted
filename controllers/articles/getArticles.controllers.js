const { getArticleModel } = require("../../models/articles/getArticles.models");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;

  getArticleModel(article_id)
    .then((article) => {
      res.status(200);
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
