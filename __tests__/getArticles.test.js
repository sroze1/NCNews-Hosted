const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

const testArticles = {
  article: [
    {
      article_id: 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: "2020-07-09T20:11:00.000Z",
      votes: 100,
    },
  ],
};

describe("GET /api/articles/:article_id", () => {
  test("gets all topics", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((results) => {
        expect(results.body).toEqual(testArticles);
      });
  });
  test("Matches keys length in the correct format", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((results) => {
        expect(results.body.article).toEqual([
          {
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          },
        ]);
      });
  });
  test("gets 404 for incorrect path", () => {
    return request(app)
      .get("/api/articlese3u")
      .expect(404)
      .then((results) => {
        expect(results.status).toBe(404);
      });
  });
});
