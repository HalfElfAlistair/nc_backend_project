const db = require("../db/data/test-data/index");
const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const testData = require("../db/data/test-data")


beforeEach(() => seed(testData));
// afterAll(() => db.end());

describe("GET /api/topics", () => {
    test("Responds with an array of topic objects, with slug and description properties", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
                const topics = res.body.topics;
                expect(topics).toBeInstanceOf(Array);
                expect(topics.length).toBe(3);
                topics.forEach(topic => {
                    expect(topic).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String)
                        })
                    )
                }) 
            })
    })
    test("returns '404 - path not found' if URL incorrect", () => {
        return request(app)
            .get("/api/toepics")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("path not found")
            }) 
    })
})