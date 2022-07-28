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
    await request(app)
        .post('/users')
        .send({
            name: "Roland",
            email: "prowess2rule@gmail.com",
            password: "1234567"
        }).expect(201)
})

test('Should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: defaultUser.email,
            password: defaultUser.password
        })
        .expect(200)
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
} )

test('Should not delete account when user is not authorized', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})