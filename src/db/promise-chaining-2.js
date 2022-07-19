require('./mongoose');
const Task = require('../models/Task');

// using proming-chaining approach
Task.findByIdAndRemove('62d5c049212c8d36629edfdc').then(task => {
    console.log(task)
    return Task.find({completed: false})
}).then(result => {
    console.log(result)
}).catch(err => console.log(err));

// using async-await approach
const deleteTaskAndCount = async (id) => {
    const deleteTask = await Task.findByIdAndRemove(id);
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('62d5bf9ba499035fb54190b6').then(result => console.log(result))
.catch(err => console.log(err))
