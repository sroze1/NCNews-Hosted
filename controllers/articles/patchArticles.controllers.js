const {
  patchArticleModel,
} = require("../../models/articles/patchArticleModel.models");

exports.patchArticles = (req, res, next) => {
  const article_ID = req.params.article_id;
  const voteNum = req.body.inc_votes;

  patchArticleModel(article_ID, voteNum)
    .then((article) => {
      if (article_ID !== Number) {
        res.status(400);
      }
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
