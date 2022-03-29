const { getArticlesModel } = require("../models/getArticles.models");

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params; // This has to match the key of the actual object

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
// GET /api/articles/:article_id
// Responds with:

// - an article object, which should have the following properties:

//   - `author` which is the `username` from the users table
//   - `title`
//   - `article_id`
//   - `body`
//   - `topic`
//   - `created_at`
//   - `votes`
