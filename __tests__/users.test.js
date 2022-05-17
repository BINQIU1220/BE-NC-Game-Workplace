const request = require("supertest");
const app = require("../app");
const db = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  () => db.end;
});

// Task 6
describe("GET /api/users", () => {
  it("status:200, should respond with an array of user objects.", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toBeInstanceOf(Array);
        expect(body.users).toHaveLength(4);
        body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  it("status:400: responds with 'Bad Request' message when passed in an invalid path", () => {
    return request(app)
      .get("/api/user")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Path");
      });
  });
});
