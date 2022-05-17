const request = require("supertest");
const app = require("../addCommentsApp");
const db = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  () => db.end;
});

// TASK 7
describe("GET /api/reviews/:review_id", () => {
  it("status:200, should respond with the corresponding review object added with the comment_count property/value from comments table.", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeInstanceOf(Array);
        expect(body.review[0]).toEqual(
          expect.objectContaining({ comment_count: 3 })
        );
      });
  });
  it("status:400: responds with 'Bad Request' message when passed in an invalid path", () => {
    return request(app)
      .get("/api/Hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Path");
      });
  });
  it("status: 404, responds with Not Found message when passed in an id without review.", () => {
    return request(app)
      .get("/api/reviews/666")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
  it("status:400: responds with 'Bad Request' message when passed in an invalid ID", () => {
    return request(app)
      .get("/api/reviews/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
