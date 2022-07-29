const request = require('supertest');
const assert = require('assert');
const app = require('../src/app');
const Task = require('../src/models/Task');
const { defaultUser, defaultUserId, wrongUser, setUpDatabase } = require('./fixtures/db');

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