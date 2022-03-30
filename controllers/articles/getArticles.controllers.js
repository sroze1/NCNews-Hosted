const { getArticlesModel } = require("../../models/articles/getArticles.models");

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params;

  getArticlesModel(article_id)
    .then((article) => {
      res.status(200);
      res.send({ article });
    })
    .catch((err) => {
      console.log("error:", err);
      next(err);
    });
};
