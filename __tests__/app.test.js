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
    xtest("Responds with an article object, which should match a list of provided properties.", () => {
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
    test("returns '400 - bad request' if id type is wrong", () => {
        return request(app)
            .get("/api/articles/one")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
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
                expect(article.article_id).toBe(1);
                expect(article.votes).toBe(105);
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
    test("returns '400 - bad request' if id type is wrong", () => {
        return request(app)
            .get("/api/articles/one")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
    test("returns '400 - Bad Request' if no content provided", () => {
        const articleUpdate = {};
        return request(app)
            .patch("/api/articles/1")
            .send(articleUpdate)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
    test("returns '400 - Bad Request' if keys are entered incorrectly", () => {
        const articleUpdate = { inc_voted: 5 };
        return request(app)
            .patch("/api/articles/1")
            .send(articleUpdate)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
    test("returns '400 - Bad Request' if data type entered is incorrect", () => {
        const articleUpdate = { inc_votes: "five" };
        return request(app)
            .patch("/api/articles/1")
            .send(articleUpdate)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
})

describe("GET /api/users", () => {
    test("Responds with an array of objects, each object should have a username property.", () => {
        return request(app)
            .get("/api/users")
            .expect(200)
            .then((res) => {
                const users = res.body.users;
                expect(users).toBeInstanceOf(Array);
                expect(users.length).toBe(4);
                users.forEach(user => {
                    expect(user).toEqual(
                        expect.objectContaining({
                            username: expect.any(String)
                        })
                    )
                }) 
            })
    })
    test("returns '404 - path not found' if URL incorrect", () => {
        return request(app)
            .get("/api/shrel")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("path not found")
            }) 
    })
})

describe("GET /api/articles/:article_id (comment count)", () => {
    test.only("Responds with the article object, now including the total count of comments with this article_id", () => {
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
                    votes: 100,
                    comment_count: "11"
                }
                expect(article).toEqual(output);
                expect(article.comment_count).toMatch(/^[0-9]+$/);
            })
    })
    test("Responds with the article object, and comment count of 0 when there are none matching the article_id", () => {
        return request(app)
            .get("/api/articles/4")
            .expect(200)
            .then((res) => {
                const article = res.body.article;
                const output = {
                    author: "rogersop",
                    title: "Student SUES Mitch!",
                    article_id: 4,
                    body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
                    topic: "mitch",
                    created_at: "2020-05-06T01:14:00.000Z",
                    votes: 0,
                    comment_count: "0"
                }
                expect(article).toEqual(output);
                expect(article.comment_count).toMatch(/^[0-9]+$/);
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
    test("returns '400 - bad request' if id type is wrong", () => {
        return request(app)
            .get("/api/articles/one")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
})

