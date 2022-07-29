const request = require('supertest');
const assert = require('assert');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const app = require('../src/app');
const User = require('../src/models/User');

const defaultUserId = new mongoose.Types.ObjectId()
// hardcoded to input another user
const defaultUser = {
    _id: defaultUserId,
    name: "Orobola Roland",
    email: "d@gmail.com",
    password: '1234567',
    tokens: [{
        token: jwt.sign({_id: defaultUserId}, process.env.JWT_SECRET_KEY)
    }]
}

const wrongUser = {
    email: "wrong@gmail.com",
    password: '1234567'
}

beforeEach(async ()=>{
    await User.deleteMany();
    await new User(defaultUser).save();
})

test("Should create a new user", async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: "Roland",
            email: "prowess2rule@gmail.com",
            password: "1234567"
        }).expect(201)

        // Advanced Assertion: Assert that the user data was created correctly
        const user = await User.findById(response.body.user._id);

        expect(user).not.toBeNull();
        // Assert that the response body matches our input
        expect(response.body).toMatchObject({
            user: {
                name: "Roland",
                email: "prowess2rule@gmail.com"
            },
            token: user.tokens[0].token
        });
        // Assert that the exact password input my user is not stored in the db (pw should have been hashed)
        expect(user.password).not.toBe("1234567")
})

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: defaultUser.email,
            password: defaultUser.password
        })
        .expect(200)
    const user = await User.findById(defaultUserId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: wrongUser.email,
            password: wrongUser.password
        })
        .expect(400)
})

test('Should get profile details for authenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set("Authorization", `Bearer ${defaultUser.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set("Authorization", `Bearer ${defaultUser.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(defaultUserId)
    expect(user).toBeNull();
} )

test('Should not delete account when user is not authorized', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})