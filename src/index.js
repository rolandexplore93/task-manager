const express = require('express');
const mongoose = require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.listen(port, () => console.log("Listening to server connection at port:" + port));

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(err.message);
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users)
    } catch(e){
        res.status(500).send(err)
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id)
        if (!user) {
            res.status(404).send("User ID not found!")
            return
        }
        res.send(user)
    } catch(e){
        res.status(500).send("Invalid User ID")
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(err)
    }
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks)
    } catch(e) {
        res.status(500).send(err)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            res.status(404).send("Task ID not found!")
            return
        }
        res.send(task)
    } catch (e) {
        res.status(500).send("Invalid Task ID")
    }
})
