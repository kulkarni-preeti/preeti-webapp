import * as chai from 'chai';
import request from 'supertest';
import app from '../server.js';
const { expect } = chai;
let createdUser;
let userData;

describe("Create an Account", () => {
  it("Create User", (done) => {
    userData = {
      "first_name": "Paula",
      "last_name": "Smith",
      "password": "password",
      "username": "p.smith@gmail.com"
    }
    request(app)
      .post("/v3/user/self")
      .send(userData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        createdUser = res.body;
        expect(createdUser.username).to.equal(userData.username);
        done();
      });
  });
  it("Fetch created user details", (done) => {
    // Basic authentication credentials for the created user
    const credentials = Buffer.from(`${createdUser.username}:${userData.password}`).toString('base64');
    const authHeader = `Basic ${credentials}`;

    request(app)
      .get("/v3/user/self")
      .set("Authorization", authHeader)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(createdUser);
        done();
      });
  });
});

describe("Update the Account", () => {
  it("Update User", (done) => {
    // Basic authentication credentials for the created user
    const credentials = Buffer.from(`${createdUser.username}:${userData.password}`).toString('base64');
    const authHeader = `Basic ${credentials}`;

    const updateUser = {
      "first_name": "Nicholas",
      "last_name": "Goodner",
      "password": "password123"
    };

    request(app)
    .put("/v3/user/self")
    .set("Authorization", authHeader)
    .send(updateUser)
    .expect(204)
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
  })
})
