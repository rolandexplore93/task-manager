const express = require("express");
const mongoose = require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("./models/User");
const Task = require("./models/Task");
const multer = require('multer');
// require('dotenv').config()
// console.log(process.env)


const app = express();
const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () =>
  console.log("Listening to server connection at port:" + PORT)
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
    const token = jwt.sign({_id: "1234567"}, process.env.JWT_SECRET_KEY, {
        expiresIn: "5 seconds"
    });
    console.log(token)

    // verify jwt token
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)
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

// Foreign key and relationship between collections
const relationship = async () => {
    // Get the id of a user who created a task 
    // Get the data of a user who created a task 
    const task = await Task.findById('62da71e2ec331a3ccb555232');
    const userData = await task.populate('owner')
    const userId = await task.populated('owner').toString()
    // console.log(userId)
    // console.log(userData.owner)


    // Get the id of the tasks created by a user 
    // Get all the tasks created by a user
    const user =  await User.findById('62daa1f753d66b7fd370af0e')
    const taskData = await user.populate('tasks')

    console.log(taskData.tasks)
    console.log(taskData.tasks[0]._id)
    console.log(taskData.tasks[1]._id)

}
// relationship()


// using MULTER to upload file
// when a file is upload, formdata is return
const upload = multer({
    dest: "images",
    limits: { fileSize: 2000000},
    fileFilter(req, file, cb){
        // pdf file validation
        // if(!file.originalname.endsWith('.pdf')){
        //     return cb(new Error('Please upload a PDF file'))
        // }
        // cb(undefined, true);

        // word doc/docs validation using regex expression
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a word document'))
        }

        cb(undefined, true)
    }
});

// define the endpoint to upload image to
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send("file uploaded!")
})