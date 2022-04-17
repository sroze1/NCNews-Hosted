const db = require("../db/connection");

exports.postCommentsModel = async (article_id, comment) => {
  const results = await db.query(
    "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;",
    [comment.body, comment.username, article_id]
  );

  return results.rows[0];
};
