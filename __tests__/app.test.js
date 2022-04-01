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
  test("gets all topics", async () => {
    const results = await request(app).get("/api/topics").expect(200);
    expect(results.body.topics).toEqual([
      { description: expect.any(String), slug: expect.any(String) },
      { description: expect.any(String), slug: expect.any(String) },
      { description: expect.any(String), slug: expect.any(String) },
    ]);
  });

  test("is the correct length", async () => {
    const results = await request(app).get("/api/topics").expect(200);
    expect(results.body.topics.length).toBe(3);
  });
  test("gets 404 for incorrect path", async () => {
    const results = await request(app).get("/api/topicse3u").expect(404);
    expect(results.status).toBe(404);
  });
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
  test("gets all topics", async () => {
    const results = await request(app).get("/api/articles/1").expect(200);
    expect(results.body).toEqual(testArticles);
  });
  test("Matches keys length in the correct format", async () => {
    const results = await request(app).get("/api/articles/1").expect(200);
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
  test("gets 404 for incorrect path", async () => {
    const results = await request(app).get("/api/articlese3u").expect(404);
    expect(results.status).toBe(404);
  });
  test("gets 400 for bad request", async () => {
    const results = await request(app).get("/api/articles/3u").expect(400);
    expect(results.status).toBe(400);
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("Returns the article object", async () => {
    const results = await request(app)
      .patch("/api/articles/1")

      .expect(200)
      .send({ inc_votes: 100 });
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

  test("Updates the votes correctly", async () => {
    const results = await request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send({ inc_votes: 100 });
    expect(results.body.article.votes).toEqual(200);
  });
  test("returns 404 for incorrect path", async () => {
    const results = await request(app).patch("/api/articlese3u").expect(404);
    expect(results.status).toBe(404);
  });
  test("returns 400 for bad request / incorrect ID path", async () => {
    const results = await request(app).patch("/api/articles/3u").expect(400);
    expect(results.status).toBe(400);
  });
});

describe("GET /api/users", () => {
  test("get request on app returns all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((results) => {
        console.log(results.body);
      });
  });

  test("get request on app returns the correct length of an array", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((results) => {
        expect(results.body.users.length).toBe(4);
      });
  });
  test("gets 404 for incorrect path", () => {
    return request(app)
      .get("/api/users3u")
      .expect(404)
      .then((results) => {
        expect(results.status).toBe(404);
      });

      .expect(200)
      .send({ inc_votes: 100 });
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

  test("Updates the votes correctly", async () => {
    const results = await request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send({ inc_votes: 100 });
    expect(results.body.article.votes).toEqual(200);
  });
  test("returns 404 for incorrect path", async () => {
    const results = await request(app).patch("/api/articlese3u").expect(404);
    expect(results.status).toBe(404);
  });
  test("returns 400 for bad request / incorrect ID path", async () => {
    const results = await request(app).patch("/api/articles/3u").expect(400);
    expect(results.status).toBe(400);

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
