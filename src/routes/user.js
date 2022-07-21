const express = require('express');
const router = express.Router()
const User = require('../models/User');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ["name", "age", "email", "password"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send(`Error: One or more properties is invalid... \n Accepted property fields are ${allowUpdates.join(', ')}`)

    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, timestamps: true });
        const user = await User.findById(_id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) return res.status(404).send("User not found!")
        res.send(user)
    } catch(e) {
        console.log("error:" + e)
        res.status(400).send(e)}
})

router.delete("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) return res.status(404).send("User not found!")
        res.send(`User with the data below has been deleted from database \n ${user}`)
    } catch(e) {res.status(500).send(e)}
})

module.exports = router