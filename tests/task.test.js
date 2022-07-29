const request = require('supertest');
const assert = require('assert');
const app = require('../src/app');
const Task = require('../src/models/Task');
const { defaultUser, defaultUserId, wrongUser, setUpDatabase, userTwoId, userTwo, taskOne, taskTwo, taskThree } = require('./fixtures/db');

beforeEach(setUpDatabase);

test('Should create a task for a user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${defaultUser.tokens[0].token}`)
        .send({
            description: "Buy PS7",
            completed: false,
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
});

test('Should get all tasks for defaultUser', async () => {
    const response = await request(app)
        .get('/tasks/me')
        .set('Authorization', `Bearer ${defaultUser.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not allow authorized user delete tasks created by other users', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})