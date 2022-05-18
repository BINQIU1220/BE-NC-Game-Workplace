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
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            review_id: expect.any(Number),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          });
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
it("status: 400, responds with 'Bad Path' message when passed in an incorrect request.", () => {
  return request(app)
    .get("/api/comments")
    .expect(400)
    .then((res) => {
      expect(res.body.msg).toBe("Bad Path");
    });
});
