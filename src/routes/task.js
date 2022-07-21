const express = require('express');
const router = express.Router()
const Task = require('../models/Task');

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

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
})

router.get('/tasks/:id', async (req, res) => {
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


router.patch("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ["description", "completed"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send(`Error: One or more properties is invalid... \n Accepted property fields are ${allowUpdates.join(', ')}`)

    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, timestamps: true });
        const task = await Task.findById(_id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        if (!task) return res.status(404).send("Task ID not found!")
        res.send(task)
    } catch(e) {
        console.log("error:" + e)
        res.status(400).send(e)}
})

router.delete("/tasks/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) return res.status(404).send("User not found!")
        res.send(`User with the data below has been deleted from database \n ${task}`)
    } catch(e) {res.status(500).send(e)}
})

module.exports = router