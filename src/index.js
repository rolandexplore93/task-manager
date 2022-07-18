const express = require('express');
require('./db/mongoose');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

app.listen(port, () => console.log("Listening to server connection at port:" + port));

app.get('/users', (req, res) => {
    // res.send("Retrieve all user data in the database");
    res.send(req.body)
})

app.post('/users', (req, res) => {
    res.send(req.body)
})