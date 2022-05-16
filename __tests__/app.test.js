const request = require("supertest");
const app = require("../app");
const db = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  () => db.end;
});

// TASK 3
describe("GET /api/categories", () => {
  it("status: 200, respondes with an array of category objects, each of which should have the slug and description objects.", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        const { categories } = res.body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);
        categories.forEach((catogory) => {
          expect(catogory).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  it("status: 400, responds with bad path message when passed in an incorrect request.", () => {
    return request(app)
      .get("/api/categoryyy")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Path");
      });
  });
});

// TASK 4

describe("GET /api/reviews/:review_id", () => {
  it("status:200, responds with a review object corresponding the review id.", () => {
    return request(app)
      .get(`/api/reviews/2`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toEqual([
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
