const db = require("../db/connection");

exports.getTopicsModel = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};
