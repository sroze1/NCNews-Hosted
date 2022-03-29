const db = require("../db/connection");

exports.getArticlesModel = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((results) => {
      return results.rows; // we return [0] because the row is stored inside of an array element of 0.
    })
    .catch((error) => {
      throw error;
    });
};
