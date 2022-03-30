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
