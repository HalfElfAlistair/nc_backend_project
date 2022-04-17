const db = require("../db/data/test-data/index");
const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const testData = require("../db/data/test-data");
const connection = require("../db/connection");


beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe("GET /api/topics", () => {
    test.only("Responds with an array of topic objects, with slug and description properties", () => {
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
    test("returns '404 - article not found' if id doesn't exist", () => {
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
    test("returns '404 - article not found' if id doesn't exist", () => {
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
    test("Responds with the article object, now including the total count of comments with this article_id", () => {
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
                    comment_count: 11
                }
                expect(article).toEqual(output);
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
                    comment_count: 0
                }
                expect(article).toEqual(output);
            })
    })
    test("returns '404 - article not found' if id doesn't exist", () => {
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

describe("GET /api/articles", () => {
    test("an articles array of article objects, each of which should match a list of provided properties.", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then((res) => {
                const articles = res.body.articles;
                expect(articles).toBeInstanceOf(Array);
                expect(articles.length).toBe(12);
                articles.forEach(article => {
                    expect(article).toEqual(
                        expect.objectContaining({
                            author: expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number),
                        })
                    )
                }) 
            })
    })
    test("Articles are sorted by date in descending order.", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then((res) => {
                const articles = res.body.articles;
                expect(articles[0].article_id).toBe(3)
                expect(articles[0].created_at).toBe("2020-11-03T09:12:00.000Z")
                expect(articles[11].article_id).toBe(7)
                expect(articles[11].created_at).toBe("2020-01-07T14:08:00.000Z")
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

describe("GET /api/articles/:article_id/comments", () => {
    test("Responds with an array of comments for the given article_id of which each comment should have have a list of specified properties.", () => {
        return request(app)
            .get("/api/articles/9/comments")
            .expect(200)
            .then((res) => {
                const comments = res.body.comments;
                expect(comments).toBeInstanceOf(Array);
                expect(comments.length).toBe(2);
                comments.forEach(comment => {
                    expect(comment).toEqual(
                        expect.objectContaining({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String),
                        })
                    )
                }) 
            })
    })
    test("Responds with an empty array if there are no comments for the article id", () => {
        return request(app)
            .get("/api/articles/4/comments")
            .expect(200)
            .then((res) => {
                const comments = res.body.comments;
                expect(comments).toBeInstanceOf(Array);
                expect(comments.length).toBe(0);
            })
    })
    test("returns '404 - path not found' if URL incorrect", () => {
        return request(app)
            .get("/api/articles/1/shrel")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("path not found")
            }) 
    })
    test("returns '404 - article not found' if id doesn't exist", () => {
        return request(app)
            .get("/api/articles/1000/comments")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("article not found")
            }) 
    })
    test("returns '400 - bad request' if id type is wrong", () => {
        return request(app)
            .get("/api/articles/one/comments")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
})

describe("POST /api/articles/:article_id/comments", () => {
    test("Takes an object with username and body properties, adds a new comment to db and responds with the posted comment.", () => {
        const newComment = { username: "icellusedkars", body: "test" };
        return request(app)
            .post("/api/articles/4/comments")
            .send(newComment)
            .expect(201)
            .then((res) => {
                const {comment} = res.body;
                expect(comment.author).toBe("icellusedkars");
                expect(comment.body).toBe("test");
            })
    })
    test("returns '404 - path not found' if URL incorrect", () => {
        return request(app)
            .get("/api/articles/4/shrel")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("path not found")
            }) 
    })
    test.only("returns '404 - article not found' if id doesn't exist", () => {
        return request(app)
            .get("/api/articles/1000/comments")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("article not found")
            }) 
    })
    test("returns '400 - bad request' if id type is wrong", () => {
        return request(app)
            .get("/api/articles/one/comments")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
    test("returns '400 - Bad Request' if no username provided", () => {
        const newComment = { username: "", body: "test" };
        return request(app)
            .post("/api/articles/4/comments")
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
    test("returns '400 - Bad Request' if keys aren't right", () => {
        const newComment = { usernam: "icellusedkars", body: "test" };
        return request(app)
            .post("/api/articles/4/comments")
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
    test("returns '400 - Bad Request' if username value is wrong type", () => {
        const newComment = { username: 5, body: "test" };
        return request(app)
            .post("/api/articles/4/comments")
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
    test("returns '400 - Bad Request' if comment body value is empty string", () => {
        const newComment = { username: "icellusedkars", body: "" };
        return request(app)
            .post("/api/articles/4/comments")
            .send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
})

describe("GET /api/articles (queries)", () => {
    test("Takes one query that filters articles array by topic.", () => {
        return request(app)
            .get("/api/articles?topic=mitch")
            .expect(200)
            .then((res) => {
                const {articles} = res.body;
                expect(articles).toBeInstanceOf(Array);
                expect(articles.length).toBe(11);
                articles.forEach(article => {
                    expect(article.topic).toEqual("mitch")
                }) 
            })
    })
    test("Takes one query that sorts articles array by a valid column, in descending order by default", () => {
        return request(app)
            .get("/api/articles?sort_by=created_at")
            .expect(200)
            .then((res) => {
                const {articles} = res.body;
                expect(articles.length).toBe(12);
                expect(articles[0].article_id).toBe(3)
                expect(articles[0].created_at).toBe("2020-11-03T09:12:00.000Z")
                expect(articles[11].article_id).toBe(7)
                expect(articles[11].created_at).toBe("2020-01-07T14:08:00.000Z")
            })
    })
    test("Takes query that sorts articles array by a valid column in ascending order", () => {
        return request(app)
            .get("/api/articles?sort_by=created_at&order=asc")
            .expect(200)
            .then((res) => {
                const {articles} = res.body;
                expect(articles.length).toBe(12);
                expect(articles[0].article_id).toBe(7)
                expect(articles[0].created_at).toBe("2020-01-07T14:08:00.000Z")
                expect(articles[11].article_id).toBe(3)
                expect(articles[11].created_at).toBe("2020-11-03T09:12:00.000Z")
            })
    })
    test("Takes query that sorts articles array by a valid column in ascending order and only shows those of a queried topic", () => {
        return request(app)
            .get("/api/articles?topic=mitch&sort_by=created_at&order=asc")
            .expect(200)
            .then((res) => {
                const {articles} = res.body;
                expect(articles.length).toBe(11);
                articles.forEach(article => {
                    expect(article.topic).toEqual("mitch")
                }) 
                expect(articles[0].article_id).toBe(7)
                expect(articles[0].created_at).toBe("2020-01-07T14:08:00.000Z")
                expect(articles[10].article_id).toBe(3)
                expect(articles[10].created_at).toBe("2020-11-03T09:12:00.000Z")
            })
    })
    test("returns 400 Invalid sort query if sort_by value isn't a valid column", () => {
        return request(app)
            .get("/api/articles?sort_by=shrel")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("invalid sort query")
            }) 
    })
    test("returns 400 invalid sort query if sort_by value isn't a valid column", () => {
        return request(app)
            .get("/api/articles?order=shrel")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("invalid order query")
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

describe("DELETE /api/comments/:comment_id", () => {
    test("deletes the given comment by comment_id and responds with status 204 and no content", () => {
        return request(app)
            .delete('/api/comments/1')
            .expect(204);
    })
    test("returns '404 - path not found' if URL incorrect", () => {
        return request(app)
            .delete("/api/shrel/1")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("path not found")
            }) 
    })
    test("returns '404 - comment not found' if id doesn't exist", () => {
        return request(app)
            .delete("/api/comments/1000")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("comment not found")
            }) 
    })
    test("returns '400 - bad request' if id type is wrong", () => {
        return request(app)
            .delete("/api/comments/one")
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("bad request")
            }) 
    })
})