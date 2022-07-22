const express = require('express');
const router = express.Router()
const User = require('../models/User');
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await user.save();
        const token = await user.generateAuthToken()

        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({user, token});
    }catch(err){res.status(400).send(err)};
})

router.post('/users/logout', auth, async (req, res, next) => {
    // auth token is needed to logout 
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send("Logout successfully")
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res, next) => {
    // auth token is needed to logout 
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send("Logout on all devices")
    }catch(e){
        res.status(500).send()
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

// read profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             res.status(404).send("User ID not found!")
//             return
//         }
//         res.send(user)
//     } catch(e){
//         res.status(500).send("Invalid User ID")
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const _id = req.params.id;
    const allowUpdates = ["name", "age", "email", "password"];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update));

    if (!isValidUpdate) return res.status(400).send(`Error: One or more properties is invalid... \n Accepted property fields are ${allowUpdates.join(', ')}`)

    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true, timestamps: true });
        // const user = await User.findById(_id);
        
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        // if (!user) return res.status(404).send("User not found!")
        res.send(req.user)
    } catch(e) {
        console.log("error:" + e)
        res.status(400).send(e)}
})

router.delete("/users/me", auth, async (req, res) => {

    try {
        await req.user.remove()
        // const user = await User.findByIdAndDelete(req.params.id);
        // if (!user) return res.status(404).send("User not found!")
        res.send(`User with the data below has been deleted from database \n ${req.user}`)
    } catch(e) {res.status(500).send(e)}
})

module.exports = router