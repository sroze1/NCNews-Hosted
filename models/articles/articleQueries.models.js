const db = require("../../db/connection");

exports.articleQueries = async (
  sortQuery = "created_at",
  orderQuery = "ASC",
  topicQuery
) => {
  let queryString = `SELECT articles.*, COUNT(comments.article_id)::INT AS comment_count
  FROM articles 
  LEFT JOIN comments ON comments.article_id = articles.article_id`;
  if (topicQuery) {
    queryString += ` WHERE topic = '${topicQuery}'`;
  }
  queryString += ` GROUP BY articles.article_id`;
  queryString += ` ORDER BY ${sortQuery} ${orderQuery};`;
  const results = await db.query(queryString);
  return results.rows;
};
