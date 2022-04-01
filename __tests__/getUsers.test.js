const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));

afterAll(() => {
  db.end();
});

describe("GET /api/users", () => {
  test("get request on app returns all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((results) => {
        results.body.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
          });
        });
      });
  });

  test("get request on app returns the correct length of an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((results) => {
        expect(results.body.length).toBe(4);
      });
  });
  test("gets 404 for incorrect path", () => {
    return request(app)
      .get("/api/users3u")
      .expect(404)
      .then((results) => {
        expect(results.status).toBe(404);
      });
  });
});
