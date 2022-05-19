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
            comment_count: "3",
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
describe("PATCH /api/reviews/:review_id", () => {
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
  it("status:200, responds with the updated review when passed in a negative voteInfo.", () => {
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

// TASK 8 and 11
describe("GET /api/reviews", () => {
  it("status:200, responds an array of reviews with default order and sort.", () => {
    return request(app)
      .get("/api/reviews/")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeInstanceOf(Array);
        expect(body.reviews).toHaveLength(13);
        expect(body.reviews).toBeSortedBy("created_at", { descending: true });
        body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              owner: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              title: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
  it("status:200, responds an array of reviews sorted by comment_count", () => {
    return request(app)
      .get("/api/reviews?sort_by=comment_count")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy("comment_count", {
          descending: true,
        });
      });
  });
  it("status:200, respondes with reviews filtered by category queried", () => {
    return request(app)
      .get(`/api/reviews?category=euro game`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toHaveLength(1);
        expect(body.reviews[0].category).toBe("euro game");
      });
  });
  it("status:200, respondes with reviews sorted by comment_count ACS", () => {
    return request(app)
      .get("/api/reviews?sort_by=comment_count&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("comment_count", {
          ascending: true,
        });
      });
  });
  it("status:200, respondes with reviews filtered by category sorted by comment_count ACS", () => {
    return request(app)
      .get(
        "/api/reviews?category=social deduction&order=asc&sort_by=comment_count"
      )
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeInstanceOf(Array);
        expect(body.reviews).toHaveLength(11);
        expect(body.reviews).toBeSortedBy("comment_count", {
          ascending: true,
        });
        body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              category: "social deduction",
            })
          );
        });
      });
  });
  it("status:200, responds with an empty array when filtered by category queired that doesn not have matching reviews", () => {
    return request(app)
      .get(`/api/reviews?category=children's games`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toEqual([]);
      });
  });
  it("status:400, responds with 'Bad Path' message when passed in an incorrect request.", () => {
    return request(app)
      .get("/api/reviewsssssss")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Path");
      });
  });
  it("status:404, responds with 'Not Found' message when passed in a non-existing category", () => {
    return request(app)
      .get("/api/reviews?category=banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  it("status:404, responds with 'Not Found' message when passed in an existing category but with typo", () => {
    return request(app)
      .get("/api/reviews?category=euro  game")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  it("status:404, responds with 'Not Found' message when passed in an existing category but written in uppercase letters", () => {
    return request(app)
      .get("/api/reviews?category=Euro Game")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  it("status:400, responds with 'Bad Request' message when passed in an invalid sort_by", () => {
    return request(app)
      .get("/api/reviews?sort_by=banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("status:400, responds with 'Bad Request' message when passed in an invalid order", () => {
    return request(app)
      .get("/api/reviews?order=banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

//the error with whitespaces could be elimited in the future by refactoring code to reduce whitespaces to only one

//the error with upper-or-lowercase could be elimited in the future by refactoring code to convert all input letters to lowercase when the values in the column are all lowercases
