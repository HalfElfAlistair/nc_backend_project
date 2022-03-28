const db = require("../db/data/test-data/index");
const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const testData = require("../db/data/test-data")


beforeEach(() => seed(testData));
// afterAll(() => db.end());

describe("GET /api/topics", () => {
    test("responds with array", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
                expect(res.body).toBeInstanceOf(Array); 
            }) 
    })
    test("responds with array of 3 topic objects", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
                expect(res.body.length).toBe(3); 
            }) 
    })
    test("objects in array have a slug propery and a description property", () => {
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
                const topics = res.body;
                topics.forEach(topic => {
                    expect(Object.keys(topic)).toEqual([ 'slug', 'description' ]);
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