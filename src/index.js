const express = require('express');
const mongoose = require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.listen(port, () => console.log("Listening to server connection at port:" + port));

// route handlers for users
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users)
    } catch(e){
        res.status(500).send(e)
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

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ["name", "age", "email", "password"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send(`Error: One or more properties is invalid... \n Accepted property fields are ${allowUpdates.join(', ')}`)

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, timestamps: true });

        if (!user) return res.status(404).send("User not found!")
        res.send(user)
    } catch(e) {
        console.log("error:" + e)
        res.status(400).send(e)}
})

app.delete("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) return res.status(404).send("User not found!")
        res.send(`User with the data below has been deleted from database \n ${user}`)
    } catch(e) {res.status(500).send(e)}
})

// route handlers for tasks
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
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


app.patch("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ["description", "completed"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send(`Error: One or more properties is invalid... \n Accepted property fields are ${allowUpdates.join(', ')}`)

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, timestamps: true });

        if (!task) return res.status(404).send("Task ID not found!")
        res.send(task)
    } catch(e) {
        console.log("error:" + e)
        res.status(400).send(e)}
})

app.delete("/tasks/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) return res.status(404).send("User not found!")
        res.send(`User with the data below has been deleted from database \n ${task}`)
    } catch(e) {res.status(500).send(e)}
})
