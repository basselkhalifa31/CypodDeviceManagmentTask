const { login } = require("../../controllers/authController");
const userData = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Login Function", () => {
  it("should return 401 if the username is invalid", async () => {
    const req = {
      body: {
        username: "invalidUser",
        password: "password123"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const result = await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid username or password" });
  });

  it("should return 401 if the password is incorrect", async () => {
    userData.users = [
      { username: "validUser", password: bcrypt.hashSync("password123", 10), id: "1", role: "user" }
    ];

    const req = {
      body: {
        username: "validUser",
        password: "wrongPassword"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    bcrypt.compareSync = jest.fn().mockReturnValue(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid username or password" });
  });

  it("should return a token on successful login", async () => {
    userData.users = [
      { username: "validUser", password: bcrypt.hashSync("password123", 10), id: "1", role: "user" }
    ];

    const req = {
      body: {
        username: "validUser",
        password: "password123"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    bcrypt.compareSync = jest.fn().mockReturnValue(true);
    jwt.sign = jest.fn().mockReturnValue("mockToken");

    await login(req, res);

    expect(res.status).not.toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Login successful", token: "mockToken" });
  });
});
