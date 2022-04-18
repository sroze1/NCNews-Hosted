const express = require("express");

const { getUsers } = require("./controllers/getUsers.controllers");

const {
  patchArticles,
} = require("./controllers/articles/patchArticles.controllers");
const { getTopics } = require("./controllers/get.controllers");
const {
  getCommentsForArticle,
} = require("./controllers/commentsCount.controllers");

const {
  getCommentsByID,
} = require("./controllers/getCommentsByID.controllers");
const { postComments } = require("./controllers/post.controllers");
const {
  getArticles,
} = require("./controllers/articles/articleQueries.controllers");
const { deleteComment } = require("./controllers/deleteComments.controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id", getCommentsForArticle);

app.get("/api/articles/:article_id/comments", getCommentsByID);
app.get("/api/articles", getArticles);

app.patch("/api/articles/:article_id", patchArticles);

app.post("/api/articles/:article_id/comments", postComments);
app.delete("/api/comments/:comment_id", deleteComment);

app.use((err, req, res, next) => {
  const badReqCodes = ["42703"];

  if (badReqCodes.includes(err.code)) {
    res.status(404).send({ msg: "404: Path not found!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    return res.status(400).send({ msg: "400: Bad Request!" });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "article not found" });
  }
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
