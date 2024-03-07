const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { User, SensitiveData } = require("../models/users");


let refreshToken = null;

beforeAll(async () => {
	await SensitiveData.deleteMany({});
	await User.deleteMany({});
	await api.post("/api/users").send({ email: "test@mail.com", password: "R3g5T7#gh", userTag: "testUser" });
});

describe("Authentication API Tests", () => {
	beforeEach(async () => {
		const result = await api.post("/api/auth/login").send({ password: "R3g5T7#gh", userTag: "testUser" });

	
	});

	describe("POST /api/auth/login", () => {
		it("should log in a user and return tokens", async () => {
			const response = await api.post("/api/auth/login").send({ password: "R3g5T7#gh", userTag: "testUser" });
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("accessToken");
			expect(response.body).toHaveProperty("user");
		});

		it("should return 400 if user is not found", async () => {
			const response = await api.post("/api/auth/login").send({ password: "R3g5T7#gh", userTag: "testUser2" });
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("message");
		});

		it("should return 400 for invalid credentials", async () => {
			const response = await api.post("/api/auth/login").send({ password: "wrong_password", userTag: "testUser" });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Invalid credentials.");
		});

	});

	

	describe("POST /api/auth/logout", () => {
		
		it("should return 200 ", async () => {
			const response = await api.post("/api/auth/logout");
			expect(response.status).toBe(200);
		});
	});
});

afterAll(() => {
	mongoose.connection.close();
});