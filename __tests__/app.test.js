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

// Skipped because reused with updated column
// describe("GET /api/articles/:article_id", () => {
//   test("gets all topics", async () => {
//     const results = await request(app).get("/api/articles/1").expect(200);
//     expect(results.body).toEqual(testArticles);
//   });
//   test("Matches keys length in the correct format", async () => {
//     const results = await request(app).get("/api/articles/1").expect(200);
//     expect(results.body.article).toEqual([
//       {
//         article_id: expect.any(Number),
//         title: expect.any(String),
//         topic: expect.any(String),
//         author: expect.any(String),
//         body: expect.any(String),
//         created_at: expect.any(String),
//         votes: expect.any(Number),
//       },
//     ]);
//   });
//   test("gets 404 for incorrect path", async () => {
//     const results = await request(app).get("/api/articlese3u").expect(404);
//     expect(results.status).toBe(404);
//   });
//   test("gets 400 for bad request", async () => {
//     const results = await request(app).get("/api/articles/3u").expect(400);
//     expect(results.status).toBe(400);
//   });
// });

describe("GET /api/users", () => {
  test("get request on app returns all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((results) => {});
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

describe("GET /api/articles/:article_id returns new column of comment count", () => {
  test("article with relevant ID is returned ", async () => {
    const results = await request(app).get("/api/articles/3").expect(200);
    expect(results.body.results.comment_count).toBe(2);
  });
  test("Matches keys length in the correct format", async () => {
    const results = await request(app).get("/api/articles/3").expect(200);
    expect(results.body.results).toEqual({
      article_id: expect.any(Number),
      title: expect.any(String),
      topic: expect.any(String),
      author: expect.any(String),
      body: expect.any(String),
      created_at: expect.any(String),
      votes: expect.any(Number),
      comment_count: expect.any(Number),
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
  test("gets 400 for bad request", () => {
    return request(app)
      .get("/api/articles/3u")
      .expect(400)
      .then((results) => {
        expect(results.status).toBe(400);
      });
  });
});

describe("GET /api/articles/:article_id/comments returns an array of all the comments", () => {
  test("returns the correct array", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((results) => {
        results.body.comments.forEach((result) => {
          expect(result).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            article_id: expect.any(Number),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          });
        });
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
  test("gets 400 for bad request", () => {
    return request(app)
      .get("/api/articles/3u")
      .expect(400)
      .then((results) => {
        expect(results.status).toBe(400);
      });
  });
});

describe("POST/api/:article_id/comments", () => {
  test("201: returns an object", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "rogersop",
        body: "Damn son where'd you find this",
      })
      .expect(201)
      .then((results) => {
        expect(typeof results.body).toBe("object");
      });
  });
  test("201: returns the correct object", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "rogersop",
        body: "Damn son where'd you find this",
      })
      .expect(201)
      .then((results) => {
        expect(results.body).toEqual({
          comment_id: expect.any(Number),
          body: expect.any(String),
          article_id: expect.any(Number),
          author: expect.any(String),
          votes: expect.any(Number),
          created_at: expect.any(String),
        });
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
  test("gets 400 for bad request", () => {
    return request(app)
      .get("/api/articles/3u")
      .expect(400)
      .then((results) => {
        expect(results.status).toBe(400);
      });
  });
});

describe("GET/api/articles applied with sorting can filter results", () => {
  test("200: sort_by defaults to sorted by date", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeSortedBy("created_at", { ascending: true });
      });
  });
  test("200: sorts by user selected query and order", () => {
    return request(app)
      .get("/api/articles?order=desc&sort_by=author")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeSortedBy("author", { descending: true });
      });
  });
  test("200: sorts by user selected query, order and topic", () => {
    return request(app)
      .get("/api/articles?order=desc&sort_by=author&topic=cats")
      .expect(200)
      .then((res) => {
        res.body.forEach((article) => {
          expect(article.topic).toBe("cats");
        });
        expect(res.body).toBeSortedBy("author", { descending: true });
      });
  });
});
