require('./mongoose');
const Task = require('../models/Task');

Task.findByIdAndRemove('62d5c049212c8d36629edfdc').then(task => {
    console.log(task)
    return Task.find({completed: false})
}).then(result => {
    console.log(result)
}).catch(err => console.log(err));
