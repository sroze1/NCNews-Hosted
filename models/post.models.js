const db = require("../db/connection");

exports.postCommentsModel = (article_id, comment) => {
  return db
    .query(
      `INSERT into comments 
    VALUES ${comment}
    WHERE article_id = ${article_id}
    RETURNING *;`
    )
    .then((results) => {
      console.log(results.rows, "<< 1");
      console.log(results.rows[0], "<< 2");
      return results.rows[0];
    });
};
