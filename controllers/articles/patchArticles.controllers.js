const {
  patchArticleModel,
} = require("../../models/articles/patchArticleModel.models");

exports.patchArticles = (req, res, next) => {
  const article_ID = req.params.article_id;
  const voteNum = req.body.inc_votes;

  patchArticleModel(article_ID, voteNum)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
