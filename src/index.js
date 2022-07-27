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

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(process.env.PORT || 8080, () =>
  console.log("Listening to server connection at port: " + (process.env.PORT || 8080))
);






// ------------------------------------------------------------------------
// JWT - to create authorization and sign in
// const authorization = () => {
//     // create jwt token
//     const token = jwt.sign({_id: "1234567"}, process.env.JWT_SECRET_KEY, {
//         expiresIn: "5 seconds"
//     });
//     console.log(token)

//     // verify jwt token
//     const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)
//     console.log(isVerified)
// }
// authorization()

// toJSON method
// const pet = {
//     name: "Dude",
//     specie: "German Shephard"
// }
// pet.toJSON = function(){
//     console.log(this)
//     return this
// }
// pet.toJSON()
// console.log(JSON.stringify(pet))