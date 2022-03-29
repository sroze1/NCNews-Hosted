// POST /api/articles/:article_id/comments
const { postCommentsModels } = require("../models/post.models");

exports.postComments = (req, res) => {
  const comment = req.body;
  const { article_id } = req.params;
  postCommentsModels(article_id, comment).then((results) => {
    res.status(200).send({ results });
  });
};
