const request = require("supertest");
const app = require("../app");
const db = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  () => db.end;
});

// TASK 9
describe("GET /api/reviews/:review_id/comments", () => {
  it("status:200, responds an array of comments for the given review_id of which each comment should have the required properties.", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments).toHaveLength(3);
        body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              review_id: expect.any(Number),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
  it("status: 200, responds with an empty array when there is no comments for the passed in review ID.", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((data) => {
        expect(data.body).toEqual([]);
      });
  });
});
it("status: 404, responds with review not found message when passed in an id without review.", () => {
  return request(app)
    .get("/api/reviews/666/comments")
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe("Not Found");
    });
});
it("status: 400, responds with invalid request message when passed in invalid id ou somethings else.", () => {
  return request(app)
    .get("/api/reviews/banana/comments")
    .expect(400)
    .then((res) => {
      expect(res.body.msg).toBe("Bad Request");
    });
});

// TASK 10
describe("POST /api/reviews/:review_id/comments", () => {
  it("status:201: responds with the newly posted comment of the corresponding review ID", () => {
    const newComment = {
      username: "bainesface",
      body: "banana",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toEqual(
          expect.objectContaining({
            comment_id: 7,
            body: "banana",
            votes: 0,
            author: "bainesface",
            review_id: 1,
          })
        );
      });
  });
  it("status:201: responds with the newly posted comment of the corresponding review ID and igore extra properties in the input", () => {
    const newComment = {
      username: "bainesface",
      body: "banana",
      XZ_58: "pineapple",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toEqual(
          expect.objectContaining({
            comment_id: 7,
            body: "banana",
            votes: 0,
            author: "bainesface",
            review_id: 1,
          })
        );
      });
  });
  it("status 400: responds with message 'Bad Request' when no input is passed in", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("status 400: responds with message 'Bad Request' when passed in input does not contain both mandatory keys", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ body: "Banana" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("status 404: responds with message 'Not Found' when passed in an ID without review", () => {
    const newComment = {
      username: "bainesface",
      body: "banana",
    };
    return request(app)
      .post("/api/reviews/666/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  it("status 400: responds with message 'Bad Request' when passed in an invalid ID", () => {
    const newComment = {
      username: "bainesface",
      body: "banana",
    };
    return request(app)
      .post("/api/reviews/banana/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("status 404: responds with message 'Not Found' when a user not in the database tries to post", () => {
    const newComment = {
      username: "Banana",
      body: "I love pineapple!",
    };
    return request(app)
      .post("/api/reviews/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

// TASK 12
describe("DELETE /api/comments/:comment_id", () => {
  it("status:204, responds with 204 status code", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });
  it("status 404: responds with 'Not Found' when passed a comment ID without comments", () => {
    return request(app)
      .delete("/api/comments/666")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  it("status:400, responds with 'Bad Request' when passed an invalid ID", () => {
    return request(app)
      .delete("/api/comments/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it.only("status:400, responds with 'Bad Request' when passed more than one ID", () => {
    return request(app)
      .delete("/api/comments/3 4")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
