const express = require('express');
const mongoose = require('./db/mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.listen(port, () => console.log("Listening to server connection at port:" + port));

app.post('/users', (req, res) => {
    const user = new User(req.body);
    
    user.save().then( result => {
        console.log(result)
        res.status(201).send(user);
    }).catch(err => {
        res.status(400).send(err.message);
    })
})

app.get('/users', (req, res) => {
    User.find({}).then( result => {
        res.send(result)
    }).catch(err => res.status(500).send(err))
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then(user => {
        if (!user) {
            res.status(404).send("User ID not found!")
            return
        }
        res.send(user)
    }).catch(err => res.status(500).send("Invalid User ID"))
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(result => {
        res.status(201).send(result)
    }).catch(err => res.status(400).send(err))
})

app.get('/tasks', (req, res) => {
    Task.find({}).then( result => {
        res.send(result)
    }).catch(err => res.status(500).send(err))
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    
    Task.findById(_id).then(task => {
        if (!task) {
            res.status(404).send("Task ID not found!")
            return
        }
        res.send(task)
    }).catch(err => res.status(500).send("Invalid Task ID"))
})
