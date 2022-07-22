const express = require("express");
const mongoose = require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const app = express();
const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//     console.log(req.method, req.path)

//     next()
// })

// app.use((req, res, next) => {
//     res.status(503).send("Site is currently under maintenance. Please, check back later")
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () =>
  console.log("Listening to server connection at port:" + port)
);


// WAYS TO HASH PASSWORD
// const pwd = async () => {
//     const myPassword = "orobola1234567";
//     const salt = await bcrypt.genSalt();
//     console.log('Salt: ' + salt);
//     const hashedPassword = await bcrypt.hash(myPassword, 8)
//     const hashedPasswordSalt = await bcrypt.hash(myPassword, salt)

//     console.log(myPassword)
//     console.log("hashedPassword:" + hashedPassword)
//     console.log("hashedPasswordSalt:" + hashedPasswordSalt)
// }
// pwd()

// JWT - to create authorization and sign in
const authorization = () => {
    // create jwt token
    const token = jwt.sign({_id: "1234567"}, "rollyJS", {
        expiresIn: "5 seconds"
    });
    console.log(token)

    // verify jwt token
    const isVerified = jwt.verify(token, 'rollyJS')
    console.log(isVerified)
}
// authorization()

// toJSON method
const pet = {
    name: "Dude",
    specie: "German Shephard"
}

pet.toJSON = function(){
    console.log(this)
    return this
}

// pet.toJSON()
// console.log(JSON.stringify(pet))
