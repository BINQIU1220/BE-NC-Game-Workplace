const request = require("supertest");
const app = require("../app");
const db = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  () => db.end;
});

// TASK 4

describe("GET /api/reviews/:review_id", () => {
  it("status:200, responds with a review object corresponding the review id.", () => {
    return request(app)
      .get(`/api/reviews/2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual([
          {
            review_id: 2,
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
          },
        ]);
      });
  });
  it("status: 404, responds with review not found message when passed in an id without review.", () => {
    return request(app)
      .get("/api/reviews/666")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
  it("status: 400, responds with invalid request message when passed in invalid id ou somethings else.", () => {
    return request(app)
      .get("/api/reviews/banana")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});

// Task 5
describe.only("PATCH /api/reviews/:review_id", () => {
  it("status:200, should respond with the updated review object when passed a positive voteInfo.", () => {
    const voteInfo = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/reviews/2")
      .send(voteInfo)
      .expect(200)
      .then(({ body }) => {
        expect(body.review.votes).toBe(6);
      });
  });
  it("status:200, responds with the updated review when passed in a nagetive voteInfo.", () => {
    const voteInfo = {
      inc_votes: -2,
    };
    return request(app)
      .patch("/api/reviews/1")
      .send(voteInfo)
      .expect(200)
      .then(({ body }) => {
        expect(body.review.votes).toBe(-1);
      });
  });
  it("status:400: responds with 'Bad Request' message when passed in an invalid ID", () => {
    const voteInfo = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/reviews/banana")
      .send(voteInfo)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("status:404: responds with 'Not Found' message when passed in an id without review", () => {
    const voteInfo = {
      inc_votes: 1,
    };
    return request(app)
      .patch("/api/reviews/666")
      .send(voteInfo)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  it("status:400: responds with 'Bad Request' message when no input is passed in", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("status:400: responds with 'Bad Request' message when passed in an invalide voteInfo", () => {
    const voteInfo = {
      inc_votes: "Hiya",
    };
    return request(app)
      .patch("/api/reviews/2")
      .send(voteInfo)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
