const express = require("express");
const mongoose = require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("./models/User");
const Task = require("./models/Task");
const multer = require('multer');

const app = express();

// Site maintenance so that no route will work
// app.use((req, res, next) => {
//     res.status(503).send("Site is currently under maintenance. Please, check back later")
// })

app.set('view engine', 'ejs')

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app