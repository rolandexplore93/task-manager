const express = require('express');
const router = express.Router()
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }
});

// tasks created by a specific user id
router.get('/tasks/me', auth, async (req, res) => {
    const match = {};
    const sort = {};
    // console.log(req.query.sortBy)

    if(req.query.completed){
        match.completed = req.query.completed === "true"
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = [parts[1]] === 'desc' ? -1 : 1;
    }

    try {
        // const tasks = await Task.find({owner: req.user._id})  // use this or populate() approach below
        // const tasks = await req.user.populate('tasks')
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                // sort: { description: -1}   //hardcoded from backend
                sort
            }
        })
        // console.log(req.user.tasks)
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })   // after auth

        if (!task) {
            res.status(404).send("Task ID not found!")
            return
        }
        res.send(task)
    } catch (e) {
        res.status(500).send("Invalid Task ID")
    }
})


router.patch("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ["description", "completed"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send(`Error: One or more properties is invalid... \n Accepted property fields are ${allowUpdates.join(', ')}`)

    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, timestamps: true });
        const task = await Task.findOne({ _id, owner: req.user._id})
        
        if (!task) return res.status(404).send("Task ID not found!")
        
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task)

    } catch(e) {
        console.log("error: " + e)
        res.status(400).send(e)}
})

router.delete("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id});

        if (!task) return res.status(404).send("User not found!")
        res.send(`User with the data below has been deleted from database \n ${task}`)
    } catch(e) {res.status(500).send(e)}
})

module.exports = router