// Responds with:

// - an array of comments for the given `article_id` of which each comment should have the following properties:
//   - `comment_id`
//   - `votes`
//   - `created_at`
//   - `author` which is the `username` from the users table
//   - `body`

const db = require("../db/connection");

exports.getCommentsForArticleByID = async (article_id) => {
  const results = await db.query(
    `SELECT * FROM comments
    WHERE article_id = $1;`,
    [article_id]
  );

  return results.rows;
};
