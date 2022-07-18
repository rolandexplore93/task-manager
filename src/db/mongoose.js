const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})





// create an instance of the User model to save users to the database
// const person = new User({
//     name: "       Roland",
//     age: 29,
//     email: "Roland@tetra.com",
//     password: "Hurry46536"
// })
// .save()
// .then(result => console.log("New user created and saved to the database || " + result))
// .catch(err => console.log(err))

// create an instance of the Task model to save tasks to the database
// const task = new Task({
//     description: "Complete mongodb course and apply        for jobs              ",
// })
// .save()
// .then(result => console.log(result))
// .catch(err => console.log(err))

