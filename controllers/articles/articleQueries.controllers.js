const {
  articleQueries,
} = require("../../models/articles/articleQueries.models");

exports.getArticles = (req, res, next) => {
  const orderQuery = req.query.order;
  const sortQuery = req.query.sort_by;
  const topicQuery = req.query.topic;
  articleQueries(sortQuery, orderQuery, topicQuery)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};
