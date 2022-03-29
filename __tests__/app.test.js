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

describe("GET /api/topics", () => {
  test("gets all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((results) => {
        console.log(results.body);
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
