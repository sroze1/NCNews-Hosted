const express = require("express");
const { getTopics } = require("./controllers/get.controllers");

const { postComments } = require("./controllers/post.controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.post("/api/comments/:article_id/comments", postComments);

app.use((err, req, res, next) => {
  res.status(404).send({ msg: "404: Path not found!" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
