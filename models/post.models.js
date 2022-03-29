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
      //         INSERT INTO table_name (column1, column2, column3, ...)
      // VALUES (value1, value2, value3, ...);
      console.log(results.rows, "<< 1");
      console.log(results.rows[0], "<< 2");
      return results.rows[0];
    });
};
