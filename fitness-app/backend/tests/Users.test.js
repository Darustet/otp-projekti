const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { User, SensitiveData } = require("../models/users");
let token = null;

beforeAll(async () => {
    //await SensitiveData.deleteMany({});
    //await User.deleteMany({});
    const response = await api.post("/api/auth/login").send({ password: "R3g5T7#gh", userTag: "testUser" });
    token = response.body.accessToken;
});

describe("User Controller Tests", () => {
  

    describe("GET /api/users", () => {
        it("should return all users", async () => {
            const response = await api.get("/api/users").set('Authorization', token);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });

    describe("GET /api/users/:id", () => {
        it("should return 404 if the id does not exists", async () => {
            const userId = new mongoose.Types.ObjectId();
            const response = await api.get(`/api/users/${userId}`).set('Authorization', token);
            expect(response.status).toBe(404);
         
        });

        it("should return 404 if the user does not exist", async () => {
            const response = await api.get("/api/users/invalidId123").set('Authorization', token);
            expect(response.status).toBe(404);
        });
    });

    describe("GET /api/users/userTag/:userTag", () => {
        it("should return a user if the userTag exists", async () => {
            const response = await api.get(`/api/users/userTag/testUser`).set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body.userTag).toBe("testUser");
        });

        it("should return 404 if the userTag does not exist", async () => {
            const response = await api.get(`/api/users/userTag/unknownUserTag`).set('Authorization', token);
            expect(response.status).toBe(404);
        });
    });

    // // describe("POST /api/users", () => {
    // //     it("should create a new user", async () => {
    // //         const newUser = {
    // //             userTag: "newUser",
    // //             email: "newuser@test.com",
    // //             password: "Pass1234!",
    // //         };
    // //         const response = await api.post("/api/users").set('Authorization', token).send(newUser);
    // //         expect(response.status).toBe(201);
    // //         expect(response.body.userTag).toBe(newUser.userTag);
    // //     });

    //     it("should return 409 if the email already exists", async () => {
    //         const response = await api.post("/api/users").set('Authorization', token).send({ email: "test@mail.com", password: "R3g5T7#gh", userTag: "testUserDuplicate" });
    //         expect(response.status).toBe(409);
    //     });

    //     it("should return 400 if required fields are missing", async () => {
    //         const response = await api.post("/api/users").set('Authorization', token).send({ email: "test@mail.com" });
    //         expect(response.status).toBe(400);
    //     });
    // });

    describe("DELETE /api/users", () => {
        it("should delete a user", async () => {
            // Create a user to delete
            const userToDelete = await api.post("/api/users").set('Authorization', token).send({ userTag: "deleteUser", email: "deleteuser@test.com", password: "Pass123!" });
            const deleteResponse = await api.delete(`/api/users`).set('Authorization', token);
            expect(deleteResponse.status).toBe(200);

          
        });

    });
});


afterAll(() => {
    mongoose.connection.close();
});
