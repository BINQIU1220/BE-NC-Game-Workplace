const app = require("../app");
const request = require("supertest");

describe("GET /api", () => {
  test("status:200, respondes with a list of description of all the currently released endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.releasedEndpoints).toHaveProperty("GET /api");
        expect(body.releasedEndpoints).toHaveProperty("GET /api/categories");
        expect(body.releasedEndpoints).toHaveProperty("GET /api/reviews");
        expect(body.releasedEndpoints).toHaveProperty(
          "GET /api/reviews/:review_id"
        );
        expect(body.releasedEndpoints).toHaveProperty(
          "More Endpoints to be realease soon"
        );
      });
  });
});
