const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

describe("PATCH /api/articles/:article_id", () => {
  test("Returns the article object", () => {
    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send({ inc_votes: 100 })
      .then((results) => {
        expect(results.body.article).toEqual({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });

  test("Updates the votes correctly", () => {
    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send({ inc_votes: 100 })
      .then((results) => {
        expect(results.body.article.votes).toEqual(200);
      });
  });
  test("returns 404 for incorrect path", () => {
    return request(app)
      .get("/api/articlese3u")
      .expect(404)
      .then((results) => {
        expect(results.status).toBe(404);
      });
  });
  test("returns 400 for bad request / incorrect ID path", () => {
    return request(app)
      .get("/api/articles/3u")
      .expect(400)
      .then((results) => {
        expect(results.status).toBe(400);
      });
  });
});
