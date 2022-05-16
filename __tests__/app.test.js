const request = require("supertest");
const app = require("../app");
const db = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  if (db.end) db.end();
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
  it("status: 404, responds with bad request message when passed in an incorrect request.", () => {
    return request(app)
      .get("/api/categoryyy")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("bad path");
      });
  });
});
