// Request body accepts:

// // - an object in the form `{ inc_votes: newVote }`

// //   - `newVote` will indicate how much the `votes` property in the database should be updated by

// //   e.g.

// //   `{ inc_votes : 1 }` would increment the current article's vote property by 1

// //   `{ inc_votes : -100 }` would decrement the current article's vote property by 100

// // Responds with:

// // - the updated article

const db = require("../../db/connection");

exports.patchArticleModel = (article_id, voteNum) => {
  return db
    .query(
      `UPDATE articles 
  SET votes = votes + $1 
  WHERE article_id = $2 
  RETURNING *;`,
      [voteNum, article_id]
    )
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article ID does not exist",
        });
      }
      return results.rows[0];
    })
    .catch((error) => {
      throw error;
    });
};
