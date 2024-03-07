const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Post = require("../models/posts"); // Adjust the path based on your structure
let token = null;

beforeAll(async () => {
    await Post.deleteMany({});
    // Create a test user and login to obtain a token
    // Adjust these requests according to your user model and authentication API
    await api.post("/api/users").send({ userTag: "testUser", password: "R3g5T7#gh", email: "test@example.com" });
    const response = await api.post("/api/auth/login").send({ password: "R3g5T7#gh", userTag: "testUser" });
    token = response.body.accessToken;
});

describe('PostController', () => {
    describe('POST /api/posts', () => {
        it('should create a new post', async () => {
            const postData = {
                title: 'Test Title',
                description: 'Test Description',
                start: new Date(),
                end: new Date(),
                location: 'Test Location',
                categories: ['Test Category'],
                tags: ['Test Tag'],
                host: new mongoose.Types.ObjectId(),
                images: ['test.jpg'],
            };

            const response = await api.post('/api/posts').set('Authorization', `${token}`).send(postData);
            expect(response.status).toBe(201);
            expect(response.body.title).toBe(postData.title);
        });
    });

    describe('GET /api/posts', () => {
        it('should retrieve all posts', async () => {
            const response = await api.get('/api/posts').set('Authorization', `${token}`);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });

    describe('GET /api/posts/:id', () => {
        it('should retrieve a post by id', async () => {
            const post = new Post({
                title: 'Test Title',
                description: 'Test Description',
                start: new Date(),
                end: new Date(),
                location: 'Test Location',
                categories: ['Test Category'],
                tags: ['Test Tag'],
                host: new mongoose.Types.ObjectId(),
                images: ['test.jpg'],
            });
            await post.save();

            const response = await api.get(`/api/posts/${post._id}`).set('Authorization', `${token}`);
            expect(response.status).toBe(200);
            expect(response.body.title).toBe(post.title);
        });
    });

    

    describe('DELETE /api/posts/:id', () => {
        it('should delete a post', async () => {
            const post = new Post({
                title: 'Test Title',
                description: 'Test Description',
                host: new mongoose.Types.ObjectId(),
                location: 'Test Location',
                start: new Date(),
                end: new Date(),
                categories: ['Test Category'],
                tags: ['Test Tag'],

               
            });
            await post.save();

            const response = await api.delete(`/api/posts/${post._id}`).set('Authorization', `${token}`);
            expect(response.status).toBe(200);

            const checkPost = await Post.findById(post._id);
            expect(checkPost).toBeNull();
        });
    });

    // Add other tests as necessary
});

afterAll(() => {
    mongoose.connection.close();
});
