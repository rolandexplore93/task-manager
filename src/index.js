const express = require('express');
const mongoose = require('./db/mongoose');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log("Listening to server connection at port:" + port));
