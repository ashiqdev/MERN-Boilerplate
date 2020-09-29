import request from "supertest";
import app from "../../src/app";
import { closeDatabase, connect, clearDatabase } from "./db-handler";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  console.log("connected");
  await connect();
});

/**
 * Clear all test data after every test.
 */
// afterEach(async () => {
//   clearDatabase();
// });

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await closeDatabase();
});

describe("app test suite", () => {
  // create user
  test("Create User", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "mock1", email: "mock1@gmail.com" });

    console.log(res.body);

    expect(res.statusCode).toBe(201);
  });

  test("Get All Users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    console.log({ user: res.body });
    expect(res.body.length).toBe(1);
  });

  // f71ddecc438ad72fff3edfc
  // test("Update a user")
});
