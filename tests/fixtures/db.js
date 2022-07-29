const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require('../../src/models/User');
const Task = require('../../src/models/Task');

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

const userTwoId = new mongoose.Types.ObjectId()
// hardcoded to input another user
const userTwo = {
    _id: userTwoId,
    name: "Roland",
    email: "dabo@gmail.com",
    password: '1234567',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET_KEY)
    }]
};

const taskOne = {
    _id: mongoose.Types.ObjectId(),
    description: "First task",
    completed: false,
    owner: defaultUser._id
}

const taskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: "Second task",
    completed: false,
    owner: defaultUser._id
}

const taskThree = {
    _id: mongoose.Types.ObjectId(),
    description: "Third task",
    completed: true,
    owner: userTwo._id
}

const wrongUser = {
    email: "wrong@gmail.com",
    password: '1234567'
}

const setUpDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany()
    await new User(defaultUser).save();
    await new User(userTwo).save();
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
};

module.exports = {
    defaultUserId,
    defaultUser,
    wrongUser,
    setUpDatabase,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree
}