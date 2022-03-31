const db = require("../db/connection");

exports.getUsersModel = () => {
  return db.query(`SELECT username FROM users`).then((results) => {
    return results.rows;
  });
};
