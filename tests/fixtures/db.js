const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require('../../src/models/User');

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
};

const wrongUser = {
    email: "wrong@gmail.com",
    password: '1234567'
}

const setUpDatabase = async () => {
    await User.deleteMany();
    await new User(defaultUser).save();
}

module.exports = {
    defaultUserId,
    defaultUser,
    wrongUser,
    setUpDatabase
}