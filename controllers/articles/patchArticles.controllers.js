// Request body accepts:

const {
  patchArticleModel,
} = require("../../models/articles/patchArticleModel.models");

// - an object in the form `{ inc_votes: newVote }`

//   - `newVote` will indicate how much the `votes` property in the database should be updated by

//   e.g.

//   `{ inc_votes : 1 }` would increment the current article's vote property by 1

//   `{ inc_votes : -100 }` would decrement the current article's vote property by 100

// Responds with:

// - the updated article

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
      //   return "error in the controller: ", err;
      next(err);
    });
};
