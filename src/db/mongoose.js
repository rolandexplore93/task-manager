const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex: true
})


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// create an instance of the User model to save users to the database
// const person = new User({
//     name: "Orobola Roland Ogundipe",
//     age: 25
// })
// .save()
// .then(result => console.log("New user created and saved to the database || " + result))
// .catch(err => console.log(err))

// create an instance of the Task model to save tasks to the database
const task = new Task({
    description: "Cart on Tuesday",
    completed: true
})
.save()
.then(result => console.log(result))
.catch(err => console.log(err))

