const express = require("express");
const mongoose = require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () =>
  console.log("Listening to server connection at port:" + port)
);


const pwd = async () => {
    const myPassword = "orobola1234567";
    const salt = await bcrypt.genSalt();
    console.log('Salt: ' + salt);
    const hashedPassword = await bcrypt.hash(myPassword, 8)
    const hashedPasswordSalt = await bcrypt.hash(myPassword, salt)

    console.log(myPassword)
    console.log("hashedPassword:" + hashedPassword)
    console.log("hashedPasswordSalt:" + hashedPasswordSalt)
}

// pwd()
