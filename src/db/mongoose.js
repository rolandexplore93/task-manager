const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        default: "Anonymous Coder"
    },
    age: {
        type: Number,
        required: true,
        default: 999,
        validate(value){
            if (value < 1){ throw new Error ("Age must be a positive number")}
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        default: "anonymous@coder.com",
        validate(value){
            if(!validator.isEmail(value)) throw new Error ("Email is invalid")
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"') 
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// create an instance of the User model to save users to the database
const person = new User({
    name: "       Roland",
    age: 29,
    email: "Roland@tetra.com",
    password: "Hurry46536"
})
.save()
.then(result => console.log("New user created and saved to the database || " + result))
.catch(err => console.log(err))

// create an instance of the Task model to save tasks to the database
const task = new Task({
    description: "Complete mongodb course and apply        for jobs              ",
})
.save()
.then(result => console.log(result))
.catch(err => console.log(err))

