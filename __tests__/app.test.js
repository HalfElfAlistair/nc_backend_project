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

describe("GET /api/articles/:article_id", () => {
    test("Responds with an article object, which should match a list of provided properties.", () => {
        return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then((res) => {
                const article = res.body.article;
                const output = {
                    author: "butter_bridge",
                    title: "Living in the shadow of a great man",
                    article_id: 1,
                    body: "I find this existence challenging",
                    topic: "mitch",
                    created_at: "2020-07-09T20:11:00.000Z",
                    votes: 100
                }
                expect(article).toEqual(output);
            })
    })
    test("returns '404 - path not found' if id doesn't exist", () => {
        return request(app)
            .get("/api/articles/1000")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("article not found")
            }) 
    })
    test("returns '400 - invalid ID' if id type is wrong", () => {
        return request(app)
            .get("/api/articles/one")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad Request")
            }) 
    })
})

describe("PATCH /api/articles/:article_id", () => {
    test("responds with the updated article", () => {
        const articleUpdate = { inc_votes: 5 };
        return request(app)
            .patch("/api/articles/1")
            .send(articleUpdate)
            .expect(200)
            .then((res) => {
                const article = res.body.article;
                expect(article.votes).toBe(105);
            })
    })
})