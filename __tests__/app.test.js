const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

// correct keys?
// correct length?
// 404?

// TOPICS
describe("GET /api/topics", () => {
  test("gets all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((results) => {
        expect(results.body.topics).toEqual([
          { description: expect.any(String), slug: expect.any(String) },
          { description: expect.any(String), slug: expect.any(String) },
          { description: expect.any(String), slug: expect.any(String) },
        ]);
      });
  });

  test("is the correct length", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((results) => {
        expect(results.body.topics.length).toBe(3);
      });
  });
  test("gets 404 for incorrect path", () => {
    return request(app)
      .get("/api/topicse3u")
      .expect(404)
      .then((results) => {
        expect(results.status).toBe(404);
      });
  });
});

// describe("POST /api/articles/:article_id/comments", () => {
//   test("Adds comment to relevant column for article_id", () => {
//     return request(app)
//       .post("/api/articles/5/comments")
//       .send("test jkfnkj")
//       .then((results) => {
//         // console.log(results);
//       });
//   });
// });
