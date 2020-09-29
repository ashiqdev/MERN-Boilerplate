import request from "supertest";
import app from "../../src/app";

jest.mock("../../src/services/user-service");

describe("UserController Test suite", () => {
  test("GET/ should return an array of users", async () => {
    const res = await request(app).get("/api/users");
    const users = res.body;
    expect(res.statusCode).toBe(200);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].id).toBe("1");
  });

  test("POST/ should return saved id", async () => {
    const user = { name: "test430", email: "test430@gmail.com" };
    const res = await request(app).post("/api/users").send(user);
    const id = res.body;
    expect(res.statusCode).toBe(201);
    expect(id.length).toBe(24);

    const fetchedUser = await request(app).get(`/api/users/${id}`);
    expect(fetchedUser.body.name).not.toBe(null);
    expect(fetchedUser.body.name).toBe(user.name);
  });

  test("GET/ get by id should return an user", async () => {
    const res = await request(app).get("/api/users/1");
    const user = res.body;
    expect(user.id).toBe("1");
  });

  test("PUT/ should update an existing user", async () => {
    const user = { id: "1", name: "004", email: "test004@gmail.com" };
    const body = { name: user.name, email: user.email };
    const res = await request(app)
      .put(`/api/users/${user.id}`)
      .send(body, user.id);

    expect(res.statusCode).toBe(200);

    const updatedUserResponse = await request(app).get("/api/users/1");
    const updatedUser = updatedUserResponse.body;
    expect(updatedUser.name).toBe(user.name);
  });

  test("DELETE/ should return an success message", async () => {
    const res = await request(app).delete("/api/users/1");
    expect(res.statusCode).toBe(200);
    const deletedUserResponse = await request(app).get("/api/users/1");
    expect(deletedUserResponse.statusCode).toBe(404);
  });
});
